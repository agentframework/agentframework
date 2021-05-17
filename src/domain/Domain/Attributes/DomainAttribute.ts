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
