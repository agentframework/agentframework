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
export { Design } from './Core/Reflection/Design';
export { MemberInfo } from './Core/Reflection/MemberInfo';
export { PropertyInfo } from './Core/Reflection/PropertyInfo';
export { TypeInfo } from './Core/Reflection/TypeInfo';
export { ParameterInfo } from './Core/Reflection/ParameterInfo';

export { Invocation } from './Core/Annotation/Invocation';
export { Interceptor } from './Core/Annotation/Interceptor';
export { Attribute } from './Core/Annotation/Attribute';

export { TypeInvocation } from './Core/Annotation/TypeInvocations';
export { ClassInterceptor } from './Core/Annotation/TypeInterceptors';
export { ClassAttribute } from './Core/Annotation/TypeAttributes';

export { ParameterInvocation } from './Core/Annotation/TypeInvocations';
export { ParameterInterceptor } from './Core/Annotation/TypeInterceptors';
export { ParameterAttribute } from './Core/Annotation/TypeAttributes';

export { PropertyInvocation } from './Core/Annotation/TypeInvocations';
export { PropertyInterceptor } from './Core/Annotation/TypeInterceptors';
export { PropertyAttribute } from './Core/Annotation/TypeAttributes';

export { Filter } from './Core/Reflection/Filter';
export { MemberKinds } from './Core/Reflection/MemberKinds';

/*********************************************************************
 *    (Stability: 1 - Experimental): TSLIB integrate with Metadata
 *********************************************************************/
export { __agent } from './Core/__agent';
export { __decorate } from './Core/__decorate';
export { __param } from './Core/__param';
export { __metadata } from './Core/__metadata';

/*********************************************************************
 *   (Stability: 2 - Stable) Metadata API
 *********************************************************************/
export { decorate } from './Agent/Decorate/decorate';
export { decorateClass } from './Agent/Decorate/decorateClass';
export { decorateAgent } from './Agent/Decorate/decorateAgent';
export { decorateMember } from './Agent/Decorate/decorateMember';
export { decorateParameter } from './Agent/Decorate/decorateParameter';
export { Reflector } from './Agent/Reflector';

/*********************************************************************
 *   (Stability: 2 - Stable): Global Agent
 *********************************************************************/
export { Agent } from './Agent/Agent';

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
export { once, Once } from './Core/Decorators/Once';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @remember()
 *********************************************************************/
export { remember, Remember } from './Core/Decorators/Remember';

/*********************************************************************
 *   (Stability: 1 - Experimental): Class Decorator: @exclusive()
 *********************************************************************/
export { exclusive } from './Agent/Decorators/Exclusive/exclusive';

/*********************************************************************
 *    (Stability: 1 - Experimental): Agent Helper Functions
 *********************************************************************/
export { GetType } from './Agent/Agent';
export { GetAgentType } from './Agent/Agent';
export { IsAgent } from './Agent/Agent';
export { Arguments } from './Core/WellKnown';
export { Class } from './Core/WellKnown';

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
