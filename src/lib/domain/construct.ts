// import { Domain } from './Domain';
// import { IsDomain } from './Helpers/IsDomain';
// import { Agent, AgentIdentifier } from './ClassConstructor';
// import { FindDomainFromPrototype } from './Helpers/FindDomainFromPrototype';
//
// export function construct<T extends AgentIdentifier>(target: object, type: T, key?: PropertyKey): Agent<T> {
//   // find domain from target
//   let domain: Domain | undefined;
//   if (IsDomain(target)) {
//     domain = target;
//   } else {
//     const found = FindDomainFromPrototype(target.constructor);
//     if (IsDomain(found)) {
//       domain = found;
//     } else {
//       throw new TypeError('Domain not found');
//     }
//   }
//
//   // find instance from target
//   const value = domain.construct(type);
//   if (key) {
//     Reflect.defineProperty(target, key, { value, configurable: true });
//   }
//   return value;
// }
