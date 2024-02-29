/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { v4 as uuid } from "uuid";
import {
	ITelemetryLoggerExt,
	isFluidError,
	PerformanceEvent,
	wrapError,
} from "@fluidframework/telemetry-utils";
import { fromUtf8ToBase64 } from "@fluid-internal/client-utils";
import { assert } from "@fluidframework/core-utils";
import { getW3CData } from "@fluidframework/driver-base";
import { ISnapshot } from "@fluidframework/driver-definitions";
import {
	IOdspResolvedUrl,
	ISnapshotOptions,
	OdspErrorTypes,
	InstrumentedStorageTokenFetcher,
	type IOdspError,
} from "@fluidframework/odsp-driver-definitions";
import { ISnapshotTree } from "@fluidframework/protocol-definitions";
import {
	DriverErrorTelemetryProps,
	isRuntimeMessage,
	NonRetryableError,
} from "@fluidframework/driver-utils";
import {
	fetchIncorrectResponse,
	throwOdspNetworkError,
} from "@fluidframework/odsp-doclib-utils/internal";
import {
	IOdspSnapshot,
	ISnapshotCachedEntry2,
	IVersionedValueWithEpoch,
	persistedCacheValueVersion,
} from "./contracts";
import { getQueryString } from "./getQueryString";
import { getUrlAndHeadersWithAuth } from "./getUrlAndHeadersWithAuth";
import {
	fetchAndParseAsJSONHelper,
	fetchHelper,
	getWithRetryForTokenRefresh,
	getWithRetryForTokenRefreshRepeat,
	IOdspResponse,
	isSnapshotFetchForLoadingGroup,
	measure,
	measureP,
	useLegacyFlowWithoutGroupsForSnapshotFetch,
} from "./odspUtils";
import { convertOdspSnapshotToSnapshotTreeAndBlobs } from "./odspSnapshotParser";
import {
	currentReadVersion,
	ISnapshotContentsWithProps,
	parseCompactSnapshotResponse,
} from "./compactSnapshotParser";
import { EpochTracker } from "./epochTracker";
import { pkgVersion } from "./packageVersion";

/**
 * Enum to support different types of snapshot formats.
 * @alpha
 */
export enum SnapshotFormatSupportType {
	Json = 0,
	Binary = 1,
	JsonAndBinary = 2,
}

/**
 * Fetches a snapshot from the server with a given version id.
 * @param snapshotUrl - snapshot url from where the odsp snapshot will be fetched
 * @param token - token used for authorization in the request
 * @param storageFetchWrapper - Implementation of the get/post methods used to fetch the snapshot
 * @param versionId - id of specific snapshot to be fetched
 * @param fetchFullSnapshot - whether we want to fetch full snapshot(with blobs)
 * @param forceAccessTokenViaAuthorizationHeader - whether to force passing given token via authorization header
 * @returns A promise of the snapshot and the status code of the response
 */
export async function fetchSnapshot(
	snapshotUrl: string,
	// eslint-disable-next-line @rushstack/no-new-null
	token: string | null,
	versionId: string,
	fetchFullSnapshot: boolean,
	forceAccessTokenViaAuthorizationHeader: boolean,
	logger: ITelemetryLoggerExt,
	snapshotDownloader: (
		url: string,
		fetchOptions: { [index: string]: RequestInit },
	) => Promise<IOdspResponse<unknown>>,
): Promise<ISnapshot> {
	const path = `/trees/${versionId}`;
	let queryParams: ISnapshotOptions = {};

	if (fetchFullSnapshot) {
		queryParams = versionId === "latest" ? { deltas: 1, blobs: 2 } : { blobs: 2 };
	}

	const queryString = getQueryString(queryParams);
	const { url, headers } = getUrlAndHeadersWithAuth(
		`${snapshotUrl}${path}${queryString}`,
		token,
		forceAccessTokenViaAuthorizationHeader,
	);
	const response = (await PerformanceEvent.timedExecAsync(
		logger,
		{
			eventName: "fetchSnapshot",
			headers: Object.keys(headers).length > 0 ? true : undefined,
		},
		async () => snapshotDownloader(url, { headers }),
	)) as IOdspResponse<IOdspSnapshot>;
	return convertOdspSnapshotToSnapshotTreeAndBlobs(response.content);
}

export async function fetchSnapshotWithRedeem(
	odspResolvedUrl: IOdspResolvedUrl,
	storageTokenFetcher: InstrumentedStorageTokenFetcher,
	snapshotOptions: ISnapshotOptions | undefined,
	forceAccessTokenViaAuthorizationHeader: boolean,
	logger: ITelemetryLoggerExt,
	snapshotDownloader: (
		finalOdspResolvedUrl: IOdspResolvedUrl,
		storageToken: string,
		loadingGroupIds: string[] | undefined,
		snapshotOptions: ISnapshotOptions | undefined,
		controller?: AbortController,
	) => Promise<ISnapshotRequestAndResponseOptions>,
	putInCache: (valueWithEpoch: IVersionedValueWithEpoch) => Promise<void>,
	removeEntries: () => Promise<void>,
	loadingGroupIds: string[] | undefined,
	enableRedeemFallback?: boolean,
): Promise<ISnapshot> {
	// back-compat: This block to be removed with #8784 when we only consume/consider odsp resolvers that are >= 0.51
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
	const sharingLinkToRedeem = (odspResolvedUrl as any).sharingLinkToRedeem;
	if (sharingLinkToRedeem) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		odspResolvedUrl.shareLinkInfo = { ...odspResolvedUrl.shareLinkInfo, sharingLinkToRedeem };
	}

	return fetchLatestSnapshotCore(
		odspResolvedUrl,
		storageTokenFetcher,
		snapshotOptions,
		logger,
		snapshotDownloader,
		putInCache,
		loadingGroupIds,
		enableRedeemFallback,
	)
		.catch(async (error) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			if (enableRedeemFallback && isRedeemSharingLinkError(odspResolvedUrl, error)) {
				// Execute the redeem fallback

				await redeemSharingLink(
					odspResolvedUrl,
					storageTokenFetcher,
					logger,
					forceAccessTokenViaAuthorizationHeader,
				);
				const odspResolvedUrlWithoutShareLink: IOdspResolvedUrl = {
					...odspResolvedUrl,
					shareLinkInfo: {
						...odspResolvedUrl.shareLinkInfo,
						sharingLinkToRedeem: undefined,
					},
				};

				// Log initial failure only if redeem succeeded - it points out to some bug somewhere
				// If redeem failed, that most likely means user has no permissions to access a file,
				// and thus it's not worth it logging extra errors - same error will be logged by end-to-end
				// flow (container open) based on a failure above.
				logger.sendTelemetryEvent(
					{
						eventName: "RedeemFallback",
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
						errorType: error.errorType,
					},
					error,
				);

				return fetchLatestSnapshotCore(
					odspResolvedUrlWithoutShareLink,
					storageTokenFetcher,
					snapshotOptions,
					logger,
					snapshotDownloader,
					putInCache,
					loadingGroupIds,
				);
			} else {
				throw error;
			}
		})
		.catch(async (error) => {
			// Clear the cache on 401/403/404 on snapshot fetch from network because this means either the user doesn't
			// have permissions for the file or it was deleted. So, if we do not clear cache, we will continue fetching
			// snapshot from cache in the future.
			if (
				(typeof error === "object" &&
					error !== null &&
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					error.errorType === OdspErrorTypes.authorizationError) ||
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				error.errorType === OdspErrorTypes.fileNotFoundOrAccessDeniedError
			) {
				await removeEntries();
			}
			throw error;
		});
}

async function redeemSharingLink(
	odspResolvedUrl: IOdspResolvedUrl,
	storageTokenFetcher: InstrumentedStorageTokenFetcher,
	logger: ITelemetryLoggerExt,
	forceAccessTokenViaAuthorizationHeader: boolean,
): Promise<IOdspResponse<unknown>> {
	return PerformanceEvent.timedExecAsync(
		logger,
		{
			eventName: "RedeemShareLink",
		},
		async () =>
			getWithRetryForTokenRefresh(async (tokenFetchOptions) => {
				assert(
					!!odspResolvedUrl.shareLinkInfo?.sharingLinkToRedeem,
					0x1ed /* "Share link should be present" */,
				);
				const storageToken = await storageTokenFetcher(
					tokenFetchOptions,
					"RedeemShareLink",
				);
				const encodedShareUrl = getEncodedShareUrl(
					odspResolvedUrl.shareLinkInfo?.sharingLinkToRedeem,
				);
				const redeemUrl = `${odspResolvedUrl.siteUrl}/_api/v2.0/shares/${encodedShareUrl}`;
				const { url, headers } = getUrlAndHeadersWithAuth(
					redeemUrl,
					storageToken,
					forceAccessTokenViaAuthorizationHeader,
				);
				headers.prefer = "redeemSharingLink";
				return fetchAndParseAsJSONHelper(url, { headers });
			}),
	);
}

async function fetchLatestSnapshotCore(
	odspResolvedUrl: IOdspResolvedUrl,
	storageTokenFetcher: InstrumentedStorageTokenFetcher,
	snapshotOptions: ISnapshotOptions | undefined,
	logger: ITelemetryLoggerExt,
	snapshotDownloader: (
		finalOdspResolvedUrl: IOdspResolvedUrl,
		storageToken: string,
		loadingGroupIds: string[] | undefined,
		snapshotOptions: ISnapshotOptions | undefined,
		controller?: AbortController,
	) => Promise<ISnapshotRequestAndResponseOptions>,
	putInCache: (valueWithEpoch: IVersionedValueWithEpoch) => Promise<void>,
	loadingGroupIds: string[] | undefined,
	enableRedeemFallback?: boolean,
): Promise<ISnapshot> {
	return getWithRetryForTokenRefresh(async (tokenFetchOptions) => {
		const fetchSnapshotForLoadingGroup = isSnapshotFetchForLoadingGroup(loadingGroupIds);
		const eventName = fetchSnapshotForLoadingGroup ? "TreesLatestForGroup" : "TreesLatest";
		const storageToken = await storageTokenFetcher(tokenFetchOptions, eventName, true);
		assert(storageToken !== null, 0x1e5 /* "Storage token should not be null" */);

		const perfEvent = {
			eventName,
			attempts: tokenFetchOptions.refresh ? 2 : 1,
			shareLinkPresent: odspResolvedUrl.shareLinkInfo?.sharingLinkToRedeem !== undefined,
			isSummarizer: odspResolvedUrl.summarizer,
			redeemFallbackEnabled: enableRedeemFallback,
		};
		if (snapshotOptions !== undefined) {
			for (const [key, value] of Object.entries(snapshotOptions)) {
				if (value !== undefined) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					perfEvent[`snapshotOption_${key}`] = value;
				}
			}
		}
		// This event measures only successful cases of getLatest call (no tokens, no retries).
		return PerformanceEvent.timedExecAsync(logger, perfEvent, async (event) => {
			let controller: AbortController | undefined;
			let fetchTimeout: ReturnType<typeof setTimeout> | undefined;
			if (snapshotOptions?.timeout !== undefined) {
				controller = new AbortController();
				fetchTimeout = setTimeout(() => controller!.abort(), snapshotOptions.timeout);
			}

			const [response, fetchTime] = await measureP(async () =>
				snapshotDownloader(
					odspResolvedUrl,
					storageToken,
					loadingGroupIds,
					snapshotOptions,
					controller,
				),
			).finally(() => {
				// Clear the fetchTimeout once the response is fetched.
				if (fetchTimeout !== undefined) {
					clearTimeout(fetchTimeout);
					fetchTimeout = undefined;
				}
			});

			const odspResponse = response.odspResponse;
			const contentType = odspResponse.headers.get("content-type");

			const propsToLog: DriverErrorTelemetryProps = {
				...odspResponse.propsToLog,
				contentType,
				accept: response.requestHeaders.accept,
				driverVersion: pkgVersion,
			};

			let parsedSnapshotContents: IOdspResponse<ISnapshotContentsWithProps> | undefined;
			let contentTypeToRead: string | undefined;
			if (contentType?.includes("application/ms-fluid")) {
				contentTypeToRead = "application/ms-fluid";
			} else if (contentType?.includes("application/json")) {
				contentTypeToRead = "application/json";
			}

			let parseTime: number;
			let receiveContentTime: number;
			try {
				switch (contentTypeToRead) {
					case "application/json": {
						let text: string;
						[text, receiveContentTime] = await measureP(async () =>
							odspResponse.content.text().catch((error) =>
								// Parsing can fail and message could contain full request URI, including
								// tokens, etc. So do not log error object itself.
								throwOdspNetworkError(
									"Error while parsing fetch response",
									fetchIncorrectResponse,
									odspResponse.content, // response
									undefined, // response text
									propsToLog,
								),
							),
						);
						propsToLog.bodySize = text.length;
						let content: IOdspSnapshot;
						[content, parseTime] = measure(() => JSON.parse(text) as IOdspSnapshot);
						validateBlobsAndTrees(content);
						const snapshotContents: ISnapshot =
							convertOdspSnapshotToSnapshotTreeAndBlobs(content);
						parsedSnapshotContents = {
							...odspResponse,
							content: {
								...snapshotContents,
								telemetryProps: {},
							},
						};
						break;
					}
					case "application/ms-fluid": {
						let content: ArrayBuffer;
						[content, receiveContentTime] = await measureP(async () =>
							odspResponse.content.arrayBuffer().catch((error) =>
								// Parsing can fail and message could contain full request URI, including
								// tokens, etc. So do not log error object itself.
								throwOdspNetworkError(
									"Error while parsing fetch response",
									fetchIncorrectResponse,
									odspResponse.content, // response
									undefined, // response text
									propsToLog,
								),
							),
						);
						propsToLog.bodySize = content.byteLength;
						let snapshotContents: ISnapshotContentsWithProps;
						[snapshotContents, parseTime] = measure(() =>
							parseCompactSnapshotResponse(new Uint8Array(content), logger),
						);
						if (
							snapshotContents.snapshotTree.trees === undefined ||
							snapshotContents.snapshotTree.blobs === undefined
						) {
							throw new NonRetryableError(
								"Returned odsp snapshot is malformed. No trees or blobs!",
								OdspErrorTypes.incorrectServerResponse,
								propsToLog,
							);
						}

						const props = snapshotContents.telemetryProps;
						const slowTreeParseCodePaths = props.slowTreeStructureCount ?? 0;
						const slowBlobParseCodePaths = props.slowBlobStructureCount ?? 0;
						if (slowTreeParseCodePaths > 10 || slowBlobParseCodePaths > 10) {
							logger.sendErrorEvent({
								eventName: "SlowSnapshotParseCodePaths",
								slowTreeStructureCount: slowTreeParseCodePaths,
								slowBlobStructureCount: slowBlobParseCodePaths,
							});
						}
						parsedSnapshotContents = { ...odspResponse, content: snapshotContents };
						break;
					}
					default: {
						throw new NonRetryableError(
							"Unknown snapshot content type",
							OdspErrorTypes.incorrectServerResponse,
							propsToLog,
						);
					}
				}
			} catch (error) {
				if (isFluidError(error)) {
					error.addTelemetryProperties(propsToLog);
					throw error;
				}
				const enhancedError = wrapError(
					error,
					(errorMessage) =>
						new NonRetryableError(
							`Error parsing snapshot response: ${errorMessage}`,
							OdspErrorTypes.genericError,
							propsToLog,
						),
				);
				throw enhancedError;
			}

			assert(parsedSnapshotContents !== undefined, 0x312 /* snapshot should be parsed */);
			const snapshot = parsedSnapshotContents.content;
			const { trees, numBlobs, encodedBlobsSize } = evalBlobsAndTrees(snapshot);

			// There are some scenarios in ODSP where we cannot cache, trees/latest will explicitly tell us when we
			// cannot cache using an HTTP response header. Only cache snapshot if it is not for a loading group.
			const canCache =
				odspResponse.headers.get("disablebrowsercachingofusercontent") !== "true" &&
				!fetchSnapshotForLoadingGroup;
			const sequenceNumber: number = snapshot.sequenceNumber ?? 0;
			const seqNumberFromOps =
				snapshot.ops && snapshot.ops.length > 0
					? snapshot.ops[0].sequenceNumber - 1
					: undefined;

			if (
				!Number.isInteger(sequenceNumber) ||
				(seqNumberFromOps !== undefined && seqNumberFromOps !== sequenceNumber)
			) {
				logger.sendErrorEvent({
					eventName: "fetchSnapshotError",
					sequenceNumber,
					seqNumberFromOps,
				});
				snapshot.sequenceNumber = undefined;
			} else if (canCache) {
				const fluidEpoch = odspResponse.headers.get("x-fluid-epoch");
				assert(
					fluidEpoch !== undefined,
					0x1e6 /* "Epoch  should be present in response" */,
				);
				const value: ISnapshotCachedEntry2 = {
					...snapshot,
					cacheEntryTime: Date.now(),
				};
				const valueWithEpoch: IVersionedValueWithEpoch = {
					value,
					fluidEpoch,
					version: persistedCacheValueVersion,
				};
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				putInCache(valueWithEpoch);
			}

			event.end({
				trees,
				blobs: snapshot.blobContents?.size ?? 0,
				leafNodes: numBlobs,
				encodedBlobsSize,
				sequenceNumber,
				ops: snapshot.ops?.length ?? 0,
				fetchSnapshotForLoadingGroup,
				useLegacyFlowWithoutGroups:
					useLegacyFlowWithoutGroupsForSnapshotFetch(loadingGroupIds),
				userOps: snapshot.ops?.filter((op) => isRuntimeMessage(op)).length ?? 0,
				headers: Object.keys(response.requestHeaders).length > 0 ? true : undefined,
				// Measures time to make fetch call. Should be similar to
				// fetchStartToResponseEndTime - receiveContentTime, i.e. it looks like it's time till first byte /
				// end of response headers
				fetchTime,
				// time it takes client to parse payload. Same payload as in "SnapshotParse" event, here for
				// easier analyzes.
				parseTime,
				// Time it takes to receive content (text of buffer) from Response object.
				// This time likely is very closely correlated with networkTime, i.e. time it takes to receive
				// actual content (starting measuring from first bite / end of response header)
				receiveContentTime,
				...getW3CData(response.requestUrl, "fetch"),
				// Sharing link telemetry regarding sharing link redeem status and performance. Ex: FRL; dur=100,
				// Azure Fluid Relay service; desc=S, FRP; desc=False. Here, FRL is the duration taken for redeem,
				// Azure Fluid Relay service is the redeem status (S means success), and FRP is a flag to indicate
				// if the permission has changed.
				sltelemetry: odspResponse.headers.get("x-fluid-sltelemetry"),
				// All other props
				...propsToLog,
				// Various perf counters and measures collected by binary parsing code:
				// slowTreeStructureCount, slowBlobStructureCount, durationStructure, durationStrings,
				// durationSnapshotTree, durationBlobs, etc.
				...parsedSnapshotContents.content.telemetryProps,
			});
			return snapshot;
		}).catch((error) => {
			// We hit these errors in stress tests, under load
			// It's useful to try one more time in such case.
			if (
				typeof error === "object" &&
				error !== null &&
				((error as Partial<IOdspError>).errorType === OdspErrorTypes.fetchFailure ||
					(error as Partial<IOdspError>).errorType === OdspErrorTypes.fetchTimeout)
			) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				error[getWithRetryForTokenRefreshRepeat] = true;
			}
			throw error;
		});
	});
}

export interface ISnapshotRequestAndResponseOptions {
	odspResponse: IOdspResponse<Response>;
	requestUrl: string;
	requestHeaders: { [index: string]: string };
}

function getFormBodyAndHeaders(
	odspResolvedUrl: IOdspResolvedUrl,
	storageToken: string,
	headers?: { [index: string]: string },
): {
	body: string;
	headers: {
		[index: string]: string;
	};
} {
	const formBoundary = uuid();
	const formParams: string[] = [];
	formParams.push(
		`--${formBoundary}`,
		`Authorization: Bearer ${storageToken}`,
		`X-HTTP-Method-Override: GET`,
	);

	if (headers !== undefined) {
		for (const [key, value] of Object.entries(headers)) {
			if (value !== undefined) {
				formParams.push(`${key}: ${value}`);
			}
		}
	}
	if (odspResolvedUrl.shareLinkInfo?.sharingLinkToRedeem) {
		formParams.push(`sl: ${odspResolvedUrl.shareLinkInfo?.sharingLinkToRedeem}`);
	}
	formParams.push(`_post: 1`, `\r\n--${formBoundary}--`);
	const postBody = formParams.join("\r\n");
	const header: { [index: string]: string } = {
		"Content-Type": `multipart/form-data;boundary=${formBoundary}`,
	};
	return { body: postBody, headers: header };
}

export function evalBlobsAndTrees(snapshot: ISnapshot): {
	trees: number;
	numBlobs: number;
	encodedBlobsSize: number;
} {
	const trees = countTreesInSnapshotTree(snapshot.snapshotTree);
	const numBlobs = snapshot.blobContents.size;
	let encodedBlobsSize = 0;
	for (const [_, blobContent] of snapshot.blobContents) {
		encodedBlobsSize += blobContent.byteLength;
	}
	return { trees, numBlobs, encodedBlobsSize };
}

export function validateBlobsAndTrees(snapshot: IOdspSnapshot): void {
	assert(
		snapshot.trees !== undefined,
		0x200 /* "Returned odsp snapshot is malformed. No trees!" */,
	);
	assert(
		snapshot.blobs !== undefined,
		0x201 /* "Returned odsp snapshot is malformed. No blobs!" */,
	);
}

function countTreesInSnapshotTree(snapshotTree: ISnapshotTree): number {
	let numTrees = 0;
	for (const [_, tree] of Object.entries(snapshotTree.trees)) {
		numTrees += 1;
		numTrees += countTreesInSnapshotTree(tree);
	}
	return numTrees;
}

/**
 * This function fetches the snapshot and parse it according to what is mentioned in response headers.
 * @param odspResolvedUrl - resolved odsp url.
 * @param storageToken - token to do the auth for network request.
 * @param snapshotOptions - Options used to specify how and what to fetch in the snapshot.
 * @param loadingGroupIds - loadingGroupIds for which snapshot needs to be downloaded. Note:
 * 1.) If undefined, then legacy trees latest call will be used where no groupId query param would be specified.
 * 2.) If [] is passed, then snapshot with all ungrouped data will be fetched.
 * 3.) If any groupId is specified like ["g1"], then snapshot for g1 group will be fetched.
 * @param snapshotFormatFetchType - Snapshot format to fetch.
 * @param controller - abort controller if caller needs to abort the network call.
 * @param epochTracker - epoch tracker used to add/validate epoch in the network call.
 * @returns fetched snapshot.
 */
export async function downloadSnapshot(
	odspResolvedUrl: IOdspResolvedUrl,
	storageToken: string,
	loadingGroupIds: string[] | undefined,
	snapshotOptions: ISnapshotOptions | undefined,
	snapshotFormatFetchType?: SnapshotFormatSupportType,
	controller?: AbortController,
	epochTracker?: EpochTracker,
	scenarioName?: string,
): Promise<ISnapshotRequestAndResponseOptions> {
	// back-compat: This block to be removed with #8784 when we only consume/consider odsp resolvers that are >= 0.51
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
	const sharingLinkToRedeem = (odspResolvedUrl as any).sharingLinkToRedeem;
	if (sharingLinkToRedeem) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		odspResolvedUrl.shareLinkInfo = { ...odspResolvedUrl.shareLinkInfo, sharingLinkToRedeem };
	}

	const snapshotUrl = odspResolvedUrl.endpoints.snapshotStorageUrl;

	const queryParams: Record<string, unknown> = { ump: 1 };
	if (snapshotOptions !== undefined) {
		for (const [key, value] of Object.entries(snapshotOptions)) {
			// Exclude "timeout" from query string
			if (value !== undefined && key !== "timeout") {
				queryParams[key] = value;
			}
		}
	}

	if (loadingGroupIds !== undefined) {
		queryParams.groupId = loadingGroupIds.join(",");
	}

	const queryString = getQueryString(queryParams);
	const url = `${snapshotUrl}/trees/latest${queryString}`;
	// The location of file can move on Spo in which case server returns 308(Permanent Redirect) error.
	// Adding below header will make VROOM API return 404 instead of 308 and browser can intercept it.
	// This error thrown by server will contain the new redirect location. Look at the 404 error parsing
	// for further reference here: \packages\utils\odsp-doclib-utils\src\odspErrorUtils.ts
	const header = { prefer: "manualredirect" };
	const { body, headers } = getFormBodyAndHeaders(odspResolvedUrl, storageToken, header);
	const fetchOptions = {
		body,
		headers,
		signal: controller?.signal,
		method: "POST",
	};
	// Decide what snapshot format to fetch as per the feature gate.
	switch (snapshotFormatFetchType) {
		case SnapshotFormatSupportType.Binary: {
			headers.accept = `application/ms-fluid; v=${currentReadVersion}`;
			break;
		}
		default: {
			// By default ask both versions and let the server decide the format.
			headers.accept = `application/json, application/ms-fluid; v=${currentReadVersion}`;
		}
	}

	const odspResponse = await (epochTracker?.fetch(
		url,
		fetchOptions,
		"treesLatest",
		true,
		scenarioName,
	) ?? fetchHelper(url, fetchOptions));

	return {
		odspResponse,
		requestHeaders: headers,
		requestUrl: url,
	};
}

function isRedeemSharingLinkError(
	odspResolvedUrl: IOdspResolvedUrl,
	error: Partial<IOdspError>,
): boolean {
	if (
		odspResolvedUrl.shareLinkInfo?.sharingLinkToRedeem !== undefined &&
		typeof error === "object" &&
		error !== null &&
		(error.errorType === OdspErrorTypes.authorizationError ||
			error.errorType === OdspErrorTypes.fileNotFoundOrAccessDeniedError)
	) {
		return true;
	}
	return false;
}

function getEncodedShareUrl(url: string): string {
	/**
	 * Encode the url to accepted format by Sharepoint
	 * https://docs.microsoft.com/en-us/onedrive/developer/rest-api/api/shares_get
	 */
	let encodedUrl = fromUtf8ToBase64(encodeURI(url));
	encodedUrl = encodedUrl.replace(/=+$/g, "").replace(/\//g, "_").replace(/\+/g, "-");
	encodedUrl = "u!".concat(encodedUrl);
	return encodedUrl;
}
