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

import { Attribute } from '../Interfaces/Attribute';
import { CanDecorate } from './CanDecorate';
import {
  AddAttributeToClass,
  AddAttributeToClassMethodParameter,
  AddAttributeToClassConstructorParameter,
  AddAttributeToClassMember
} from '../Annotation/AddAttribute';
import { MemberKinds } from '../Interfaces/MemberKinds';
import { Decorators } from './decorators';

/**
 * Decorate attribute to the target, throw if target not allowed
 */
export function decorate<T extends Attribute>(attribute: T, allows?: MemberKinds): Decorators {
  const allowed = typeof allows === 'undefined' ? MemberKinds.All : allows; // 511 = All
  return (target: object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor | number): void => {
    if (targetKey == null) {
      if (typeof descriptor === 'number') {
        // this is constructor parameter
        if (MemberKinds.Parameter !== (allowed & MemberKinds.Parameter)) {
          throw new TypeError(`${attribute.constructor.name} is not allow decorate on constructor parameters`);
        }
        if (CanDecorate(attribute, target, targetKey, descriptor)) {
          AddAttributeToClassConstructorParameter(attribute, target as Function, descriptor);
          // Reflector(target)
          //   .parameter(descriptor)
          //   .addAttribute(attribute);
        }
      } else {
        // this is constructor
        if (MemberKinds.Class !== (allowed & MemberKinds.Class)) {
          throw new TypeError(`${attribute.constructor.name} is not allow decorate on class`);
        }
        if (CanDecorate(attribute, target, targetKey)) {
          AddAttributeToClass(attribute, target as Function);
          // Reflector(target)
          //   .addAttribute(attribute);
        }
      }
    } else {
      if (typeof descriptor === 'number') {
        // this is constructor parameter
        if (MemberKinds.Parameter !== (allowed & MemberKinds.Parameter)) {
          throw new TypeError(`${attribute.constructor.name} is not allow decorate on method parameters`);
        }

        if (CanDecorate(attribute, target, targetKey, descriptor)) {
          AddAttributeToClassMethodParameter(attribute, target.constructor, targetKey, descriptor);
          // Reflector(target)
          //   .property(targetKey)
          //   .parameter(descriptorOrIndex)
          //   .addAttribute(attribute);
        }
      } else {
        // this is constructor
        if (MemberKinds.Property !== (allowed & MemberKinds.Property)) {
          throw new TypeError(`${attribute.constructor.name} is not allow decorate on property`);
        }

        if (CanDecorate(attribute, target, targetKey)) {
          AddAttributeToClassMember(attribute, target.constructor, targetKey);
          // Reflector(target)
          //   .property(targetKey)
          //   .value
          //   .addAttribute(attribute);
        }
      }
      // else if (descriptor instanceof Object) {
      //   if (descriptor.value) {
      //     // this is method
      //     if (MemberKinds.Method !== (allowed & MemberKinds.Method)) {
      //       throw new TypeError(`${attribute.constructor.name} is not allow decorate on method`);
      //     }
      //
      //     if (CanDecorate(attribute, target, targetKey, descriptor)) {
      //       // Check add to getter, setter or value
      //       AddAttributeToClassMethod(attribute, target.constructor, targetKey, descriptor);
      //       // Reflector(target)
      //       //   .property(targetKey)
      //       //   .value
      //       //   .addAttribute(attribute);
      //     }
      //   } else {
      //     if (descriptor.get) {
      //       // this is constructor parameter
      //       if (MemberKinds.Getter !== (allowed & MemberKinds.Getter)) {
      //         throw new TypeError(`${attribute.constructor.name} is not allow decorate on getter`);
      //       }
      //
      //       if (CanDecorate(attribute, target, targetKey, descriptor)) {
      //         // Check add to getter, setter or value
      //         AddAttributeToClassGetter(attribute, target.constructor, targetKey, descriptor);
      //         // Reflector(target)
      //         //   .property(targetKey)
      //         //   .getter
      //         //   .addAttribute(attribute);
      //       }
      //     }
      //     if (descriptor.set) {
      //       // this is constructor parameter
      //       if (MemberKinds.Setter !== (allowed & MemberKinds.Setter)) {
      //         throw new TypeError(`${attribute.constructor.name} is not allow decorate on setter`);
      //       }
      //
      //       if (CanDecorate(attribute, target, targetKey, descriptor)) {
      //         // Check add to getter, setter or value
      //         AddAttributeToClassSetter(attribute, target.constructor, targetKey, descriptor);
      //         // Reflector(target)
      //         //   .property(targetKey)
      //         //   .setter
      //         //   .addAttribute(attribute);
      //       }
      //     }
      //   }
      // } else {
      //   // this is constructor
      //   if (MemberKinds.Field !== (allowed & MemberKinds.Field)) {
      //     throw new TypeError(`${attribute.constructor.name} is not allow decorate on field`);
      //   }
      //
      //   if (CanDecorate(attribute, target, targetKey)) {
      //     AddAttributeToClassField(attribute, target.constructor, targetKey);
      //     // Reflector(target)
      //     //   .property(targetKey)
      //     //   .value
      //     //   .addAttribute(attribute);
      //   }
      // }
    }

    return;
  };
}
