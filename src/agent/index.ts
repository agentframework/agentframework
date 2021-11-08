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

export { Design } from './Agent/Design';
export { MemberInfo } from './Agent/Reflection/MemberInfo';
export { PropertyInfo } from './Agent/Reflection/PropertyInfo';
export { TypeInfo } from './Agent/Reflection/TypeInfo';
export { ParameterInfo } from './Agent/Reflection/ParameterInfo';

export { Invocation } from './Agent/Invocation';
export { Interceptor } from './Agent/Interceptor';
export { Attribute } from './Agent/Attribute';

export { TypeInvocation } from './Agent/TypeInvocations';
export { TypeInterceptor } from './Agent/TypeInterceptors';
export { TypeAttribute } from './Agent/TypeAttributes';

export { ParameterInvocation } from './Agent/TypeInvocations';
export { ParameterInterceptor } from './Agent/TypeInterceptors';
export { ParameterAttribute } from './Agent/TypeAttributes';

export { PropertyInvocation } from './Agent/TypeInvocations';
export { PropertyInterceptor } from './Agent/TypeInterceptors';
export { PropertyAttribute } from './Agent/TypeAttributes';

export { Filter } from './Agent/Reflection/Filter';
export { MemberKinds } from './Agent/Reflection/MemberKinds';

/*********************************************************************
 *   (Stability: 2 - Stable) Decoration API
 *********************************************************************/
export { decorate } from './Agent/Decorate/decorate';
export { decorateClass } from './Agent/Decorate/decorateClass';
export { decorateAgent } from './Agent/Decorate/decorateAgent';
export { decorateMember } from './Agent/Decorate/decorateMember';
export { decorateParameter } from './Agent/Decorate/decorateParameter';
export { decorateVariable } from './Agent/Decorate/decorateVariable';
export { VariableDecorator } from './Agent/Decorators/VariableDecorator';
export { Reflector } from './Agent/Reflector';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @agent()
 *********************************************************************/
export { agent } from './Agent/Decorators/agent';
export { singleton } from './Agent/Decorators/DependencyInjection/singleton';
export { transit } from './Agent/Decorators/DependencyInjection/transit';
export { CreateAgent } from './Agent/CreateAgent';

/*********************************************************************
 *   (Stability: 2 - Stable): Custom Interceptor API
 *********************************************************************/
export { SetCustomInterceptor, GetCustomInterceptor, RemoveCustomInterceptor } from './Agent/CustomInterceptor';
export { HasInterceptor, GetInterceptor } from './Agent/CustomInterceptor';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @initializable()
 *********************************************************************/
export { initializable } from './Agent/Decorators/Initializable/initializable';
export { Initializer } from './Agent/Decorators/Initializable/Initializer';
export { InitializerHandler, StaticInitializerHandler } from './Agent/Decorators/Initializable/Initializer';

/*********************************************************************
 *   (Stability: 1 - Experimental) Error
 *********************************************************************/
export { AgentFrameworkError } from './Agent/AgentFrameworkError';

/*********************************************************************
 *   (Stability: 1 - Experimental): Custom Agent API
 *********************************************************************/
export { AgentAttribute } from './Agent/AgentAttribute';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @remember()
 *********************************************************************/
export { once, Once } from './Agent/Decorators/Once/Once';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @remember()
 *********************************************************************/
export { remember, Remember } from './Agent/Decorators/Remember/Remember';

/*********************************************************************
 *   (Stability: 1 - Experimental): Class Decorator: @exclusive()
 *********************************************************************/
export { exclusive } from './Agent/Decorators/Exclusive/exclusive';

/*********************************************************************
 *    (Stability: 1 - Experimental): Agent Helper Functions
 *********************************************************************/
export { IsAgent } from './Agent/Knowledges/Agents';
export { GetAgentType } from './Agent/Knowledges/Agents';
export { GetType } from './Agent/Knowledges/Types';
export { Class } from './Agent/Arguments';
export { Arguments } from './Agent/Arguments';

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
