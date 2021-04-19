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
  AddAttributeToMethodParameter,
  AddAttributeToConstructorParameter,
  AddAttributeToMember,
} from '../Wisdom/AddAttribute';
import { MemberKinds } from '../Interfaces/MemberKinds';
import { AgentFrameworkError } from '../Error/AgentFrameworkError';

/**
 * Decorate attribute to the target, throw if target not allowed
 */
export function decorate<T extends Attribute>(
  attribute: T,
  allows?: number
): (target: object | Function, targetKey?: string | symbol, descriptorOrIndex?: PropertyDescriptor | number) => void {
  const allowed = typeof allows === 'undefined' ? MemberKinds.All : allows; // 511 = All
  return (target: object | Function, key?: string | symbol, descriptorOrIndex?: PropertyDescriptor | number): void => {
    // if key == null then target == Function
    if (key == null) {
      // NOTE: always decorate constructor attribute and parameter attribute to class prototype
      // unless MemberKinds specified MemberKinds.Static flags
      if (typeof descriptorOrIndex === 'number') {
        // this is constructor parameter
        if (MemberKinds.Parameter !== (allowed & MemberKinds.Parameter)) {
          throw new AgentFrameworkError(
            `InvalidDecorator: ${attribute.constructor.name} is not allow decorate on constructor parameters`
          );
        }
        if (CanDecorate(attribute, target, key, descriptorOrIndex)) {
          AddAttributeToConstructorParameter(attribute, (target as Function).prototype, descriptorOrIndex);
          // Reflector(target)
          //   .parameter(descriptor)
          //   .addAttribute(attribute);
        }
      } else {
        // this is constructor
        if (MemberKinds.Class !== (allowed & MemberKinds.Class)) {
          throw new AgentFrameworkError(
            `InvalidDecorator: ${attribute.constructor.name} is not allow decorate on class`
          );
        }
        if (CanDecorate(attribute, target, key)) {
          AddAttributeToClass(attribute, (target as Function).prototype);
          // Reflector(target)
          //   .addAttribute(attribute);
        }
      }
    } else {
      if (typeof descriptorOrIndex === 'number') {
        // this is method parameter
        if (MemberKinds.Parameter !== (allowed & MemberKinds.Parameter)) {
          throw new AgentFrameworkError(
            `InvalidDecorator: ${attribute.constructor.name} is not allow decorate on method parameters`
          );
        }

        if (typeof target === 'function' && MemberKinds.Static !== (allowed & MemberKinds.Static)) {
          throw new AgentFrameworkError(
            `InvalidDecorator: ${attribute.constructor.name} is not allow decorate on static method parameters`
          );
        }

        if (CanDecorate(attribute, target, key, descriptorOrIndex)) {
          AddAttributeToMethodParameter(attribute, target, key, descriptorOrIndex);
          // Reflector(target)
          //   .property(targetKey)
          //   .parameter(descriptorOrIndex)
          //   .addAttribute(attribute);
        }
      } else {
        // this is method
        if (MemberKinds.Property !== (allowed & MemberKinds.Property)) {
          throw new AgentFrameworkError(
            `InvalidDecorator: ${attribute.constructor.name} is not allow decorate on property`
          );
        }

        if (typeof target === 'function' && MemberKinds.Static !== (allowed & MemberKinds.Static)) {
          throw new AgentFrameworkError(
            `InvalidDecorator: ${attribute.constructor.name} is not allow decorate on static property`
          );
        }

        if (CanDecorate(attribute, target, key)) {
          AddAttributeToMember(attribute, target, key);
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
