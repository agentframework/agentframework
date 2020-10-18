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
 *   Core Types
 *************************************/
export {
  AnyConstructor,
  Constructor,
  DefaultConstructor,
  ParameterConstructor,
  AbstractConstructor,
} from './Core/Constructor';
export { Decorators, ClassDecorator, PropertyDecorator, ParameterDecorator } from './Core/Decorator/decorators';
export { Arguments } from './Core/Interfaces/Arguments';
export { Attribute } from './Core/Interfaces/Attribute';
export { Invocation } from './Core/Interfaces/Invocation';
export { Interceptor } from './Core/Interfaces/Interceptor';
export { Interceptable } from './Core/Interfaces/Interceptable';

/*************************************
 *   Agent API
 *************************************/
// export { decorateAgent } from './Core/Agent/decorateAgent';
export { AgentAttribute } from './Core/Agent/AgentAttribute';
export { CreateAgent } from './Core/Agent/CreateAgent';
export { IsAgent } from './Core/IsAgent';
export { GetType } from './Core/GetType';

/*************************************
 *   Sub-module Metadata API
 *************************************/
export { GetOrCreate } from './Core/Wisdom';

/*************************************
 *   Reflection API
 *************************************/
export { Reflector } from './Core/Reflector';

export { decorate } from './Core/Decorator/decorate';
export { decorateClass } from './Core/Decorator/decorateClass';
export { decorateClassProperty } from './Core/Decorator/decorateClassProperty';
export { decorateParameter } from './Core/Decorator/decorateParameter';

// export { decorateClassMethod } from './Core/Decorator/decorateClassMethod';
// export { decorateClassField } from './Core/Decorator/decorateClassField';
// export { decorateClassConstructorParameter } from './Core/Decorator/decorateClassConstructorParameter';
// export { decorateClassMethodParameter } from './Core/Decorator/decorateClassMethodParameter';
// export { decorateClassSetter } from './Core/Decorator/decorateClassSetter';
// export { decorateClassGetter } from './Core/Decorator/decorateClassGetter';

/*************************************
 *   Reflection Interfaces
 *************************************/
export { MemberKinds } from './Core/Interfaces/MemberKinds';
export { MemberInfo } from './Core/Interfaces/MemberInfo';
export { TypeInfo } from './Core/Interfaces/TypeInfo';
export { PropertyInfo } from './Core/Interfaces/PropertyInfo';
export { ParameterInfo } from './Core/Interfaces/ParameterInfo';
export { Filter } from './Core/Interfaces/Filter';

/*************************************
 *   Reflection Class Interfaces
 *************************************/
export { ClassInvocation } from './Core/Interfaces/TypeInvocations';
export { ClassInterceptor } from './Core/Interfaces/TypeInterceptors';
export { ClassAttribute } from './Core/Interfaces/TypeAttributes';

export { ParameterInvocation } from './Core/Interfaces/TypeInvocations';
export { ParameterInterceptor } from './Core/Interfaces/TypeInterceptors';
export { ParameterAttribute } from './Core/Interfaces/TypeAttributes';

export { PropertyInvocation } from './Core/Interfaces/TypeInvocations';
export { PropertyInterceptor } from './Core/Interfaces/TypeInterceptors';
export { PropertyAttribute } from './Core/Interfaces/TypeAttributes';

// export { FieldInvocation, MethodInvocation } from './Core/Interfaces/TypeInvocations';
// export { FieldInterceptor, MethodInterceptor } from './Core/Interfaces/TypeInterceptors';
// export { ClassFieldAttribute, ClassMethodAttribute } from './Core/Interfaces/TypeAttributes';
