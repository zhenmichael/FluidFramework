/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type * as old from "@fluidframework/ordered-collection-previous/internal";

import type * as current from "../../index.js";

type ValueOf<T> = T[keyof T];
type OnlySymbols<T> = T extends symbol ? T : never;
type WellKnownSymbols = OnlySymbols<ValueOf<typeof Symbol>>;
/**
 * Omit (replace with never) a key if it is a custom symbol,
 * not just symbol or a well known symbol from the global Symbol.
 */
type SkipUniqueSymbols<Key> = symbol extends Key
	? Key // Key is symbol or a generalization of symbol, so leave it as is.
	: Key extends symbol
		? Key extends WellKnownSymbols
			? Key // Key is a well known symbol from the global Symbol object. These are shared between packages, so they are fine and kept as is.
			: never // Key is most likely some specialized symbol, typically a unique symbol. These break type comparisons so are removed by replacing them with never.
		: Key; // Key is not a symbol (for example its a string or number), so leave it as is.
/**
 * Remove details of T which are incompatible with type testing while keeping as much as is practical.
 *
 * See 'build-tools/packages/build-tools/src/typeValidator/compatibility.ts' for more information.
 */
type TypeOnly<T> = T extends number
	? number
	: T extends boolean | bigint | string
		? T
		: T extends symbol
			? SkipUniqueSymbols<T>
			: {
					[P in keyof T as SkipUniqueSymbols<P>]: TypeOnly<T[P]>;
				};

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_ConsensusCallback": {"forwardCompat": false}
 */
declare function get_old_TypeAliasDeclaration_ConsensusCallback():
    TypeOnly<old.ConsensusCallback<any>>;
declare function use_current_TypeAliasDeclaration_ConsensusCallback(
    use: TypeOnly<current.ConsensusCallback<any>>): void;
use_current_TypeAliasDeclaration_ConsensusCallback(
    get_old_TypeAliasDeclaration_ConsensusCallback());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_ConsensusCallback": {"backCompat": false}
 */
declare function get_current_TypeAliasDeclaration_ConsensusCallback():
    TypeOnly<current.ConsensusCallback<any>>;
declare function use_old_TypeAliasDeclaration_ConsensusCallback(
    use: TypeOnly<old.ConsensusCallback<any>>): void;
use_old_TypeAliasDeclaration_ConsensusCallback(
    get_current_TypeAliasDeclaration_ConsensusCallback());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusOrderedCollection": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_ConsensusOrderedCollection():
    TypeOnly<old.ConsensusOrderedCollection>;
declare function use_current_ClassDeclaration_ConsensusOrderedCollection(
    use: TypeOnly<current.ConsensusOrderedCollection>): void;
use_current_ClassDeclaration_ConsensusOrderedCollection(
    get_old_ClassDeclaration_ConsensusOrderedCollection());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusOrderedCollection": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_ConsensusOrderedCollection():
    TypeOnly<current.ConsensusOrderedCollection>;
declare function use_old_ClassDeclaration_ConsensusOrderedCollection(
    use: TypeOnly<old.ConsensusOrderedCollection>): void;
use_old_ClassDeclaration_ConsensusOrderedCollection(
    get_current_ClassDeclaration_ConsensusOrderedCollection());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_ConsensusQueue": {"forwardCompat": false}
 */
declare function get_old_VariableDeclaration_ConsensusQueue():
    TypeOnly<typeof old.ConsensusQueue>;
declare function use_current_VariableDeclaration_ConsensusQueue(
    use: TypeOnly<typeof current.ConsensusQueue>): void;
use_current_VariableDeclaration_ConsensusQueue(
    get_old_VariableDeclaration_ConsensusQueue());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_ConsensusQueue": {"backCompat": false}
 */
declare function get_current_VariableDeclaration_ConsensusQueue():
    TypeOnly<typeof current.ConsensusQueue>;
declare function use_old_VariableDeclaration_ConsensusQueue(
    use: TypeOnly<typeof old.ConsensusQueue>): void;
use_old_VariableDeclaration_ConsensusQueue(
    get_current_VariableDeclaration_ConsensusQueue());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_ConsensusQueue": {"forwardCompat": false}
 */
declare function get_old_TypeAliasDeclaration_ConsensusQueue():
    TypeOnly<old.ConsensusQueue>;
declare function use_current_TypeAliasDeclaration_ConsensusQueue(
    use: TypeOnly<current.ConsensusQueue>): void;
use_current_TypeAliasDeclaration_ConsensusQueue(
    get_old_TypeAliasDeclaration_ConsensusQueue());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_ConsensusQueue": {"backCompat": false}
 */
declare function get_current_TypeAliasDeclaration_ConsensusQueue():
    TypeOnly<current.ConsensusQueue>;
declare function use_old_TypeAliasDeclaration_ConsensusQueue(
    use: TypeOnly<old.ConsensusQueue>): void;
use_old_TypeAliasDeclaration_ConsensusQueue(
    get_current_TypeAliasDeclaration_ConsensusQueue());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusQueueClass": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_ConsensusQueueClass():
    TypeOnly<old.ConsensusQueueClass>;
declare function use_current_ClassDeclaration_ConsensusQueueClass(
    use: TypeOnly<current.ConsensusQueueClass>): void;
use_current_ClassDeclaration_ConsensusQueueClass(
    get_old_ClassDeclaration_ConsensusQueueClass());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusQueueClass": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_ConsensusQueueClass():
    TypeOnly<current.ConsensusQueueClass>;
declare function use_old_ClassDeclaration_ConsensusQueueClass(
    use: TypeOnly<old.ConsensusQueueClass>): void;
use_old_ClassDeclaration_ConsensusQueueClass(
    get_current_ClassDeclaration_ConsensusQueueClass());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusQueueFactory": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_ConsensusQueueFactory():
    TypeOnly<old.ConsensusQueueFactory>;
declare function use_current_ClassDeclaration_ConsensusQueueFactory(
    use: TypeOnly<current.ConsensusQueueFactory>): void;
use_current_ClassDeclaration_ConsensusQueueFactory(
    get_old_ClassDeclaration_ConsensusQueueFactory());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusQueueFactory": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_ConsensusQueueFactory():
    TypeOnly<current.ConsensusQueueFactory>;
declare function use_old_ClassDeclaration_ConsensusQueueFactory(
    use: TypeOnly<old.ConsensusQueueFactory>): void;
use_old_ClassDeclaration_ConsensusQueueFactory(
    get_current_ClassDeclaration_ConsensusQueueFactory());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "EnumDeclaration_ConsensusResult": {"forwardCompat": false}
 */
declare function get_old_EnumDeclaration_ConsensusResult():
    TypeOnly<old.ConsensusResult>;
declare function use_current_EnumDeclaration_ConsensusResult(
    use: TypeOnly<current.ConsensusResult>): void;
use_current_EnumDeclaration_ConsensusResult(
    get_old_EnumDeclaration_ConsensusResult());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "EnumDeclaration_ConsensusResult": {"backCompat": false}
 */
declare function get_current_EnumDeclaration_ConsensusResult():
    TypeOnly<current.ConsensusResult>;
declare function use_old_EnumDeclaration_ConsensusResult(
    use: TypeOnly<old.ConsensusResult>): void;
use_old_EnumDeclaration_ConsensusResult(
    get_current_EnumDeclaration_ConsensusResult());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollection": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IConsensusOrderedCollection():
    TypeOnly<old.IConsensusOrderedCollection>;
declare function use_current_InterfaceDeclaration_IConsensusOrderedCollection(
    use: TypeOnly<current.IConsensusOrderedCollection>): void;
use_current_InterfaceDeclaration_IConsensusOrderedCollection(
    get_old_InterfaceDeclaration_IConsensusOrderedCollection());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollection": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IConsensusOrderedCollection():
    TypeOnly<current.IConsensusOrderedCollection>;
declare function use_old_InterfaceDeclaration_IConsensusOrderedCollection(
    use: TypeOnly<old.IConsensusOrderedCollection>): void;
use_old_InterfaceDeclaration_IConsensusOrderedCollection(
    get_current_InterfaceDeclaration_IConsensusOrderedCollection());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollectionEvents": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IConsensusOrderedCollectionEvents():
    TypeOnly<old.IConsensusOrderedCollectionEvents<any>>;
declare function use_current_InterfaceDeclaration_IConsensusOrderedCollectionEvents(
    use: TypeOnly<current.IConsensusOrderedCollectionEvents<any>>): void;
use_current_InterfaceDeclaration_IConsensusOrderedCollectionEvents(
    get_old_InterfaceDeclaration_IConsensusOrderedCollectionEvents());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollectionEvents": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IConsensusOrderedCollectionEvents():
    TypeOnly<current.IConsensusOrderedCollectionEvents<any>>;
declare function use_old_InterfaceDeclaration_IConsensusOrderedCollectionEvents(
    use: TypeOnly<old.IConsensusOrderedCollectionEvents<any>>): void;
use_old_InterfaceDeclaration_IConsensusOrderedCollectionEvents(
    get_current_InterfaceDeclaration_IConsensusOrderedCollectionEvents());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollectionFactory": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IConsensusOrderedCollectionFactory():
    TypeOnly<old.IConsensusOrderedCollectionFactory>;
declare function use_current_InterfaceDeclaration_IConsensusOrderedCollectionFactory(
    use: TypeOnly<current.IConsensusOrderedCollectionFactory>): void;
use_current_InterfaceDeclaration_IConsensusOrderedCollectionFactory(
    get_old_InterfaceDeclaration_IConsensusOrderedCollectionFactory());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollectionFactory": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IConsensusOrderedCollectionFactory():
    TypeOnly<current.IConsensusOrderedCollectionFactory>;
declare function use_old_InterfaceDeclaration_IConsensusOrderedCollectionFactory(
    use: TypeOnly<old.IConsensusOrderedCollectionFactory>): void;
use_old_InterfaceDeclaration_IConsensusOrderedCollectionFactory(
    get_current_InterfaceDeclaration_IConsensusOrderedCollectionFactory());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IOrderedCollection": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IOrderedCollection():
    TypeOnly<old.IOrderedCollection>;
declare function use_current_InterfaceDeclaration_IOrderedCollection(
    use: TypeOnly<current.IOrderedCollection>): void;
use_current_InterfaceDeclaration_IOrderedCollection(
    get_old_InterfaceDeclaration_IOrderedCollection());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IOrderedCollection": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IOrderedCollection():
    TypeOnly<current.IOrderedCollection>;
declare function use_old_InterfaceDeclaration_IOrderedCollection(
    use: TypeOnly<old.IOrderedCollection>): void;
use_old_InterfaceDeclaration_IOrderedCollection(
    get_current_InterfaceDeclaration_IOrderedCollection());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISnapshotable": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_ISnapshotable():
    TypeOnly<old.ISnapshotable<any>>;
declare function use_current_InterfaceDeclaration_ISnapshotable(
    use: TypeOnly<current.ISnapshotable<any>>): void;
use_current_InterfaceDeclaration_ISnapshotable(
    get_old_InterfaceDeclaration_ISnapshotable());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISnapshotable": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_ISnapshotable():
    TypeOnly<current.ISnapshotable<any>>;
declare function use_old_InterfaceDeclaration_ISnapshotable(
    use: TypeOnly<old.ISnapshotable<any>>): void;
use_old_InterfaceDeclaration_ISnapshotable(
    get_current_InterfaceDeclaration_ISnapshotable());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_acquireAndComplete": {"forwardCompat": false}
 */
declare function get_old_FunctionDeclaration_acquireAndComplete():
    TypeOnly<typeof old.acquireAndComplete>;
declare function use_current_FunctionDeclaration_acquireAndComplete(
    use: TypeOnly<typeof current.acquireAndComplete>): void;
use_current_FunctionDeclaration_acquireAndComplete(
    get_old_FunctionDeclaration_acquireAndComplete());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_acquireAndComplete": {"backCompat": false}
 */
declare function get_current_FunctionDeclaration_acquireAndComplete():
    TypeOnly<typeof current.acquireAndComplete>;
declare function use_old_FunctionDeclaration_acquireAndComplete(
    use: TypeOnly<typeof old.acquireAndComplete>): void;
use_old_FunctionDeclaration_acquireAndComplete(
    get_current_FunctionDeclaration_acquireAndComplete());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_waitAcquireAndComplete": {"forwardCompat": false}
 */
declare function get_old_FunctionDeclaration_waitAcquireAndComplete():
    TypeOnly<typeof old.waitAcquireAndComplete>;
declare function use_current_FunctionDeclaration_waitAcquireAndComplete(
    use: TypeOnly<typeof current.waitAcquireAndComplete>): void;
use_current_FunctionDeclaration_waitAcquireAndComplete(
    get_old_FunctionDeclaration_waitAcquireAndComplete());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_waitAcquireAndComplete": {"backCompat": false}
 */
declare function get_current_FunctionDeclaration_waitAcquireAndComplete():
    TypeOnly<typeof current.waitAcquireAndComplete>;
declare function use_old_FunctionDeclaration_waitAcquireAndComplete(
    use: TypeOnly<typeof old.waitAcquireAndComplete>): void;
use_old_FunctionDeclaration_waitAcquireAndComplete(
    get_current_FunctionDeclaration_waitAcquireAndComplete());
