/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-test-generator in @fluidframework/build-tools.
 */
import type * as old from "@fluidframework/driver-web-cache-previous";
import type * as current from "../../index";


// See 'build-tools/src/type-test-generator/compatibility.ts' for more information.
type TypeOnly<T> = T extends number
	? number
	: T extends string
	? string
	: T extends boolean | bigint | symbol
	? T
	: {
			[P in keyof T]: TypeOnly<T[P]>;
	  };

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_FluidCache": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_FluidCache():
    TypeOnly<old.FluidCache>;
declare function use_current_ClassDeclaration_FluidCache(
    use: TypeOnly<current.FluidCache>);
use_current_ClassDeclaration_FluidCache(
    get_old_ClassDeclaration_FluidCache());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_FluidCache": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_FluidCache():
    TypeOnly<current.FluidCache>;
declare function use_old_ClassDeclaration_FluidCache(
    use: TypeOnly<old.FluidCache>);
use_old_ClassDeclaration_FluidCache(
    get_current_ClassDeclaration_FluidCache());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_FluidCacheConfig": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_FluidCacheConfig():
    TypeOnly<old.FluidCacheConfig>;
declare function use_current_InterfaceDeclaration_FluidCacheConfig(
    use: TypeOnly<current.FluidCacheConfig>);
use_current_InterfaceDeclaration_FluidCacheConfig(
    get_old_InterfaceDeclaration_FluidCacheConfig());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_FluidCacheConfig": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_FluidCacheConfig():
    TypeOnly<current.FluidCacheConfig>;
declare function use_old_InterfaceDeclaration_FluidCacheConfig(
    use: TypeOnly<old.FluidCacheConfig>);
use_old_InterfaceDeclaration_FluidCacheConfig(
    get_current_InterfaceDeclaration_FluidCacheConfig());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_deleteFluidCacheIndexDbInstance": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_deleteFluidCacheIndexDbInstance():
    TypeOnly<typeof old.deleteFluidCacheIndexDbInstance>;
declare function use_current_FunctionDeclaration_deleteFluidCacheIndexDbInstance(
    use: TypeOnly<typeof current.deleteFluidCacheIndexDbInstance>);
use_current_FunctionDeclaration_deleteFluidCacheIndexDbInstance(
    get_old_FunctionDeclaration_deleteFluidCacheIndexDbInstance());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_deleteFluidCacheIndexDbInstance": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_deleteFluidCacheIndexDbInstance():
    TypeOnly<typeof current.deleteFluidCacheIndexDbInstance>;
declare function use_old_FunctionDeclaration_deleteFluidCacheIndexDbInstance(
    use: TypeOnly<typeof old.deleteFluidCacheIndexDbInstance>);
use_old_FunctionDeclaration_deleteFluidCacheIndexDbInstance(
    get_current_FunctionDeclaration_deleteFluidCacheIndexDbInstance());
