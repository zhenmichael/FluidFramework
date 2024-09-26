/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type * as old from "@fluid-internal/client-utils-previous";
import type { TypeOnly, MinimalType, FullType, requireAssignableTo } from "@fluidframework/build-tools";

import type * as current from "../../index.js";

declare type MakeUnusedImportErrorsGoAway<T> = TypeOnly<T> | MinimalType<T> | FullType<T> | typeof old | typeof current | requireAssignableTo<true, true>;

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_Buffer": {"forwardCompat": false}
 */
declare type old_as_current_for_Class_Buffer = requireAssignableTo<TypeOnly<old.Buffer>, TypeOnly<current.Buffer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_Buffer": {"backCompat": false}
 */
declare type current_as_old_for_Class_Buffer = requireAssignableTo<TypeOnly<current.Buffer>, TypeOnly<old.Buffer>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_EventEmitter": {"forwardCompat": false}
 */
declare type old_as_current_for_Class_EventEmitter = requireAssignableTo<TypeOnly<old.EventEmitter>, TypeOnly<current.EventEmitter>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_EventEmitter": {"backCompat": false}
 */
declare type current_as_old_for_Class_EventEmitter = requireAssignableTo<TypeOnly<current.EventEmitter>, TypeOnly<old.EventEmitter>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_Trace": {"forwardCompat": false}
 */
declare type old_as_current_for_Class_Trace = requireAssignableTo<TypeOnly<old.Trace>, TypeOnly<current.Trace>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_Trace": {"backCompat": false}
 */
declare type current_as_old_for_Class_Trace = requireAssignableTo<TypeOnly<current.Trace>, TypeOnly<old.Trace>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_TypedEventEmitter": {"forwardCompat": false}
 */
declare type old_as_current_for_Class_TypedEventEmitter = requireAssignableTo<TypeOnly<old.TypedEventEmitter<any>>, TypeOnly<current.TypedEventEmitter<any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_TypedEventEmitter": {"backCompat": false}
 */
declare type current_as_old_for_Class_TypedEventEmitter = requireAssignableTo<TypeOnly<current.TypedEventEmitter<any>>, TypeOnly<old.TypedEventEmitter<any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassStatics_Buffer": {"backCompat": false}
 */
declare type current_as_old_for_ClassStatics_Buffer = requireAssignableTo<TypeOnly<typeof current.Buffer>, TypeOnly<typeof old.Buffer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassStatics_EventEmitter": {"backCompat": false}
 */
declare type current_as_old_for_ClassStatics_EventEmitter = requireAssignableTo<TypeOnly<typeof current.EventEmitter>, TypeOnly<typeof old.EventEmitter>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassStatics_Trace": {"backCompat": false}
 */
declare type current_as_old_for_ClassStatics_Trace = requireAssignableTo<TypeOnly<typeof current.Trace>, TypeOnly<typeof old.Trace>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassStatics_TypedEventEmitter": {"backCompat": false}
 */
declare type current_as_old_for_ClassStatics_TypedEventEmitter = requireAssignableTo<TypeOnly<typeof current.TypedEventEmitter>, TypeOnly<typeof old.TypedEventEmitter>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Function_gitHashFile": {"backCompat": false}
 */
declare type current_as_old_for_Function_gitHashFile = requireAssignableTo<TypeOnly<typeof current.gitHashFile>, TypeOnly<typeof old.gitHashFile>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Function_hashFile": {"backCompat": false}
 */
declare type current_as_old_for_Function_hashFile = requireAssignableTo<TypeOnly<typeof current.hashFile>, TypeOnly<typeof old.hashFile>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Function_stringToBuffer": {"backCompat": false}
 */
declare type current_as_old_for_Function_stringToBuffer = requireAssignableTo<TypeOnly<typeof current.stringToBuffer>, TypeOnly<typeof old.stringToBuffer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Function_Uint8ArrayToArrayBuffer": {"backCompat": false}
 */
declare type current_as_old_for_Function_Uint8ArrayToArrayBuffer = requireAssignableTo<TypeOnly<typeof current.Uint8ArrayToArrayBuffer>, TypeOnly<typeof old.Uint8ArrayToArrayBuffer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Function_Uint8ArrayToString": {"backCompat": false}
 */
declare type current_as_old_for_Function_Uint8ArrayToString = requireAssignableTo<TypeOnly<typeof current.Uint8ArrayToString>, TypeOnly<typeof old.Uint8ArrayToString>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_ITraceEvent": {"forwardCompat": false}
 */
declare type old_as_current_for_Interface_ITraceEvent = requireAssignableTo<TypeOnly<old.ITraceEvent>, TypeOnly<current.ITraceEvent>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_ITraceEvent": {"backCompat": false}
 */
declare type current_as_old_for_Interface_ITraceEvent = requireAssignableTo<TypeOnly<current.ITraceEvent>, TypeOnly<old.ITraceEvent>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_EventEmitterEventType": {"forwardCompat": false}
 */
declare type old_as_current_for_TypeAlias_EventEmitterEventType = requireAssignableTo<TypeOnly<old.EventEmitterEventType>, TypeOnly<current.EventEmitterEventType>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_EventEmitterEventType": {"backCompat": false}
 */
declare type current_as_old_for_TypeAlias_EventEmitterEventType = requireAssignableTo<TypeOnly<current.EventEmitterEventType>, TypeOnly<old.EventEmitterEventType>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_IsoBuffer": {"forwardCompat": false}
 */
declare type old_as_current_for_TypeAlias_IsoBuffer = requireAssignableTo<TypeOnly<old.IsoBuffer>, TypeOnly<current.IsoBuffer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_IsoBuffer": {"backCompat": false}
 */
declare type current_as_old_for_TypeAlias_IsoBuffer = requireAssignableTo<TypeOnly<current.IsoBuffer>, TypeOnly<old.IsoBuffer>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_IsomorphicPerformance": {"forwardCompat": false}
 */
declare type old_as_current_for_TypeAlias_IsomorphicPerformance = requireAssignableTo<TypeOnly<old.IsomorphicPerformance>, TypeOnly<current.IsomorphicPerformance>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_IsomorphicPerformance": {"backCompat": false}
 */
declare type current_as_old_for_TypeAlias_IsomorphicPerformance = requireAssignableTo<TypeOnly<current.IsomorphicPerformance>, TypeOnly<old.IsomorphicPerformance>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_TypedEventTransform": {"forwardCompat": false}
 */
declare type old_as_current_for_TypeAlias_TypedEventTransform = requireAssignableTo<TypeOnly<old.TypedEventTransform<any,any>>, TypeOnly<current.TypedEventTransform<any,any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_TypedEventTransform": {"backCompat": false}
 */
declare type current_as_old_for_TypeAlias_TypedEventTransform = requireAssignableTo<TypeOnly<current.TypedEventTransform<any,any>>, TypeOnly<old.TypedEventTransform<any,any>>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Variable_bufferToString": {"backCompat": false}
 */
declare type current_as_old_for_Variable_bufferToString = requireAssignableTo<TypeOnly<typeof current.bufferToString>, TypeOnly<typeof old.bufferToString>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Variable_fromBase64ToUtf8": {"backCompat": false}
 */
declare type current_as_old_for_Variable_fromBase64ToUtf8 = requireAssignableTo<TypeOnly<typeof current.fromBase64ToUtf8>, TypeOnly<typeof old.fromBase64ToUtf8>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Variable_fromUtf8ToBase64": {"backCompat": false}
 */
declare type current_as_old_for_Variable_fromUtf8ToBase64 = requireAssignableTo<TypeOnly<typeof current.fromUtf8ToBase64>, TypeOnly<typeof old.fromUtf8ToBase64>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Variable_IsoBuffer": {"backCompat": false}
 */
declare type current_as_old_for_Variable_IsoBuffer = requireAssignableTo<TypeOnly<typeof current.IsoBuffer>, TypeOnly<typeof old.IsoBuffer>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Variable_performance": {"backCompat": false}
 */
declare type current_as_old_for_Variable_performance = requireAssignableTo<TypeOnly<typeof current.performance>, TypeOnly<typeof old.performance>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Variable_toUtf8": {"backCompat": false}
 */
declare type current_as_old_for_Variable_toUtf8 = requireAssignableTo<TypeOnly<typeof current.toUtf8>, TypeOnly<typeof old.toUtf8>>
