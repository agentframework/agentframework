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

export enum Target {
  Constructor = 1,
  ConstructorParameter = 2,
  Field = 4,
  Method = 8,
  MethodParameter = 16,
  Getter = 32,
  Setter = 64
}

/**
 * This is universal decorator for all supported target
 */
export interface UniversalDecorator {
  (target: Function | Object, targetKey?: string | symbol, descriptor?: number | PropertyDescriptor): any;
}

/**
 * Decorate attribute to the target
 */
export function decorate(attribute: IAttribute, allows: Target): UniversalDecorator {
  return (target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor | number): any => {
    let descriptorType = typeof descriptor;

    if (targetKey == null) {
      if (descriptorType === 'number') {
        // this is constructor parameter
        if (Target.ConstructorParameter !== (allows & Target.ConstructorParameter)) {
          throw new TypeError(`${attribute.constructor.name} is not allow decorate on constructor parameters`);
        }
      } else {
        // this is constructor
        if (Target.Constructor !== (allows & Target.Constructor)) {
          throw new TypeError(`${attribute.constructor.name} is not allow decorate on class`);
        }
      }
    } else {
      if (descriptorType === 'number') {
        // this is constructor parameter
        if (Target.MethodParameter !== (allows & Target.MethodParameter)) {
          throw new TypeError(`${attribute.constructor.name} is not allow decorate on method parameters`);
        }
      } else if (descriptor) {
        if (descriptor['value']) {
          if (typeof descriptor['value'] === 'function') {
            // this is method
            if (Target.Method !== (allows & Target.Method)) {
              throw new TypeError(`${attribute.constructor.name} is not allow decorate on method`);
            }
          } else {
            // this is field
            if (Target.Field !== (allows & Target.Field)) {
              throw new TypeError(`${attribute.constructor.name} is not allow decorate on field`);
            }
          }
        }
        if (descriptor['get']) {
          // this is constructor parameter
          if (Target.Getter !== (allows & Target.Getter)) {
            throw new TypeError(`${attribute.constructor.name} is not allow decorate on getter`);
          }
        }
        if (descriptor['set']) {
          // this is constructor parameter
          if (Target.Setter !== (allows & Target.Setter)) {
            throw new TypeError(`${attribute.constructor.name} is not allow decorate on setter`);
          }
        }
      } else {
        // this is constructor
        if (Target.Field !== (allows & Target.Field)) {
          throw new TypeError(`${attribute.constructor.name} is not allow decorate on field`);
        }
      }
    }

    if (CanDecorate(attribute, target, targetKey)) {
      if (targetKey == null) {
        if (descriptorType === 'number') {
          if (CanDecorate(attribute, target, targetKey)) {
            Reflector(target)
              .parameter(descriptor as number)
              .addAttribute(attribute);
          }
        } else {
          Reflector(target).addAttribute(attribute);
        }
      } else {
        if (descriptorType === 'number') {
          Reflector(target)
            .property(targetKey)
            .value.parameter(descriptor as number)
            .addAttribute(attribute);
        } else if (descriptor) {
          Reflector(target)
            .property(targetKey, descriptor as PropertyDescriptor)
            .value.addAttribute(attribute);
        } else {
          Reflector(target)
            .property(targetKey)
            .value.addAttribute(attribute);
        }
      }
    }
  };
}
