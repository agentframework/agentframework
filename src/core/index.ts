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
 *   START CORE
 *************************************/

/*************************************
 *   Common
 *************************************/
export { AgentFrameworkError } from './Core/AgentFrameworkError';
export { Arguments } from './Core/Interfaces/Arguments';
export { Class } from './Core/Class';

/*************************************
 *   Metadata Interface
 *************************************/
export { MemberInfo } from './Core/Interfaces/MemberInfo';
export { PropertyInfo } from './Core/Interfaces/PropertyInfo';
export { TypeInfo } from './Core/Interfaces/TypeInfo';
export { ParameterInfo } from './Core/Interfaces/ParameterInfo';
export { Filter } from './Core/Interfaces/Filter';

export { Invocation } from './Core/Interfaces/Invocation';
export { Interceptor } from './Core/Interfaces/Interceptor';
export { Attribute } from './Core/Interfaces/Attribute';

export { ClassInvocation } from './Core/Interfaces/TypeInvocations';
export { ClassInterceptor } from './Core/Interfaces/TypeInterceptors';
export { ClassAttribute } from './Core/Interfaces/TypeAttributes';

export { ParameterInvocation } from './Core/Interfaces/TypeInvocations';
export { ParameterInterceptor } from './Core/Interfaces/TypeInterceptors';
export { ParameterAttribute } from './Core/Interfaces/TypeAttributes';

export { PropertyInvocation } from './Core/Interfaces/TypeInvocations';
export { PropertyInterceptor } from './Core/Interfaces/TypeInterceptors';
export { PropertyAttribute } from './Core/Interfaces/TypeAttributes';

/*************************************
 *   Metadata API
 *************************************/
export { MemberKinds } from './Core/Interfaces/MemberKinds';

export { decorate } from './Core/Decorator/decorate';
export { decorateClass } from './Core/Decorator/decorateClass';
export { decorateAgent } from './Core/Decorator/decorateAgent';
export { decorateMember } from './Core/Decorator/decorateMember';
export { decorateParameter } from './Core/Decorator/decorateParameter';

export { Reflector } from './Core/Reflection/Reflector';

/*************************************
 *   Agent API
 *************************************/
export { IsAgent, GetAgentType, GetType } from './Core/Helpers/AgentHelper';

/*************************************
 *   (Advanced): Create Agent API
 *************************************/
export { CreateAgent } from './Core/Compiler/CreateAgent';
export { AgentAttribute } from './Core/Compiler/AgentAttribute';

/*************************************
 *   (Advanced): Custom Interceptor API
 *************************************/
export { SetCustomInterceptor, GetCustomInterceptor, RemoveCustomInterceptor } from './Core/Helpers/CustomInterceptor';

/*************************************
 *   Getter Decorator: @remember()
 *************************************/
export { remember } from './Core/Decorators/Remember/remember';

/*************************************
 *   Class Decorator: @initializable()
 *************************************/
export { initializable } from './Core/Decorators/Initializable/initializable';
export { Initializer } from './Core/Decorators/Initializable/Symbols';
export { InitializerHandler, StaticInitializerHandler } from './Core/Decorators/Initializable/Symbols';

/*************************************
 *   Class Decorator: @exclusive()
 *************************************/
export { exclusive } from './Core/Decorators/Exclusive/exclusive';

/*************************************
 *   Class Decorator: @agent()
 *************************************/
export { agent } from './Core/Decorators/agent';
export { singleton } from './Core/Decorators/DependencyInjection/singleton';
export { transit } from './Core/Decorators/DependencyInjection/transit';

/************************************
 *    TSLIB Re-work
 ************************************/
export { __agent, __decorate, __param } from './Core/Helpers/DecoratorHelper';
export { __metadata } from './Core/Wisdom/Wisdom';

/*************************************
 *   Internal API: Attribute Helper
 *************************************/
// export { CanDecorate } from  './Core/Helpers/AddAttribute';
// export {
//   AddAttributeToClass,
//   AddAttributeToConstructorParameter,
//   AddAttributeToMethodParameter,
//   AddAttributeToMember,
// } from './Core/Helpers/AddAttribute';

/*************************************
 *   END CORE
 *************************************/

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
