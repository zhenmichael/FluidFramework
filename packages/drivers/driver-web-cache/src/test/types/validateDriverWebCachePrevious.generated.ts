/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type { TypeOnly, MinimalType, FullType, requireAssignableTo } from "@fluidframework/build-tools";
import type * as old from "@fluidframework/driver-web-cache-previous/internal";

import type * as current from "../../index.js";

declare type MakeUnusedImportErrorsGoAway<T> = TypeOnly<T> | MinimalType<T> | FullType<T> | typeof old | typeof current | requireAssignableTo<true, true>;

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_FluidCache": {"forwardCompat": false}
 */
declare type old_as_current_for_Class_FluidCache = requireAssignableTo<TypeOnly<old.FluidCache>, TypeOnly<current.FluidCache>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_FluidCache": {"backCompat": false}
 */
declare type current_as_old_for_Class_FluidCache = requireAssignableTo<TypeOnly<current.FluidCache>, TypeOnly<old.FluidCache>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassStatics_FluidCache": {"backCompat": false}
 */
declare type current_as_old_for_ClassStatics_FluidCache = requireAssignableTo<TypeOnly<typeof current.FluidCache>, TypeOnly<typeof old.FluidCache>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Function_deleteFluidCacheIndexDbInstance": {"backCompat": false}
 */
declare type current_as_old_for_Function_deleteFluidCacheIndexDbInstance = requireAssignableTo<TypeOnly<typeof current.deleteFluidCacheIndexDbInstance>, TypeOnly<typeof old.deleteFluidCacheIndexDbInstance>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_FluidCacheConfig": {"forwardCompat": false}
 */
declare type old_as_current_for_Interface_FluidCacheConfig = requireAssignableTo<TypeOnly<old.FluidCacheConfig>, TypeOnly<current.FluidCacheConfig>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_FluidCacheConfig": {"backCompat": false}
 */
declare type current_as_old_for_Interface_FluidCacheConfig = requireAssignableTo<TypeOnly<current.FluidCacheConfig>, TypeOnly<old.FluidCacheConfig>>
