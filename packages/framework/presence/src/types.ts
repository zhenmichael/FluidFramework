/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import type { NotificationsManager } from "./notificationsManager.js";

import type { InternalTypes } from "@fluidframework/presence/internal/exposedInternalTypes";

/**
 * Unique address within a session.
 *
 * @remarks
 * A string known to all clients working with a certain Workspace and unique
 * among Workspaces. Recommend using specifying concatenation of: type of
 * unique identifier, `:` (required), and unique identifier.
 *
 * @example Examples
 * ```typescript
 *   "guid:g0fl001d-1415-5000-c00l-g0fa54g0b1g1"
 *   "address:object0/sub-object2:pointers"
 * ```
 *
 * @alpha
 */
export type PresenceWorkspaceAddress = `${string}:${string}`;

// #region PresenceStates

/**
 * Single entry in {@link PresenceStatesSchema}.
 *
 * @alpha
 */
export type PresenceStatesEntry<
	TKey extends string,
	TValue extends InternalTypes.ValueDirectoryOrState<unknown>,
	TManager = unknown,
> = InternalTypes.ManagerFactory<TKey, TValue, TManager>;

/**
 * Schema for a {@link PresenceStates} workspace.
 *
 * Keys of schema are the keys of the {@link PresenceStates} providing access to `Value Manager`s.
 *
 * @alpha
 */
export interface PresenceStatesSchema {
	[key: string]: PresenceStatesEntry<typeof key, InternalTypes.ValueDirectoryOrState<any>>;
}

/**
 * Map of `Value Manager`s registered with {@link PresenceStates}.
 *
 * @sealed
 * @alpha
 */
export type PresenceStatesEntries<TSchema extends PresenceStatesSchema> = {
	/**
	 * Registered `Value Manager`s
	 */
	readonly [Key in keyof TSchema]: ReturnType<
		TSchema[Key]
	>["manager"] extends InternalTypes.StateValue<infer TManager>
		? TManager
		: never;
};

/**
 * `PresenceStates` maintains a registry of `Value Manager`s that all share and provide access to
 * presence state values across client members in a session.
 *
 * `Value Manager`s offer variations on how to manage states, but all share same principle that
 * each client's state is independent and may only be updated by originating client.
 *
 * @sealed
 * @alpha
 */
export interface PresenceStates<
	TSchema extends PresenceStatesSchema,
	TManagerConstraints = unknown,
> {
	/**
	 * Registers a new `Value Manager` with the {@link PresenceStates}.
	 * @param key - new unique key for the `Value Manager`
	 * @param manager - factory for creating a `Value Manager`
	 */
	add<
		TKey extends string,
		TValue extends InternalTypes.ValueDirectoryOrState<any>,
		TManager extends TManagerConstraints,
	>(
		key: TKey,
		manager: InternalTypes.ManagerFactory<TKey, TValue, TManager>,
	): asserts this is PresenceStates<
		TSchema & Record<TKey, InternalTypes.ManagerFactory<TKey, TValue, TManager>>,
		TManagerConstraints
	>;

	/**
	 * Registry of `Value Manager`s.
	 */
	readonly props: PresenceStatesEntries<TSchema>;
}

// #endregion PresenceStates

// #region PresenceNotifications

/**
 * Schema for a {@link PresenceNotifications} workspace.
 *
 * Keys of schema are the keys of the {@link PresenceNotifications} providing access to {@link NotificationsManager}s.
 *
 * @alpha
 */
export interface PresenceNotificationsSchema {
	[key: string]: InternalTypes.ManagerFactory<
		typeof key,
		InternalTypes.ValueRequiredState<InternalTypes.NotificationType>,
		NotificationsManager<any>
	>;
}

/**
 * `PresenceNotifications` maintains a registry of {@link NotificationsManager}s
 * that facilitate messages across client members in a session.
 *
 * @sealed
 * @alpha
 */
export type PresenceNotifications<TSchema extends PresenceNotificationsSchema> =
	PresenceStates<TSchema, NotificationsManager<any>>;

// #endregion PresenceNotifications
