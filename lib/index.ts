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
 *   (Stability: 2 - Stable) Error
 *********************************************************************/
export { AgentFrameworkError } from '../src/core/index';

/*********************************************************************
 *   (Stability: 2 - Stable) Metadata Interface
 *********************************************************************/
export { Arguments } from '../src/core/index';
export { Class } from '../src/core/index';
export { Design } from '../src/core/index';
export { MemberInfo } from '../src/core/index';
export { PropertyInfo } from '../src/core/index';
export { TypeInfo } from '../src/core/index';
export { ParameterInfo } from '../src/core/index';

export { Invocation } from '../src/core/index';
export { Interceptor } from '../src/core/index';
export { Attribute } from '../src/core/index';

export { TypeInvocation } from '../src/core/index';
export { ClassInterceptor } from '../src/core/index';
export { ClassAttribute } from '../src/core/index';

export { ParameterInvocation } from '../src/core/index';
export { ParameterInterceptor } from '../src/core/index';
export { ParameterAttribute } from '../src/core/index';

export { PropertyInvocation } from '../src/core/index';
export { PropertyInterceptor } from '../src/core/index';
export { PropertyAttribute } from '../src/core/index';

export { Filter } from '../src/core/index';
export { MemberKinds } from '../src/core/index';

/*********************************************************************
 *   (Stability: 2 - Stable) Metadata API
 *********************************************************************/
export { decorate } from '../src/core/index';
export { decorateClass } from '../src/core/index';
export { decorateAgent } from '../src/core/index';
export { decorateMember } from '../src/core/index';
export { decorateParameter } from '../src/core/index';

export { Reflector } from '../src/core/index';

/*********************************************************************
 *   (Stability: 2 - Stable): Global Agent
 *********************************************************************/
export { Agent } from '../src/core/index';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @agent()
 *********************************************************************/
export { agent } from '../src/core/index';
export { singleton } from '../src/core/index';
export { transit } from '../src/core/index';
export { CreateAgent } from '../src/core/index';
export { IsAgent } from '../src/core/index';
export { GetAgentType } from '../src/core/index';

/*********************************************************************
 *   (Stability: 2 - Stable): Custom Interceptor API
 *********************************************************************/
export { SetCustomInterceptor, GetCustomInterceptor, RemoveCustomInterceptor } from '../src/core/index';
export { HasInterceptor, GetInterceptor } from '../src/core/index';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @initializable()
 *********************************************************************/
export { initializable } from '../src/core/index';
export { Initializer } from '../src/core/index';
export { InitializerHandler, StaticInitializerHandler } from '../src/core/index';

/*********************************************************************
 *   (Stability: 1 - Experimental): Custom Agent API
 *********************************************************************/
export { AgentAttribute } from '../src/core/index';
export { GetType } from '../src/core/index';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @remember()
 *********************************************************************/
export { remember } from '../src/core/index';

/*********************************************************************
 *   (Stability: 1 - Experimental): Class Decorator: @exclusive()
 *********************************************************************/
export { exclusive } from '../src/core/index';

/*********************************************************************
 *    (Stability: 1 - Experimental): TSLIB Re-work
 *********************************************************************/

export { __agent, __decorate, __param, __metadata } from '../src/core/index';

/*************************************
 *   AgentFramework 2 end
 *************************************/
