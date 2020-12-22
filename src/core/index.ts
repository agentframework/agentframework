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
export { AbstractConstructor, AnyConstructor, Constructor } from './Core/Constructor';
// export { Decorator, ClassDecorator, PropertyDecorator, ParameterDecorator } from './Core/Decorator/decorators';
export { Arguments } from './Core/Interfaces/Arguments';
export { AgentFrameworkError } from './Core/Error/AgentFrameworkError';
// export { NotImplementedError } from './Core/Error/NotImplementedError';
// export { NotSupportedError } from './Core/Error/NotSupportedError';

/*************************************
 *   AOP
 *************************************/
export { Invocation } from './Core/Interfaces/Invocation';
export { Interceptor } from './Core/Interfaces/Interceptor';
export { Interceptable } from './Core/Interfaces/Interceptable';

export { ClassInvocation } from './Core/Interfaces/TypeInvocations';
export { ClassInterceptor } from './Core/Interfaces/TypeInterceptors';
export { ClassAttribute } from './Core/Interfaces/TypeAttributes';

export { ParameterInvocation } from './Core/Interfaces/TypeInvocations';
export { ParameterInterceptor } from './Core/Interfaces/TypeInterceptors';
export { ParameterAttribute } from './Core/Interfaces/TypeAttributes';

export { PropertyInvocation } from './Core/Interfaces/TypeInvocations';
export { PropertyInterceptor } from './Core/Interfaces/TypeInterceptors';
export { PropertyAttribute } from './Core/Interfaces/TypeAttributes';

// export { FieldInvocation } from './Core/Interfaces/TypeInvocations';
// export { FieldInterceptor } from './Core/Interfaces/TypeInterceptors';
// export { ClassFieldAttribute } from './Core/Interfaces/TypeAttributes';

// export { MethodInvocation } from './Core/Interfaces/TypeInvocations';
// export { MethodInterceptor } from './Core/Interfaces/TypeInterceptors';
// export { ClassMethodAttribute } from './Core/Interfaces/TypeAttributes';

/*************************************
 *   Annotation
 *************************************/
export { Attribute } from './Core/Interfaces/Attribute';
export { MemberKinds } from './Core/Interfaces/MemberKinds';
export { decorate } from './Core/Decorator/decorate';
export { decorateClass } from './Core/Decorator/decorateClass';
export { decorateAgent } from './Core/Decorator/decorateAgent';
export { decorateMember } from './Core/Decorator/decorateMember';
export { decorateParameter } from './Core/Decorator/decorateParameter';

// export { decorateField } from './Core/Decorator/decorateClassField';
// export { decorateMethod } from './Core/Decorator/decorateClassMethod';
// export { decorateSetter } from './Core/Decorator/decorateClassSetter';
// export { decorateGetter } from './Core/Decorator/decorateClassGetter';
// export { decorateMethodParameter } from './Core/Decorator/decorateClassMethodParameter';
// export { decorateConstructorParameter } from './Core/Decorator/decorateClassConstructorParameter';

/*************************************
 *   Reflection
 *************************************/
export { MemberInfo } from './Core/Interfaces/MemberInfo';
export { PropertyInfo } from './Core/Interfaces/PropertyInfo';
export { TypeInfo } from './Core/Interfaces/TypeInfo';
export { ParameterInfo } from './Core/Interfaces/ParameterInfo';
export { Filter } from './Core/Interfaces/Filter';

export { Reflector } from './Core/Reflector';

/*************************************
 *   Agent API
 *************************************/

export { AgentAttribute } from './Core/Agent/AgentAttribute';
export { CreateAgent } from './Core/Agent/CreateAgent';
export { GetType, IsAgent } from './Core/Type';

/*************************************
 *   Wisdom
 *************************************/
export { memorize } from './Core/Annotation/Wisdom';

/*************************************
 *   Static Interceptor
 *************************************/
export { interceptable } from './Core/Agent/interceptable';
