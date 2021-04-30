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

/*************************************
 *   Common
 *************************************/
export { AgentFrameworkError } from '../src/core/index';
export { Arguments } from '../src/core/index';
export { AbstractConstructor, AnyConstructor, Constructor } from '../src/core/index';

/*************************************
 *   AOP
 *************************************/
export { Invocation } from '../src/core/index';
export { Interceptor } from '../src/core/index';
export { Interceptable } from '../src/core/index';

export { ClassInvocation } from '../src/core/index';
export { ClassInterceptor } from '../src/core/index';
export { ClassAttribute } from '../src/core/index';

export { ParameterInvocation } from '../src/core/index';
export { ParameterInterceptor } from '../src/core/index';
export { ParameterAttribute } from '../src/core/index';

export { PropertyInvocation } from '../src/core/index';
export { PropertyInterceptor } from '../src/core/index';
export { PropertyAttribute } from '../src/core/index';

/*************************************
 *   Annotation
 *************************************/
export { Attribute } from '../src/core/index';
export { MemberKinds } from '../src/core/index';

export { decorate } from '../src/core/index';
export { decorateClass } from '../src/core/index';
export { decorateAgent } from '../src/core/index';
export { decorateMember } from '../src/core/index';
export { decorateParameter } from '../src/core/index';

/*************************************
 *   Reflection
 *************************************/
export { MemberInfo } from '../src/core/index';
export { PropertyInfo } from '../src/core/index';
export { TypeInfo } from '../src/core/index';
export { ParameterInfo } from '../src/core/index';
export { Filter } from '../src/core/index';

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
export { DomainLike } from '../src/domain/index';
export { Domain } from '../src/domain/index';
export { SubDomainLike } from '../src/domain/index';

export { GetDomain } from '../src/domain/index';
export { GetSystemDomain } from '../src/domain/index';
export { IsDomain } from '../src/domain/index';

/*************************************
 *   Dependence Injection
 *************************************/
export { SingletonAttribute } from '../src/domain/index';
export { TransitAttribute } from '../src/domain/index';
export { InjectAttribute } from '../src/domain/index';
export { OnceAttribute } from '../src/domain/index';

export { initializable } from '../src/domain/index';
export { extensible } from '../src/domain/index';
export { attribute } from '../src/domain/index';
export { singleton } from '../src/domain/index';
export { transit } from '../src/domain/index';
export { inject } from '../src/domain/index';
export { once } from '../src/domain/index';
export { agent } from '../src/domain/index';

/*************************************
 *   Factory Method
 *************************************/
export { Initializer } from '../src/domain/index';
export { ClassInitializer } from '../src/domain/index';

/*************************************
 *   Class
 *************************************/
export { Class, AnyClass, AgentReference, Params, Agent } from '../src/domain/index';

/*************************************
 *   In Memory Domain Implementation
 *************************************/
export { InMemoryDomain } from '../src/domain/index';
export { InMemorySubDomain } from '../src/domain/index';
