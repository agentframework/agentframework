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
 *   Common
 *************************************/
export { AgentFrameworkError } from '../src/core/index';
export type { Arguments } from '../src/core/index';
export type { Class } from '../src/core/index';

/*************************************
 *   AOP
 *************************************/
export type { Invocation } from '../src/core/index';
export type { Interceptor } from '../src/core/index';
export type { Interceptable } from '../src/core/index';

export type { ClassInvocation } from '../src/core/index';
export type { ClassInterceptor } from '../src/core/index';
export type { ClassAttribute } from '../src/core/index';

export type { ParameterInvocation } from '../src/core/index';
export type { ParameterInterceptor } from '../src/core/index';
export type { ParameterAttribute } from '../src/core/index';

export type { PropertyInvocation } from '../src/core/index';
export type { PropertyInterceptor } from '../src/core/index';
export type { PropertyAttribute } from '../src/core/index';

/*************************************
 *   Annotation
 *************************************/
export type { Attribute } from '../src/core/index';
export { MemberKinds } from '../src/core/index';

export { decorate } from '../src/core/index';
export { decorateClass } from '../src/core/index';
export { decorateAgent } from '../src/core/index';
export { decorateMember } from '../src/core/index';
export { decorateParameter } from '../src/core/index';

/*************************************
 *   Reflection
 *************************************/
export type { MemberInfo } from '../src/core/index';
export type { PropertyInfo } from '../src/core/index';
export type { TypeInfo } from '../src/core/index';
export type { ParameterInfo } from '../src/core/index';
export type { Filter } from '../src/core/index';

export { Reflector } from '../src/core/index';

/*************************************
 *   Agent API
 *************************************/
export { IsAgent } from '../src/core/index';
export { GetAgentType } from '../src/core/index';

/*************************************
 *   Static Interceptor
 *************************************/
export { interceptable } from '../src/core/index';

/*************************************
 *   Custom Interceptor
 *************************************/
export { SetCustomInterceptor, GetCustomInterceptor, RemoveCustomInterceptor } from '../src/core/index';

/*************************************
 *   Domain
 *************************************/
export type { DomainLike } from '../src/domain/index';
export { Domain } from '../src/domain/index';
export type { SubDomainLike } from '../src/domain/index';

export { GetDomain } from '../src/domain/index';
export { GetSystemDomain } from '../src/domain/index';
export { IsDomain } from '../src/domain/index';

/*************************************
 *   Dependence Injection
 *************************************/
export { SingletonAttribute } from '../src/domain/index';
export { TransitAttribute } from '../src/domain/index';
export { InjectAttribute } from '../src/domain/index';
export { initializable } from '../src/domain/index';
export { singleton } from '../src/domain/index';
export { transit } from '../src/domain/index';
export { inject } from '../src/domain/index';
export { agent } from '../src/domain/index';

/*************************************
 *   Factory Method
 *************************************/
export { Initializer } from '../src/domain/index';
export { ClassInitializer } from '../src/domain/index';

/*************************************
 *   Class
 *************************************/
export type { AgentReference, Params, Agent } from '../src/domain/index';

/*************************************
 *   In Memory Domain Implementation
 *************************************/
export { InMemoryDomain } from '../src/domain/index';
export { InMemorySubDomain } from '../src/domain/index';

/************************************
 *    Internal uses
 ************************************/
export { __decorate, __metadata, __param } from '../src/core/index';
