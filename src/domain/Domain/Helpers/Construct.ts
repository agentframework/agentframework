// import { Agent, AgentIdentifier, AgentParameters } from '../ClassConstructor';
// import { GetDomain } from './GetDomain';
// import { GetGlobalDomain } from './GetGlobalDomain';
//
// export function Construct<T extends AgentIdentifier>(
//   source: Function,
//   target: T,
//   params?: AgentParameters<T>,
//   transit?: boolean
// ): Agent<T> {
//   // // find domain from target
//   // let domain: Domain | undefined;
//   // if (IsDomain(source)) {
//   //   domain = source;
//   // } else {
//   //   const found = FindDomain(source.constructor);
//   //   if (IsDomain(found)) {
//   //     domain = found;
//   //   } else {
//   //     return GetLocalDomain(InMemoryDomain).construct(target, params, transit);
//   //   }
//   // }
//
//   const domain = GetDomain(source) || GetGlobalDomain();
//   // find instance from target
//   return domain.construct(target, params, transit);
// }
