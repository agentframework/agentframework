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
 *   (Stability: 2 - Stable) Metadata Interface
 *********************************************************************/

export { Design } from '../core/Core/Interception/Design.ts';
export { MemberInfo } from '../core/Core/Reflection/MemberInfo';
export { PropertyInfo } from '../core/Core/Reflection/PropertyInfo';
export { TypeInfo } from '../core/Core/Reflection/TypeInfo';
export { ParameterInfo } from '../core/Core/Reflection/ParameterInfo';

export { Invocation } from '../core/Core/Interception/Invocation.ts';
export { Interceptor } from '../core/Core/Interception/Interceptor.ts';
export { Attribute } from '../core/Core/Interception/Attribute.ts';

export { TypeInvocation } from '../core/Core/Interception/TypeInvocations.ts';
export { TypeInterceptor } from '../core/Core/Interception/TypeInterceptors.ts';
export { TypeAttribute } from '../core/Core/Interception/TypeAttributes.ts';

export { ParameterInvocation } from '../core/Core/Interception/TypeInvocations.ts';
export { ParameterInterceptor } from '../core/Core/Interception/TypeInterceptors.ts';
export { ParameterAttribute } from '../core/Core/Interception/TypeAttributes.ts';

export { PropertyInvocation } from '../core/Core/Interception/TypeInvocations.ts';
export { PropertyInterceptor } from '../core/Core/Interception/TypeInterceptors.ts';
export { PropertyAttribute } from '../core/Core/Interception/TypeAttributes.ts';

export { Filter } from '../core/Core/Reflection/Filter';
export { MemberKinds } from '../core/Core/Reflection/MemberKinds';

/*********************************************************************
 *   (Stability: 2 - Stable) Decoration API
 *********************************************************************/
export { decorate } from './Agent/Decorate/decorate';
export { decorateClass } from './Agent/Decorate/decorateClass';
export { decorateAgent } from './Agent/Decorate/decorateAgent';
export { decorateMember } from './Agent/Decorate/decorateMember';
export { decorateParameter } from './Agent/Decorate/decorateParameter';
export { decorateVariable } from './Agent/Decorate/decorateVariable';
export { VariableDecorator } from '../decorator/Decorator/VariableDecorator.ts';
export { Reflector } from './Agent/Reflector.ts';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @agent()
 *********************************************************************/
export { agent } from '../decorator/Decorator/agent.ts';
export { singleton } from '../decorator/Decorator/DependencyInjection/singleton';
export { transit } from '../decorator/Decorator/DependencyInjection/transit';
export { CreateAgent } from './Agent/CreateAgent';

/*********************************************************************
 *   (Stability: 2 - Stable): Custom Interceptor API
 *********************************************************************/
export { SetCustomInterceptor, GetCustomInterceptor, RemoveCustomInterceptor } from '../core/Core/Interception/CustomInterceptor.ts';
export { HasInterceptor, GetInterceptor } from '../core/Core/Interception/CustomInterceptor.ts';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @initializable()
 *********************************************************************/
export { initializable } from '../decorator/Decorator/Initializable/initializable';
export { Initializer } from '../decorator/Decorator/Initializable/Initializer';
export { InitializerHandler, StaticInitializerHandler } from '../decorator/Decorator/Initializable/Initializer';

/*********************************************************************
 *   (Stability: 1 - Experimental) Error
 *********************************************************************/
export { AgentFrameworkError } from './Agent/AgentFrameworkError';

/*********************************************************************
 *   (Stability: 1 - Experimental): Custom Agent API
 *********************************************************************/
export { AgentAttribute } from './Agent/AgentAttribute';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @once()
 *********************************************************************/
export { once } from '../decorator/Decorator/Once/Once';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @remember()
 *********************************************************************/
export { remember, Remember } from '../decorator/Decorator/Remember/Remember';

/*********************************************************************
 *   (Stability: 1 - Experimental): Class Decorator: @exclusive()
 *********************************************************************/
export { exclusive } from '../decorator/Decorator/Exclusive/exclusive';

/*********************************************************************
 *    (Stability: 1 - Experimental): Agent Helper Functions
 *********************************************************************/
export { IsAgent } from './Agent/Knowledges/Agents';
export { GetAgentType } from './Agent/Knowledges/Agents';
export { GetType } from './Agent/Knowledges/Types';
export { Arguments } from '../core/Core/Interception/Arguments.ts';
export { Class } from '../core/Core/Interception/Class.ts';

/*************************************
 *   AgentFramework 2 end
 *************************************/

/*********************************************************************
 *   v2.1: More Metadata API
 *********************************************************************/
// export { Decorator, ClassDecorator, PropertyDecorator, ParameterDecorator } from './Core/Decorator/decorators';
// export { NotImplementedError } from './Core/Error/NotImplementedError';
// export { NotSupportedError } from './Core/Error/NotSupportedError';

// export { FieldInvocation } from './Core/Interfaces/TypeInvocations';
// export { FieldInterceptor } from './Core/Interfaces/TypeInterceptors';
// export { ClassFieldAttribute } from './Core/Interfaces/TypeAttributes';

// export { MethodInvocation } from './Core/Interfaces/TypeInvocations';
// export { MethodInterceptor } from './Core/Interfaces/TypeInterceptors';
// export { ClassMethodAttribute } from './Core/Interfaces/TypeAttributes';

// export { decorateField } from './Core/Decorator/decorateClassField';
// export { decorateMethod } from './Core/Decorator/decorateClassMethod';
// export { decorateSetter } from './Core/Decorator/decorateClassSetter';
// export { decorateGetter } from './Core/Decorator/decorateClassGetter';
// export { decorateMethodParameter } from './Core/Decorator/decorateClassMethodParameter';
// export { decorateConstructorParameter } from './Core/Decorator/decorateClassConstructorParameter';
