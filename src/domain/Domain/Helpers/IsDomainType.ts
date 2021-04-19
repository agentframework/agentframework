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
