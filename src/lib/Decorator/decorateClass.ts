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

import { IAttribute } from '../Core/IAttribute';
import { Reflector } from '../Reflection/Reflector';
import { CanDecorate } from '../Compiler/Internal/Utils';

/**
 * Decorate class with attribute
 */
export function decorateClass(attribute: IAttribute): ClassDecorator {
  // upgrade prototype
  return (target: Function): void => {
    if (CanDecorate(attribute, target)) {
      Reflector(target).addAttribute(attribute);
    }
    return void 0;
  };
}

/**
 * Decorate class properties (field, getter, setter and methods)
 */
export function decorateClassMember(attribute: IAttribute) {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    if (CanDecorate(attribute, target, propertyKey, descriptor)) {
      Reflector(target)
        .property(propertyKey, descriptor)
        .addAttribute(attribute);
    }
  };
}

/**
 * Decorate class method
 */
export function decorateClassMethod(attribute: IAttribute): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    if (CanDecorate(attribute, target, propertyKey, descriptor)) {
      Reflector(target)
        .property(propertyKey, descriptor)
        .value.addAttribute(attribute);
    }
  };
}

/**
 * Decorate class field
 */
export function decorateClassField(attribute: IAttribute): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    // TypeScript is not smart enough to identify the PropertyDescriptor on method
    if (descriptor) {
      throw new TypeError(
        `${Reflect.getPrototypeOf(attribute).constructor.name} can only decorate on class field property`
      );
    }
    if (CanDecorate(attribute, target, propertyKey)) {
      Reflector(target)
        .property(propertyKey)
        .value.addAttribute(attribute);
    }
  };
}
