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

import { AddMetadata } from '../lib/core/Annotation/AddMetadata';
const original: Function = Reflect['metadata'];

/* istanbul ignore next */
if (!original || !original['now']) {
  // if one day the browser implemented Reflect.metadata. We will reflector all
  // code related to metadata data in order to have a better performance.
  if (original) {
    // ===========================================
    // Reflect.metadata is defined
    // ===========================================
    function metadata(
      this: { key: string; value: any },
      target: Function | object,
      property?: string | symbol,
      descriptor?: PropertyDescriptor
    ): any {
      AddMetadata(this.key, this.value, target, property, descriptor);
      // save metadata to Reflect.metadata (if have)
      return original.apply(Reflect, [this.key, this.value])(target, property, descriptor);
    }
    Reflect['metadata'] = function (key: string, value: any) {
      return metadata.bind({ key, value });
    };
  } else {
    // ===========================================
    // Reflect.metadata is undefined
    // ===========================================
    function metadata(
      this: { key: string; value: any },
      target: Function | object,
      property?: string | symbol,
      descriptor?: PropertyDescriptor
    ): any {
      AddMetadata(this.key, this.value, target, property, descriptor);
    }
    Reflect['metadata'] = function (key: string, value: any) {
      return metadata.bind({ key, value });
    };
  }
  Reflect['metadata']['now'] = Date.now();
}

/*************************************
 *   Core Types
 *************************************/
export {
  AnyConstructor,
  Constructor,
  DefaultConstructor,
  ParameterConstructor,
  AbstractConstructor,
} from '../lib/core/Constructor';
export { Decorators, ClassDecorator, PropertyDecorator, ParameterDecorator } from '../lib/core/Decorator/decorators';
export { Arguments } from '../lib/core/Interfaces/Arguments';
export { Attribute } from '../lib/core/Interfaces/Attribute';
export { Invocation } from '../lib/core/Interfaces/Invocation';
export { Interceptor } from '../lib/core/Interfaces/Interceptor';
export { Interceptable } from '../lib/core/Interfaces/Interceptable';

/*************************************
 *   Agent API
 *************************************/
// export { decorateAgent } from './Core/Agent/decorateAgent';
export { AgentAttribute } from '../lib/core/Agent/AgentAttribute';
export { CreateAgent } from '../lib/core/Agent/CreateAgent';
export { IsAgent } from '../lib/core/IsAgent';
export { GetType } from '../lib/core/GetType';

/*************************************
 *   Sub-module Metadata API
 *************************************/
export { GetOrCreate } from '../lib/core/Wisdom';

/*************************************
 *   Reflection API
 *************************************/
export { Reflector } from '../lib/core/Reflector';

export { decorate } from '../lib/core/Decorator/decorate';
export { decorateClass } from '../lib/core/Decorator/decorateClass';
export { decorateClassProperty } from '../lib/core/Decorator/decorateClassProperty';
export { decorateParameter } from '../lib/core/Decorator/decorateParameter';

// export { decorateClassMethod } from '../lib/core/Decorator/decorateClassMethod';
// export { decorateClassField } from '../lib/core/Decorator/decorateClassField';
// export { decorateClassConstructorParameter } from '../lib/core/Decorator/decorateClassConstructorParameter';
// export { decorateClassMethodParameter } from '../lib/core/Decorator/decorateClassMethodParameter';
// export { decorateClassSetter } from '../lib/core/Decorator/decorateClassSetter';
// export { decorateClassGetter } from '../lib/core/Decorator/decorateClassGetter';

/*************************************
 *   Reflection Interfaces
 *************************************/
export { MemberKinds } from '../lib/core/Interfaces/MemberKinds';
export { MemberInfo } from '../lib/core/Interfaces/MemberInfo';
export { TypeInfo } from '../lib/core/Interfaces/TypeInfo';
export { PropertyInfo } from '../lib/core/Interfaces/PropertyInfo';
export { ParameterInfo } from '../lib/core/Interfaces/ParameterInfo';
export { Filter } from '../lib/core/Interfaces/Filter';

/*************************************
 *   Reflection Class Interfaces
 *************************************/
export { ClassInvocation } from '../lib/core/Interfaces/TypeInvocations';
export { ClassInterceptor } from '../lib/core/Interfaces/TypeInterceptors';
export { ClassAttribute } from '../lib/core/Interfaces/TypeAttributes';

export { ParameterInvocation } from '../lib/core/Interfaces/TypeInvocations';
export { ParameterInterceptor } from '../lib/core/Interfaces/TypeInterceptors';
export { ParameterAttribute } from '../lib/core/Interfaces/TypeAttributes';

export { PropertyInvocation } from '../lib/core/Interfaces/TypeInvocations';
export { PropertyInterceptor } from '../lib/core/Interfaces/TypeInterceptors';
export { PropertyAttribute } from '../lib/core/Interfaces/TypeAttributes';

// export { FieldInvocation, MethodInvocation } from '../lib/core/Interfaces/TypeInvocations';
// export { FieldInterceptor, MethodInterceptor } from '../lib/core/Interfaces/TypeInterceptors';
// export { ClassFieldAttribute, ClassMethodAttribute } from '../lib/core/Interfaces/TypeAttributes';
