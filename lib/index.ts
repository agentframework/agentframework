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

/*********************************************************************
 *   (Stability: 2 - Stable) General Interface
 *********************************************************************/
export { AgentFrameworkError } from '../src/agent';
export { Arguments } from '../src/agent';
export { Class } from '../src/agent';

/*********************************************************************
 *   (Stability: 2 - Stable) Metadata
 *********************************************************************/
export { MemberKinds } from '../src/agent';
export { Filter } from '../src/agent';
export { Attribute } from '../src/agent';
export { Design } from '../src/agent';
export { Invocation } from '../src/agent';
export { Interceptor } from '../src/agent';

export { MemberInfo } from '../src/agent';
export { PropertyInfo } from '../src/agent';
export { TypeInfo } from '../src/agent';
export { ParameterInfo } from '../src/agent';

export { TypeInvocation } from '../src/agent';
export { TypeInterceptor } from '../src/agent';
export { TypeAttribute } from '../src/agent';

export { PropertyInvocation } from '../src/agent';
export { PropertyInterceptor } from '../src/agent';
export { PropertyAttribute } from '../src/agent';

export { ParameterInvocation } from '../src/agent';
export { ParameterInterceptor } from '../src/agent';
export { ParameterAttribute } from '../src/agent';

/*********************************************************************
 *   (Stability: 2 - Stable) Advanced Metadata API
 *********************************************************************/
export { decorateAgent } from '../src/agent';
export { decorateClass } from '../src/agent';
export { decorateMember } from '../src/agent';
export { decorateParameter } from '../src/agent';
export { decorateVariable } from '../src/agent';
export { VariableDecorator } from '../src/agent';
export { Reflector } from '../src/agent';

/*********************************************************************
 *   (Stability: 2 - Stable): Custom Interceptor API
 *********************************************************************/
export { SetCustomInterceptor, GetCustomInterceptor, RemoveCustomInterceptor } from '../src/agent';

/*********************************************************************
 *   (Stability: 2 - Stable): Agent Helper API
 *********************************************************************/
export { IsAgent } from '../src/agent';
export { GetAgentType } from '../src/agent';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @initializable()
 *********************************************************************/
export { initializable } from '../src/agent';
export { Initializer } from '../src/agent';
export { InitializerHandler, StaticInitializerHandler } from '../src/agent';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @agent()
 *********************************************************************/
export { agent } from '../src/domain';

/*********************************************************************
 *   (Stability: 2 - Stable): Property Decorator: @singleton()
 *********************************************************************/
export { singleton } from '../src/domain';

/*********************************************************************
 *   (Stability: 2 - Stable): Property Decorator: @transit()
 *********************************************************************/
export { transit } from '../src/domain';

/*********************************************************************
 *    (Stability: 2 - Stable) Domain General Interface
 *********************************************************************/
export { AgentReference } from '../src/domain';
export { Params  } from '../src/domain';
export { Agent } from '../src/domain';

/*********************************************************************
 *    (Stability: 1 - Experimental) Domain Interface
 *********************************************************************/
export { DomainLike } from '../src/domain';
export { SubDomainLike } from '../src/domain';
export { Domain } from '../src/domain';

/*********************************************************************
 *    (Stability: 2 - Stable) Domain Helper API
 *********************************************************************/
export { GetDomain } from '../src/domain';
export { GetGlobalDomain } from '../src/domain';
export { IsDomain } from '../src/domain';

/*********************************************************************
 *    (Stability: 1 - Experimental) Domain implementation
 *********************************************************************/
export { InMemoryDomain } from '../src/domain';
export { InMemorySubDomain } from '../src/domain';

/*********************************************************************
 *    (Stability: 2 - Stable): TSLIB Re-work
 *********************************************************************/
/**
 * @internal
 */
export { __agent, __decorate, __param, __metadata } from '../src/core';
