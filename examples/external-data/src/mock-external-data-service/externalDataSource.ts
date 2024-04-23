/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { TypedEventEmitter } from "@fluid-internal/client-utils";
import type { IEvent } from "@fluidframework/core-interfaces";
import { Response } from "node-fetch";

import { ITaskData, ITaskListData } from "../model-interface/index.js";

const taskList1: ITaskData = {
	12: {
		name: "Alpha",
		priority: 1,
	},
	34: {
		name: "Beta",
		priority: 2,
	},
	56: {
		name: "Gamma",
		priority: 3,
	},
	78: {
		name: "Delta",
		priority: 4,
	},
};

const taskList2: ITaskData = {
	17: {
		name: "CompletelyDifferentAlpha",
		priority: 42,
	},
};

const startingExternalData: ITaskListData = {
	"task-list-1": taskList1,
	"task-list-2": taskList2,
};

/**
 * Events emitted by {@link ExternalDataSource}.
 */
export interface IExternalDataSourceEvents extends IEvent {
	/**
	 * Emitted when the external data changes.
	 * @remarks Debug API for demo purposes - the real scenario will need to learn about the data changing via the
	 * webhook path.
	 */
	(event: "debugDataWritten", listener: (data: ITaskData, externalTaskListId: string) => void);
}

/**
 * Class to let us fake having an external data source and abstract the particulars of its implementation.
 *
 * @remarks
 *
 * In a more-real scenario, maybe this is communicating with some server via RESTful APIs.
 *
 * It's an event emitter just so we can render a reasonable debug view on it for demo purposes - in more-realistic
 * cases we would expect to learn about data updates through webhooks or similar.
 *
 * @privateRemarks
 *
 * TODO: Consider adding a fake delay to the async calls to give us a better approximation of expected experience.
 */
export class ExternalDataSource extends TypedEventEmitter<IExternalDataSourceEvents> {
	private data: ITaskListData;

	public constructor() {
		super();

		this.data = startingExternalData;
	}

	/**
	 * Retrieve a specific task list from the data source.
	 * @param externalTaskListId - id that uniquely identifies the task list to retrieve.
	 *
	 * @returns A promise that resolves with the object stored in the external source.
	 *
	 * @remarks This is async to simulate the more-realistic scenario of a network request.
	 */
	public async fetchData(externalTaskListId: string): Promise<Response> {
		const jsonData = { taskList: this.data[externalTaskListId] };
		return new Response(JSON.stringify(jsonData), {
			status: 200,
			statusText: "OK",
			headers: { "Content-Type": "application/json" },
		});
	}

	/**
	 * Write the specified data to the external source.
	 * @param data - The string data to write.
	 * @param externalTaskListId - id that will serve as key to retrieve the task list.
	 * Will overwrite data under the same id if any exists.
	 *
	 * @remarks
	 * This id is generated by the External Data Service.
	 *
	 * @returns A promise that resolves when the write completes.
	 */
	public async writeData(data: ITaskData, externalTaskListId: string): Promise<Response> {
		this.data[externalTaskListId] = data;

		// Emit for debug views to update
		this.emit("debugDataWritten", externalTaskListId, data);
		return new Response(undefined, {
			status: 200,
			statusText: "OK",
			headers: { "Content-Type": "application/json" },
		});
	}

	/**
	 * Reset the external data to a good demo state.
	 * @remarks Debug API for demo purposes, not really something we'd expect to find on a real external data source.
	 */
	public debugResetData(): void {
		this.data = startingExternalData;

		// Emit for debug views to update
		this.emit("debugDataWritten", this.data);
	}
}