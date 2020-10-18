/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

export * from '../src/dependencies/core';

export * from '../src/dependencies/domain';

// import { AddMetadata } from '../src/lib/core/Annotation/AddMetadata';
// const original: Function = Reflect['metadata'];
//
// /* istanbul ignore next */
// if (!original || !original['now']) {
//   // if one day the browser implemented Reflect.metadata. We will reflector all
//   // code related to metadata data in order to have a better performance.
//   if (original) {
//     // ===========================================
//     // Reflect.metadata is defined
//     // ===========================================
//     function metadata(
//       this: { key: string; value: any },
//       target: Function | object,
//       property?: string | symbol,
//       descriptor?: PropertyDescriptor
//     ): any {
//       AddMetadata(this.key, this.value, target, property, descriptor);
//       // save metadata to Reflect.metadata (if have)
//       return original.apply(Reflect, [this.key, this.value])(target, property, descriptor);
//     }
//     Reflect['metadata'] = function (key: string, value: any) {
//       return metadata.bind({ key, value });
//     };
//   } else {
//     // ===========================================
//     // Reflect.metadata is undefined
//     // ===========================================
//     function metadata(
//       this: { key: string; value: any },
//       target: Function | object,
//       property?: string | symbol,
//       descriptor?: PropertyDescriptor
//     ): any {
//       AddMetadata(this.key, this.value, target, property, descriptor);
//     }
//     Reflect['metadata'] = function (key: string, value: any) {
//       return metadata.bind({ key, value });
//     };
//   }
//   Reflect['metadata']['now'] = Date.now();
// }
//
// /*************************************
//  *   Core Types
//  *************************************/
// export {
//   AnyConstructor,
//   Constructor,
//   DefaultConstructor,
//   ParameterConstructor,
//   AbstractConstructor,
// } from '../src/lib/core/Constructor';
// export {
//   Decorators,
//   ClassDecorator,
//   PropertyDecorator,
//   ParameterDecorator,
// } from '../src/lib/core/Decorator/decorators';
// export { Arguments } from '../src/lib/core/Interfaces/Arguments';
// export { Attribute } from '../src/lib/core/Interfaces/Attribute';
// export { Invocation } from '../src/lib/core/Interfaces/Invocation';
// export { Interceptor } from '../src/lib/core/Interfaces/Interceptor';
// export { Interceptable } from '../src/lib/core/Interfaces/Interceptable';
//
// /*************************************
//  *   Agent API
//  *************************************/
// // export { decorateAgent } from './Core/Agent/decorateAgent';
// export { AgentAttribute } from '../src/lib/core/Agent/AgentAttribute';
// export { CreateAgent } from '../src/lib/core/Agent/CreateAgent';
// export { IsAgent } from '../src/lib/core/IsAgent';
// export { GetType } from '../src/lib/core/GetType';
//
// /*************************************
//  *   Sub-module Metadata API
//  *************************************/
// export { GetOrCreate } from '../src/lib/core/Wisdom';
//
// /*************************************
//  *   Reflection API
//  *************************************/
// export { Reflector } from '../src/lib/core/Reflector';
//
// export { decorate } from '../src/lib/core/Decorator/decorate';
// export { decorateClass } from '../src/lib/core/Decorator/decorateClass';
// export { decorateClassProperty } from '../src/lib/core/Decorator/decorateClassProperty';
// export { decorateParameter } from '../src/lib/core/Decorator/decorateParameter';
//
// // export { decorateClassMethod } from '../src/lib/core/Decorator/decorateClassMethod';
// // export { decorateClassField } from '../src/lib/core/Decorator/decorateClassField';
// // export { decorateClassConstructorParameter } from '../src/lib/core/Decorator/decorateClassConstructorParameter';
// // export { decorateClassMethodParameter } from '../src/lib/core/Decorator/decorateClassMethodParameter';
// // export { decorateClassSetter } from '../src/lib/core/Decorator/decorateClassSetter';
// // export { decorateClassGetter } from '../src/lib/core/Decorator/decorateClassGetter';
//
// /*************************************
//  *   Reflection Interfaces
//  *************************************/
// export { MemberKinds } from '../src/lib/core/Interfaces/MemberKinds';
// export { MemberInfo } from '../src/lib/core/Interfaces/MemberInfo';
// export { TypeInfo } from '../src/lib/core/Interfaces/TypeInfo';
// export { PropertyInfo } from '../src/lib/core/Interfaces/PropertyInfo';
// export { ParameterInfo } from '../src/lib/core/Interfaces/ParameterInfo';
// export { Filter } from '../src/lib/core/Interfaces/Filter';
//
// /*************************************
//  *   Reflection Class Interfaces
//  *************************************/
// export { ClassInvocation } from '../src/lib/core/Interfaces/TypeInvocations';
// export { ClassInterceptor } from '../src/lib/core/Interfaces/TypeInterceptors';
// export { ClassAttribute } from '../src/lib/core/Interfaces/TypeAttributes';
//
// export { ParameterInvocation } from '../src/lib/core/Interfaces/TypeInvocations';
// export { ParameterInterceptor } from '../src/lib/core/Interfaces/TypeInterceptors';
// export { ParameterAttribute } from '../src/lib/core/Interfaces/TypeAttributes';
//
// export { PropertyInvocation } from '../src/lib/core/Interfaces/TypeInvocations';
// export { PropertyInterceptor } from '../src/lib/core/Interfaces/TypeInterceptors';
// export { PropertyAttribute } from '../src/lib/core/Interfaces/TypeAttributes';
//
// // export { FieldInvocation, MethodInvocation } from '../src/lib/core/Interfaces/TypeInvocations';
// // export { FieldInterceptor, MethodInterceptor } from '../src/lib/core/Interfaces/TypeInterceptors';
// // export { ClassFieldAttribute, ClassMethodAttribute } from '../src/lib/core/Interfaces/TypeAttributes';
//
// export { AgentNotFoundError } from '../src/lib/domain/Errors/AgentNotFoundError';
// export { TypeNotFoundError } from '../src/lib/domain/Errors/TypeNotFoundError';
// // export { ExtensionNotFoundError } from '../src/lib/domain/Errors/ExtensionNotFoundError';
// // export { DomainNotFoundError } from '../src/lib/domain/Errors/DomainNotFoundError';
//
// export { Provider } from '../src/lib/domain/Provider/Provider';
//
// export { DomainReference } from '../src/lib/domain/DomainReference';
// export { Domain } from '../src/lib/domain/Domain';
//
// export { FindDomain } from '../src/lib/domain/Helpers/FindDomain';
//
// export { IsDomain } from '../src/lib/domain/Helpers/IsDomain';
//
// // export { ExtensibleAttribute } from './Attributes/ExtensibleAttribute';
// export { SingletonAttribute } from '../src/lib/domain/Attributes/SingletonAttribute';
// export { TransitAttribute } from '../src/lib/domain/Attributes/TransitAttribute';
// export { InjectAttribute } from '../src/lib/domain/Attributes/InjectAttribute';
// export { OnceAttribute } from '../src/lib/domain/Attributes/OnceAttribute';
//
// export { initializable } from '../src/lib/domain/Decorators/initializable';
// export { extensible } from '../src/lib/domain/Decorators/extensible';
// export { attribute } from '../src/lib/domain/Decorators/attribute';
// export { singleton } from '../src/lib/domain/Decorators/singleton';
// export { transit } from '../src/lib/domain/Decorators/transit';
// export { inject } from '../src/lib/domain/Decorators/inject';
// export { once } from '../src/lib/domain/Decorators/once';
// export { agent } from '../src/lib/domain/Decorators/agent';
//
// export { Initializer } from '../src/lib/domain/Symbols';
// export { ClassInitializer } from '../src/lib/domain/Symbols';
//
// // export { AbstractClassConstructor } from './Domain/ClassConstructor';
// // export { ClassConstructor } from './Domain/ClassConstructor';
// // export { AnyClassConstructor } from './Domain/ClassConstructor';
// export { Class, AnyClass, AgentIdentifier, AgentParameters, Agent } from '../src/lib/domain/ClassConstructor';
//
// export { InMemoryDomain } from '../src/lib/domain/InMemoryDomain';
//
// // export { construct } from '../src/lib/domain/construct';
