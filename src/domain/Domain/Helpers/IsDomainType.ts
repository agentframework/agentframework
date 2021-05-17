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

// import { Domains } from '../DomainKnowledge';
// import { Domain } from '../Domain';
// import { AnyClass } from '../ClassConstructor';
//
// /**
//  * Return true if target type is inherits Domain
//  */
// export function IsDomainType(target: Function): target is AnyClass<Domain> {
//   const cache = Domains.v1;
//   const p = target.prototype;
//
//   if (cache.has(p)) {
//     return cache.get(p) === p;
//   }
//
//   // find root type
//   const end = Object.prototype;
//   let ctor: Function | object | null = p;
//   let base: Function | object | undefined;
//   while (ctor && ctor !== end) {
//     base = ctor;
//     ctor = Reflect.getPrototypeOf(ctor);
//   }
//
//   // check root type
//   if (base && (base === Domain.prototype || cache.get(base) === base)) {
//     cache.set(p, p);
//     return true;
//   } else {
//     cache.set(p, undefined);
//     return false;
//   }
// }
