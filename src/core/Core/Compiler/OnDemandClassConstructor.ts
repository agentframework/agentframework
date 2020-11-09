// /* Copyright 2016 Ling Zhang
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License. */
//
// import { memorize } from '../Wisdom';
// import { OnDemandClassCompiler } from './OnDemandClassCompiler';
// import { ConstructorInvocation } from './Invocation/ConstructorInvocation';
// import { FindExtendedClass } from '../Helpers/FindExtendedClass';
// import { Reflector } from '../Reflector';
// import { Arguments } from '../Interfaces/Arguments';
// import { Invocation } from '../Interfaces/Invocation';
//
// /**
//  * introduce agent fields and properties during 1st access
//  */
// export class OnDemandClassConstructor {
//   /**
//    * invocations for type constructors
//    */
//   get invocations() {
//     return memorize<WeakMap<Function, Invocation>>(this, 'invocations', WeakMap);
//   }
//
//   /**
//    * ES6 Proxy Constructor hook
//    */
//   construct<T extends Function>(target: T, params: Arguments, newTarget: T): any {
//     // GEN 1: this.design.type = origin type
//     // GEN 2: this.receiver = intercepted type
//     //        target === receiver
//     // GEN 3: newTarget = Proxied
//
//     // Note: static constructor support
//
//     // cache the constructor invocation
//     // so do not support change annotation after first time created the type
//     let invocation = this.invocations.get(target);
//     // console.log('☀️ ☀️ ☀️ 1', target.name, newTarget.name, !!constructor);
//
//     // analysis this object
//     if (!invocation) {
//       // upgrade properties
//       const design = Reflector(target);
//       const result = design.findProperties((p) => p.hasInterceptor());
//       const properties = [];
//
//       // NOTE: Static Constructor support, deep first
//       // for (const ctor of FindStaticConstructors(target.prototype)) {
//       //   console.log('ctor', ctor, ctor.name);
//       //   // mark before call to make sure the constructor never call again
//       //   Core.MarkStaticConstructor(ctor);
//       //
//       //   // skip system type
//       //   if (Core.IsSystemType(ctor)) {
//       //     break;
//       //   }
//       //
//       //   // check if have static constructor
//       //   const descriptor = Reflect.getOwnPropertyDescriptor(ctor, ctor.name);
//       //   if (descriptor && typeof descriptor.value == 'function') {
//       //     Reflect.apply(descriptor.value, ctor, []);
//       //   }
//       // }
//
//       if (result.size) {
//         for (const array of result.values()) {
//           properties.push(...array);
//         }
//       }
//
//       // don't generate property interceptor if no extended class
//       if (properties.length) {
//         // 1. find all possible fields from design
//         // todo: call make dynamic constructor
//         // console.log('=========================== A     ===========================');
//         // console.log('===========================  G    ===========================');
//         // console.log('===========================   E   ===========================');
//         // console.log('===========================    N  ===========================');
//         // console.log('===========================     T ===========================');
//         // console.log('proxies', proxies);
//
//         // result is map<key,array>
//         // console.log('found', this.design.name, result, properties);
//
//         /* istanbul ignore next */
//         if (target === newTarget) {
//           throw new TypeError('NotAllowModifyUserPrototype');
//         }
//
//         // 2. find the proxy class
//         const proxies = FindExtendedClass(target, newTarget);
//
//         // quick check, ignore if keys are been declared
//         // ownKeys() >= 1 because constructor is one key always have
//         OnDemandClassCompiler.upgrade(properties, proxies[0], proxies[1]);
//       }
//
//       // build invocation chain
//       const origin = new ConstructorInvocation(target, design);
//
//       // find interceptors from design attributes and create chain for them
//       invocation = OnDemandClassCompiler.createConstructorInterceptor(origin);
//
//       this.invocations.set(target, invocation);
//     }
//
//     // console.log('construct', newTarget, parameters);
//     return invocation.invoke(params, newTarget);
//     // return new Proxy(invocation.invoke(params, newTarget), {
//     //   getPrototypeOf<T extends Function>(target: T): object | null {
//     //     return {};
//     //   },
//     // });
//   }
// }
