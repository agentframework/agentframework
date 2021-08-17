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
 *   Design Pattern: Dependence Injection
 *************************************/
export { SingletonAttribute } from './Domain/Attributes/SingletonAttribute';
export { TransitAttribute } from './Domain/Attributes/TransitAttribute';
export { InjectAttribute } from './Domain/Attributes/InjectAttribute';
export { singleton } from './Domain/Decorators/singleton';
export { transit } from './Domain/Decorators/transit';
export { inject } from './Domain/Decorators/inject';
export { agent } from './Domain/Decorators/agent';

/*************************************
 *   Design Pattern: Factory Method
 *************************************/
export { initializable } from './Domain/Decorators/initializable';
export { Initializer, ClassInitializer } from './Domain/Symbols';
export { InitializerHandler, ClassInitializerHandler } from './Domain/Symbols';

/*************************************
 *   Domain
 *************************************/
export { DomainLike } from './Domain/DomainLike';
export { Domain } from './Domain/Domain';
export { SubDomainLike } from './Domain/SubDomainLike';

export { GetDomain } from './Domain/Helpers/GetDomain';
export { GetSystemDomain } from './Domain/Helpers/GetSystemDomain';
export { IsDomain } from './Domain/Helpers/IsDomain';

/*************************************
 *   Class
 *************************************/
export { AgentReference, Params, Agent } from './Domain/Agent';

/*************************************
 *   In Memory Domain Implementation
 *************************************/
export { InMemoryDomain } from './Domain/InMemoryDomain';
export { InMemorySubDomain } from './Domain/InMemorySubDomain';

/*************************************
 *   Unstable API
 *************************************/
export { Disposable } from './Domain/Helpers/Disposable';
export { extensible } from './Domain/Decorators/extensible';

/*************************************
 *   END DOMAIN
 *************************************/
