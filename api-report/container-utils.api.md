## API Report File for "@fluidframework/container-utils"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { IErrorBase } from '@fluidframework/container-definitions';
import { IFluidErrorBase } from '@fluidframework/telemetry-utils';
import { IGenericError } from '@fluidframework/container-definitions';
import { ISequencedDocumentMessage } from '@fluidframework/protocol-definitions';
import { ITelemetryLogger } from '@fluidframework/common-definitions';
import { ITelemetryProperties } from '@fluidframework/common-definitions';
import { IThrottlingWarning } from '@fluidframework/container-definitions';
import { LoggingError } from '@fluidframework/telemetry-utils';

// @public
export class ClientSessionExpiredError extends LoggingError implements IFluidErrorBase {
    constructor(message: string, expiryMs: number);
    // (undocumented)
    readonly errorType = ContainerErrorType.clientSessionExpiredError;
    // (undocumented)
    readonly expiryMs: number;
}

// @public
export class DataCorruptionError extends LoggingError implements IErrorBase, IFluidErrorBase {
    constructor(message: string, props: ITelemetryProperties);
    // (undocumented)
    readonly canRetry = false;
    // (undocumented)
    readonly errorType = ContainerErrorType.dataCorruptionError;
}

// @public
export class DataProcessingError extends LoggingError implements IErrorBase, IFluidErrorBase {
    // (undocumented)
    readonly canRetry = false;
    static create(errorMessage: string, dataProcessingCodepath: string, sequencedMessage?: ISequencedDocumentMessage, props?: ITelemetryProperties): IFluidErrorBase;
    // (undocumented)
    readonly errorType = ContainerErrorType.dataProcessingError;
    static wrapIfUnrecognized(originalError: any, dataProcessingCodepath: string, sequencedMessage?: ISequencedDocumentMessage): IFluidErrorBase;
}

// @public (undocumented)
export const extractSafePropertiesFromMessage: (message: ISequencedDocumentMessage) => {
    messageClientId: string;
    messageSequenceNumber: number;
    messageClientSequenceNumber: number;
    messageReferenceSequenceNumber: number;
    messageMinimumSequenceNumber: number;
    messageTimestamp: number;
};

// @public
export class GenericError extends LoggingError implements IGenericError, IFluidErrorBase {
    constructor(message: string, error?: any, props?: ITelemetryProperties);
    // (undocumented)
    readonly error?: any;
    // (undocumented)
    readonly errorType = ContainerErrorType.genericError;
}

// @public
export class ThrottlingWarning extends LoggingError implements IThrottlingWarning, IFluidErrorBase {
    // (undocumented)
    readonly errorType = ContainerErrorType.throttlingError;
    // (undocumented)
    readonly retryAfterSeconds: number;
    static wrap(error: unknown, retryAfterSeconds: number, logger: ITelemetryLogger): IThrottlingWarning;
}

// @public
export class UsageError extends LoggingError implements IFluidErrorBase {
    constructor(message: string);
    // (undocumented)
    readonly errorType = "usageError";
}

// (No @packageDocumentation comment for this package)

```