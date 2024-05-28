/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type * as old from "@fluidframework/cell-previous/internal";

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
 * "ClassDeclaration_CellFactory": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_CellFactory():
    TypeOnly<old.CellFactory>;
declare function use_current_ClassDeclaration_CellFactory(
    use: TypeOnly<current.CellFactory>): void;
use_current_ClassDeclaration_CellFactory(
    get_old_ClassDeclaration_CellFactory());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_CellFactory": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_CellFactory():
    TypeOnly<current.CellFactory>;
declare function use_old_ClassDeclaration_CellFactory(
    use: TypeOnly<old.CellFactory>): void;
use_old_ClassDeclaration_CellFactory(
    get_current_ClassDeclaration_CellFactory());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ICellAttributionOptions": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_ICellAttributionOptions():
    TypeOnly<old.ICellAttributionOptions>;
declare function use_current_InterfaceDeclaration_ICellAttributionOptions(
    use: TypeOnly<current.ICellAttributionOptions>): void;
use_current_InterfaceDeclaration_ICellAttributionOptions(
    get_old_InterfaceDeclaration_ICellAttributionOptions());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ICellAttributionOptions": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_ICellAttributionOptions():
    TypeOnly<current.ICellAttributionOptions>;
declare function use_old_InterfaceDeclaration_ICellAttributionOptions(
    use: TypeOnly<old.ICellAttributionOptions>): void;
use_old_InterfaceDeclaration_ICellAttributionOptions(
    get_current_InterfaceDeclaration_ICellAttributionOptions());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ICellOptions": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_ICellOptions():
    TypeOnly<old.ICellOptions>;
declare function use_current_InterfaceDeclaration_ICellOptions(
    use: TypeOnly<current.ICellOptions>): void;
use_current_InterfaceDeclaration_ICellOptions(
    get_old_InterfaceDeclaration_ICellOptions());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ICellOptions": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_ICellOptions():
    TypeOnly<current.ICellOptions>;
declare function use_old_InterfaceDeclaration_ICellOptions(
    use: TypeOnly<old.ICellOptions>): void;
use_old_InterfaceDeclaration_ICellOptions(
    get_current_InterfaceDeclaration_ICellOptions());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedCell": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_ISharedCell():
    TypeOnly<old.ISharedCell>;
declare function use_current_InterfaceDeclaration_ISharedCell(
    use: TypeOnly<current.ISharedCell>): void;
use_current_InterfaceDeclaration_ISharedCell(
    get_old_InterfaceDeclaration_ISharedCell());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedCell": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_ISharedCell():
    TypeOnly<current.ISharedCell>;
declare function use_old_InterfaceDeclaration_ISharedCell(
    use: TypeOnly<old.ISharedCell>): void;
use_old_InterfaceDeclaration_ISharedCell(
    get_current_InterfaceDeclaration_ISharedCell());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedCellEvents": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_ISharedCellEvents():
    TypeOnly<old.ISharedCellEvents<any>>;
declare function use_current_InterfaceDeclaration_ISharedCellEvents(
    use: TypeOnly<current.ISharedCellEvents<any>>): void;
use_current_InterfaceDeclaration_ISharedCellEvents(
    get_old_InterfaceDeclaration_ISharedCellEvents());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedCellEvents": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_ISharedCellEvents():
    TypeOnly<current.ISharedCellEvents<any>>;
declare function use_old_InterfaceDeclaration_ISharedCellEvents(
    use: TypeOnly<old.ISharedCellEvents<any>>): void;
use_old_InterfaceDeclaration_ISharedCellEvents(
    get_current_InterfaceDeclaration_ISharedCellEvents());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_SharedCell": {"forwardCompat": false}
 */
declare function get_old_VariableDeclaration_SharedCell():
    TypeOnly<typeof old.SharedCell>;
declare function use_current_VariableDeclaration_SharedCell(
    use: TypeOnly<typeof current.SharedCell>): void;
use_current_VariableDeclaration_SharedCell(
    get_old_VariableDeclaration_SharedCell());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_SharedCell": {"backCompat": false}
 */
declare function get_current_VariableDeclaration_SharedCell():
    TypeOnly<typeof current.SharedCell>;
declare function use_old_VariableDeclaration_SharedCell(
    use: TypeOnly<typeof old.SharedCell>): void;
use_old_VariableDeclaration_SharedCell(
    get_current_VariableDeclaration_SharedCell());
