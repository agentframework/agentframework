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
export { AgentFrameworkError } from '../packages/agent';
export { Arguments } from '../packages/agent';
export { Class } from '../packages/agent';

/*********************************************************************
 *   (Stability: 2 - Stable) Metadata
 *********************************************************************/
export { MemberKinds } from '../packages/agent';
export { Filter } from '../packages/agent';
export { Attribute } from '../packages/agent';
export { Design } from '../packages/agent';
export { Invocation } from '../packages/agent';
export { Interceptor } from '../packages/agent';

export { MemberInfo } from '../packages/agent';
export { PropertyInfo } from '../packages/agent';
export { TypeInfo } from '../packages/agent';
export { ParameterInfo } from '../packages/agent';

export { TypeInvocation } from '../packages/agent';
export { TypeInterceptor } from '../packages/agent';
export { TypeAttribute } from '../packages/agent';

export { PropertyInvocation } from '../packages/agent';
export { PropertyInterceptor } from '../packages/agent';
export { PropertyAttribute } from '../packages/agent';

export { ParameterInvocation } from '../packages/agent';
export { ParameterInterceptor } from '../packages/agent';
export { ParameterAttribute } from '../packages/agent';

/*********************************************************************
 *   (Stability: 2 - Stable) Advanced Metadata API
 *********************************************************************/
export { decorateAgent } from '../packages/agent';
export { decorateClass } from '../packages/agent';
export { decorateMember } from '../packages/agent';
export { decorateParameter } from '../packages/agent';
export { decorateVariable } from '../packages/agent';
export { VariableDecorator } from '../packages/agent';
export { Reflector } from '../packages/agent';

/*********************************************************************
 *   (Stability: 2 - Stable): Custom Interceptor API
 *********************************************************************/
export { SetCustomInterceptor, GetCustomInterceptor, RemoveCustomInterceptor } from '../packages/agent';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @initializable()
 *********************************************************************/
export { Initializer } from '../packages/domain';
export { initializable } from '../packages/dependencies/decorators';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @agent()
 *********************************************************************/
export { agent } from '../packages/dependencies/decorators';

/*********************************************************************
 *   (Stability: 2 - Stable): Property Decorator: @singleton()
 *********************************************************************/
export { singleton } from '../packages/dependencies/decorators';

/*********************************************************************
 *   (Stability: 2 - Stable): Property Decorator: @scoped()
 *********************************************************************/
export { scoped } from '../packages/dependencies/decorators';

/*********************************************************************
 *   (Stability: 2 - Stable): Property Decorator: @transit()
 *********************************************************************/
export { transit } from '../packages/dependencies/decorators';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @once()
 *********************************************************************/
export { once } from '../packages/dependencies/decorators';

/*********************************************************************
 *   (Stability: 1 - Experimental): Class Decorator: @exclusive()
 *********************************************************************/
export { exclusive } from '../packages/dependencies/decorators';

/*********************************************************************
 *   (Stability: 2 - Stable): Agent Helper API
 *********************************************************************/
export { IsAgent } from '../packages/agent';
export { GetAgentType } from '../packages/agent';
import { CreateDomainAgent, GetSystemDomain } from '../packages/domain';
export function CreateAgent<T extends Function>(type: T): T {
  return CreateDomainAgent(GetSystemDomain(), type);
}

/*********************************************************************
 *    (Stability: 2 - Stable) Domain General Interface
 *********************************************************************/
export { AgentReference } from '../packages/domain';
export { Params } from '../packages/domain';
export { Agent } from '../packages/domain';

/*********************************************************************
 *    (Stability: 2 - Stable) Domain Helper API
 *********************************************************************/
export { GetDomain } from '../packages/domain';
export { GetSystemDomain } from '../packages/domain';
export { IsDomain } from '../packages/domain';

/*********************************************************************
 *    (Stability: 1 - Experimental) Domain Interface
 *********************************************************************/
export { DomainLike } from '../packages/domain';
export { SubDomainLike } from '../packages/domain';
export { Domain } from '../packages/domain';

/*********************************************************************
 *    (Stability: 1 - Experimental) In memory Domain implementation
 *********************************************************************/
export { InMemoryDomain } from '../packages/domain';
export { InMemorySubDomain } from '../packages/domain';

/*********************************************************************
 *    (Stability: 2 - Stable): TSLIB Re-work
 *********************************************************************/
/**
 * @internal
 */
export { __agent, __decorate, __param, __metadata } from '../packages/core';
