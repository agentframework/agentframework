// import { IInvocation, IInterceptorAttribute, IInterceptor } from '../../dependencies/core';
// import { Domain } from '../Domain';
// import { Domains } from '../Helpers/Cache';
// import { InMemoryDomain } from '../implementations/InMemoryDomain';
// import { IsDomain } from '../IsDomain';
// import { attribute } from '../Decorators/attribute';
//
// @attribute
// export class DomainAttribute implements IInterceptorAttribute, IInterceptor {
//   constructor(private domain?: Domain) {}
//
//   beforeDecorate(target: Function): boolean {
//     if (this.domain) {
//       return this.domain.beforeDecorate(this, target);
//     }
//     return true;
//   }
//
//   get interceptor() {
//     return this;
//   }
//
//   private createDomain(caller?: Domain): Domain {
//     if (this.domain) {
//       return this.domain;
//     }
//
//     if (caller) {
//       return new InMemoryDomain(caller);
//     }
//
//     throw new Error('ParentDomainNotFound');
//   }
//
//   intercept(target: IInvocation, params: Arguments): any {
//     let domain: Domain;
//     let finalParameters;
//
//     if (parameters) {
//       const pl = parameters.length;
//       const caller = parameters[pl - 1];
//
//       if (IsDomain(caller)) {
//         if (caller === this.domain) {
//           domain = caller;
//           finalParameters = parameters;
//         } else {
//           finalParameters = Array.prototype.slice.call(parameters, 0);
//           domain = this.createDomain(caller);
//           finalParameters[pl - 1] = domain;
//         }
//       } else {
//         finalParameters = Array.prototype.slice.call(parameters, 0);
//         domain = this.createDomain();
//         finalParameters.push(domain);
//       }
//     } else {
//       domain = this.createDomain();
//       finalParameters = [domain];
//     }
//
//     const agent = target.invoke<any>(finalParameters);
//     // remember domain
//     Domains.set(agent, domain);
//     domain.addAgent(Object.getPrototypeOf(agent).constructor, agent);
//     return agent;
//   }
// }
