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

import { CanDecorate } from './CanDecorate';
import { Attribute } from '../Attribute';
import {
  AddAttributeToConstructorParameter,
  AddAttributeToProperty,
  AddAttributeToPropertyParameter,
} from '../../../dependencies/core';
import { VariableDecorator } from '../Decorators/VariableDecorator';

/**
 * Decorate class properties (field, getter, setter and methods)
 */
export function decorateVariable<T extends Attribute>(attribute: T): VariableDecorator {
  return (target: Object, targetKey: string | symbol, parameterIndex?: PropertyDescriptor | number): void => {
    if (CanDecorate(attribute, target, targetKey, parameterIndex)) {
      if (typeof parameterIndex === 'number') {
        if (targetKey != null) {
          AddAttributeToPropertyParameter(attribute, target, targetKey, parameterIndex);
        } else {
          AddAttributeToConstructorParameter(attribute, (target as Function).prototype, parameterIndex);
        }
      } else {
        AddAttributeToProperty(attribute, target, targetKey, parameterIndex);
      }
    }
  };
}
