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

// import { Reflector } from '../Reflector';
import { CanDecorate } from './CanDecorate';
import { ParameterAttribute } from '../TypeAttributes';
import { AddAttributeToConstructorParameter } from '../../../dependencies/core';
import { AddAttributeToPropertyParameter } from '../../../dependencies/core';

/**
 * Decorate class method parameter
 */
export function decorateParameter<T extends ParameterAttribute>(attribute: T) {
  return (target: object | Function, targetKey: string | symbol | undefined, parameterIndex: number): void => {
    if (CanDecorate(attribute, target, targetKey, parameterIndex)) {
      if (targetKey != null) {
        AddAttributeToPropertyParameter(attribute, target, targetKey, parameterIndex);
        // Reflector(target)
        //   .property(propertyKey)
        //   .parameter(parameterIndex)
        //   .addAttribute(attribute);
      } else {
        AddAttributeToConstructorParameter(attribute, (target as Function).prototype, parameterIndex);
        // Reflector(target)
        //   .parameter(parameterIndex)
        //   .addAttribute(attribute);
      }
    }
  };
}
