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
export { AgentFrameworkError } from './Core/AgentFrameworkError';

/*********************************************************************
 *   (Stability: 2 - Stable) Metadata Interface
 *********************************************************************/
export { Arguments } from './Core/Interfaces/Arguments';
export { Class } from './Core/Class';
export { Design } from './Core/Interfaces/Design';
export { MemberInfo } from './Core/Interfaces/MemberInfo';
export { PropertyInfo } from './Core/Interfaces/PropertyInfo';
export { TypeInfo } from './Core/Interfaces/TypeInfo';
export { ParameterInfo } from './Core/Interfaces/ParameterInfo';

export { Invocation } from './Core/Interfaces/Invocation';
export { Interceptor } from './Core/Interfaces/Interceptor';
export { Attribute } from './Core/Interfaces/Attribute';

export { TypeInvocation } from './Core/Interfaces/TypeInvocations';
export { ClassInterceptor } from './Core/Interfaces/TypeInterceptors';
export { ClassAttribute } from './Core/Interfaces/TypeAttributes';

export { ParameterInvocation } from './Core/Interfaces/TypeInvocations';
export { ParameterInterceptor } from './Core/Interfaces/TypeInterceptors';
export { ParameterAttribute } from './Core/Interfaces/TypeAttributes';

export { PropertyInvocation } from './Core/Interfaces/TypeInvocations';
export { PropertyInterceptor } from './Core/Interfaces/TypeInterceptors';
export { PropertyAttribute } from './Core/Interfaces/TypeAttributes';

export { Filter } from './Core/Interfaces/Filter';
export { MemberKinds } from './Core/Interfaces/MemberKinds';

/*********************************************************************
 *   (Stability: 2 - Stable) Metadata API
 *********************************************************************/
export { decorate } from './Core/Decorator/decorate';
export { decorateClass } from './Core/Decorator/decorateClass';
export { decorateAgent } from './Core/Decorator/decorateAgent';
export { decorateMember } from './Core/Decorator/decorateMember';
export { decorateParameter } from './Core/Decorator/decorateParameter';

export { Reflector } from './Core/Reflection/Reflector';

/*********************************************************************
 *   (Stability: 2 - Stable): Global Agent
 *********************************************************************/
export { Agent } from './Core/Agent/Agent';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @agent()
 *********************************************************************/
export { agent } from './Core/Decorators/agent';
export { singleton } from './Core/Decorators/DependencyInjection/singleton';
export { transit } from './Core/Decorators/DependencyInjection/transit';
export { CreateAgent } from './Core/Agent/CreateAgent';
export { IsAgent } from './Core/Helpers/AgentHelper';
export { GetAgentType } from './Core/Helpers/AgentHelper';

/*********************************************************************
 *   (Stability: 2 - Stable): Custom Interceptor API
 *********************************************************************/
export { SetCustomInterceptor, GetCustomInterceptor, RemoveCustomInterceptor } from './Core/Helpers/CustomInterceptor';
export { HasInterceptor, GetInterceptor } from './Core/Helpers/CustomInterceptor';

/*********************************************************************
 *   (Stability: 2 - Stable): Class Decorator: @initializable()
 *********************************************************************/
export { initializable } from './Core/Decorators/Initializable/initializable';
export { Initializer } from './Core/Decorators/Initializable/Symbols';
export { InitializerHandler, StaticInitializerHandler } from './Core/Decorators/Initializable/Symbols';

/*********************************************************************
 *   (Stability: 1 - Experimental): Custom Agent API
 *********************************************************************/
export { AgentAttribute } from './Core/Agent/AgentAttribute';
export { GetType } from './Core/Helpers/AgentHelper';

/*********************************************************************
 *   (Stability: 1 - Experimental): Getter Decorator: @remember()
 *********************************************************************/
export { remember } from './Core/Decorators/Remember/remember';

/*********************************************************************
 *   (Stability: 1 - Experimental): Class Decorator: @exclusive()
 *********************************************************************/
export { exclusive } from './Core/Decorators/Exclusive/exclusive';

/*********************************************************************
 *    (Stability: 1 - Experimental): TSLIB Re-work
 *********************************************************************/
export { __agent, __decorate, __param } from './Core/Helpers/DecoratorHelper';
export { __metadata } from './Core/Wisdom/Wisdom';

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
