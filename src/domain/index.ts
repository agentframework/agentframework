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

'use strict';

/*************************************
 *   START DOMAIN
 *************************************/

/*************************************
 *   Class
 *************************************/
export { AgentReference, Params, Agent } from './Domain/Agent';

/*************************************
 *   Domain
 *************************************/
export { DomainLike } from './Domain/DomainLike';
export { SubDomainLike } from './Domain/SubDomainLike';
export { Domain } from './Domain/Domain';

export { CreateDomainAgent } from './Domain/DomainAgent/CreateDomainAgent';

/*************************************
 *   In Memory Domain Implementation
 *************************************/
export { InMemoryDomain } from './Domain/InMemoryDomain';
export { InMemorySubDomain } from './Domain/InMemorySubDomain';

/*************************************
 *   Design Pattern: Dependence Injection
 *************************************/
export { singleton } from './Domain/Decorators/DependencyInjection/singleton';
export { SingletonAttribute } from './Domain/Decorators/DependencyInjection/SingletonAttribute';
export { transit } from './Domain/Decorators/DependencyInjection/transit';
export { TransitAttribute } from './Domain/Decorators/DependencyInjection/TransitAttribute';
export { inject } from './Domain/Decorators/DependencyInjection/inject';
export { InjectAttribute } from './Domain/Decorators/DependencyInjection/InjectAttribute';
export { agent } from './Domain/Decorators/agent';

/*************************************
 *   Unstable API
 *************************************/
export { Disposable } from './Domain/Helpers/Disposable';
export { IsDomain } from './Domain/Knowledges/Domains/Domains';
export { GetDomain } from './Domain/Knowledges/Domains/Domains';
export { GetGlobalDomain } from './Domain/Knowledges/Domains/GetGlobalDomain';

/*************************************
 *   END DOMAIN
 *************************************/
