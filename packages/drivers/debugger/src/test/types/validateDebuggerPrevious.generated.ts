/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type * as old from "@fluidframework/debugger-previous/internal";

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
 * "ClassDeclaration_DebugReplayController": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_DebugReplayController():
    TypeOnly<old.DebugReplayController>;
declare function use_current_ClassDeclaration_DebugReplayController(
    use: TypeOnly<current.DebugReplayController>): void;
use_current_ClassDeclaration_DebugReplayController(
    get_old_ClassDeclaration_DebugReplayController());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_DebugReplayController": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_DebugReplayController():
    TypeOnly<current.DebugReplayController>;
declare function use_old_ClassDeclaration_DebugReplayController(
    use: TypeOnly<old.DebugReplayController>): void;
use_old_ClassDeclaration_DebugReplayController(
    get_current_ClassDeclaration_DebugReplayController());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_DebuggerUI": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_DebuggerUI():
    TypeOnly<old.DebuggerUI>;
declare function use_current_ClassDeclaration_DebuggerUI(
    use: TypeOnly<current.DebuggerUI>): void;
use_current_ClassDeclaration_DebuggerUI(
    get_old_ClassDeclaration_DebuggerUI());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_DebuggerUI": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_DebuggerUI():
    TypeOnly<current.DebuggerUI>;
declare function use_old_ClassDeclaration_DebuggerUI(
    use: TypeOnly<old.DebuggerUI>): void;
use_old_ClassDeclaration_DebuggerUI(
    get_current_ClassDeclaration_DebuggerUI());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDebuggerController": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IDebuggerController():
    TypeOnly<old.IDebuggerController>;
declare function use_current_InterfaceDeclaration_IDebuggerController(
    use: TypeOnly<current.IDebuggerController>): void;
use_current_InterfaceDeclaration_IDebuggerController(
    get_old_InterfaceDeclaration_IDebuggerController());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDebuggerController": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IDebuggerController():
    TypeOnly<current.IDebuggerController>;
declare function use_old_InterfaceDeclaration_IDebuggerController(
    use: TypeOnly<old.IDebuggerController>): void;
use_old_InterfaceDeclaration_IDebuggerController(
    get_current_InterfaceDeclaration_IDebuggerController());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDebuggerUI": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IDebuggerUI():
    TypeOnly<old.IDebuggerUI>;
declare function use_current_InterfaceDeclaration_IDebuggerUI(
    use: TypeOnly<current.IDebuggerUI>): void;
use_current_InterfaceDeclaration_IDebuggerUI(
    get_old_InterfaceDeclaration_IDebuggerUI());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDebuggerUI": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IDebuggerUI():
    TypeOnly<current.IDebuggerUI>;
declare function use_old_InterfaceDeclaration_IDebuggerUI(
    use: TypeOnly<old.IDebuggerUI>): void;
use_old_InterfaceDeclaration_IDebuggerUI(
    get_current_InterfaceDeclaration_IDebuggerUI());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_debuggerUIFactory": {"forwardCompat": false}
 */
declare function get_old_TypeAliasDeclaration_debuggerUIFactory():
    TypeOnly<old.debuggerUIFactory>;
declare function use_current_TypeAliasDeclaration_debuggerUIFactory(
    use: TypeOnly<current.debuggerUIFactory>): void;
use_current_TypeAliasDeclaration_debuggerUIFactory(
    get_old_TypeAliasDeclaration_debuggerUIFactory());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_debuggerUIFactory": {"backCompat": false}
 */
declare function get_current_TypeAliasDeclaration_debuggerUIFactory():
    TypeOnly<current.debuggerUIFactory>;
declare function use_old_TypeAliasDeclaration_debuggerUIFactory(
    use: TypeOnly<old.debuggerUIFactory>): void;
use_old_TypeAliasDeclaration_debuggerUIFactory(
    get_current_TypeAliasDeclaration_debuggerUIFactory());
