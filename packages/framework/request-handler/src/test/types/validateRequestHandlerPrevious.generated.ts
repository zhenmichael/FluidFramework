/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-test-generator in @fluidframework/build-tools.
 */
import type * as old from "@fluidframework/request-handler-previous";
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
* "TypeAliasDeclaration_RuntimeRequestHandler": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_RuntimeRequestHandler():
    TypeOnly<old.RuntimeRequestHandler>;
declare function use_current_TypeAliasDeclaration_RuntimeRequestHandler(
    use: TypeOnly<current.RuntimeRequestHandler>);
use_current_TypeAliasDeclaration_RuntimeRequestHandler(
    get_old_TypeAliasDeclaration_RuntimeRequestHandler());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_RuntimeRequestHandler": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_RuntimeRequestHandler():
    TypeOnly<current.RuntimeRequestHandler>;
declare function use_old_TypeAliasDeclaration_RuntimeRequestHandler(
    use: TypeOnly<old.RuntimeRequestHandler>);
use_old_TypeAliasDeclaration_RuntimeRequestHandler(
    get_current_TypeAliasDeclaration_RuntimeRequestHandler());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RuntimeRequestHandlerBuilder": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_RuntimeRequestHandlerBuilder():
    TypeOnly<old.RuntimeRequestHandlerBuilder>;
declare function use_current_ClassDeclaration_RuntimeRequestHandlerBuilder(
    use: TypeOnly<current.RuntimeRequestHandlerBuilder>);
use_current_ClassDeclaration_RuntimeRequestHandlerBuilder(
    get_old_ClassDeclaration_RuntimeRequestHandlerBuilder());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RuntimeRequestHandlerBuilder": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_RuntimeRequestHandlerBuilder():
    TypeOnly<current.RuntimeRequestHandlerBuilder>;
declare function use_old_ClassDeclaration_RuntimeRequestHandlerBuilder(
    use: TypeOnly<old.RuntimeRequestHandlerBuilder>);
use_old_ClassDeclaration_RuntimeRequestHandlerBuilder(
    get_current_ClassDeclaration_RuntimeRequestHandlerBuilder());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_buildRuntimeRequestHandler": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_buildRuntimeRequestHandler():
    TypeOnly<typeof old.buildRuntimeRequestHandler>;
declare function use_current_FunctionDeclaration_buildRuntimeRequestHandler(
    use: TypeOnly<typeof current.buildRuntimeRequestHandler>);
use_current_FunctionDeclaration_buildRuntimeRequestHandler(
    get_old_FunctionDeclaration_buildRuntimeRequestHandler());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_buildRuntimeRequestHandler": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_buildRuntimeRequestHandler():
    TypeOnly<typeof current.buildRuntimeRequestHandler>;
declare function use_old_FunctionDeclaration_buildRuntimeRequestHandler(
    use: TypeOnly<typeof old.buildRuntimeRequestHandler>);
use_old_FunctionDeclaration_buildRuntimeRequestHandler(
    get_current_FunctionDeclaration_buildRuntimeRequestHandler());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_createFluidObjectResponse": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_createFluidObjectResponse():
    TypeOnly<typeof old.createFluidObjectResponse>;
declare function use_current_VariableDeclaration_createFluidObjectResponse(
    use: TypeOnly<typeof current.createFluidObjectResponse>);
use_current_VariableDeclaration_createFluidObjectResponse(
    get_old_VariableDeclaration_createFluidObjectResponse());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_createFluidObjectResponse": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_createFluidObjectResponse():
    TypeOnly<typeof current.createFluidObjectResponse>;
declare function use_old_VariableDeclaration_createFluidObjectResponse(
    use: TypeOnly<typeof old.createFluidObjectResponse>);
use_old_VariableDeclaration_createFluidObjectResponse(
    get_current_VariableDeclaration_createFluidObjectResponse());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_handleFromLegacyUri": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_handleFromLegacyUri():
    TypeOnly<typeof old.handleFromLegacyUri>;
declare function use_current_FunctionDeclaration_handleFromLegacyUri(
    use: TypeOnly<typeof current.handleFromLegacyUri>);
use_current_FunctionDeclaration_handleFromLegacyUri(
    get_old_FunctionDeclaration_handleFromLegacyUri());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_handleFromLegacyUri": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_handleFromLegacyUri():
    TypeOnly<typeof current.handleFromLegacyUri>;
declare function use_old_FunctionDeclaration_handleFromLegacyUri(
    use: TypeOnly<typeof old.handleFromLegacyUri>);
use_old_FunctionDeclaration_handleFromLegacyUri(
    get_current_FunctionDeclaration_handleFromLegacyUri());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_rootDataStoreRequestHandler": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_rootDataStoreRequestHandler():
    TypeOnly<typeof old.rootDataStoreRequestHandler>;
declare function use_current_VariableDeclaration_rootDataStoreRequestHandler(
    use: TypeOnly<typeof current.rootDataStoreRequestHandler>);
use_current_VariableDeclaration_rootDataStoreRequestHandler(
    get_old_VariableDeclaration_rootDataStoreRequestHandler());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_rootDataStoreRequestHandler": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_rootDataStoreRequestHandler():
    TypeOnly<typeof current.rootDataStoreRequestHandler>;
declare function use_old_VariableDeclaration_rootDataStoreRequestHandler(
    use: TypeOnly<typeof old.rootDataStoreRequestHandler>);
use_old_VariableDeclaration_rootDataStoreRequestHandler(
    get_current_VariableDeclaration_rootDataStoreRequestHandler());
