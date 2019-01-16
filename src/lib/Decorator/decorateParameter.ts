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
 * Decorate class method parameter
 */
export function decorateParameter(attribute: IAttribute): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, parameterIndex: number): void => {
    if (CanDecorate(attribute, target, propertyKey, parameterIndex)) {
      if (propertyKey == null) {
        // this is for constructor
        Reflector(target)
          .parameter(parameterIndex)
          .addAttribute(attribute);
      } else {
        // parameter for methods, only method have parameters
        Reflector(target)
          .property(propertyKey)
          .value.parameter(parameterIndex)
          .addAttribute(attribute);
      }
    }
  };
}
