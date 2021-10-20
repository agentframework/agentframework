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
import { AddAttributeToProperty } from '../../../dependencies/core';
import { HasInterceptor } from '../CustomInterceptor';

/**
 * Decorate class properties (field, getter, setter and methods)
 */
export function decorateMember<T extends Attribute>(attribute: T) {
  return (target: object | Function, targetKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    // if (typeof target === 'function') {
    //   throw new Error('Attribute not allow declare on class static member');
    // }
    if (CanDecorate(attribute, target, targetKey, descriptor)) {
      AddAttributeToProperty(attribute, target, targetKey, descriptor, HasInterceptor(attribute));
      // Reflector(target)
      //   .property(propertyKey, descriptor)
      //   .addAttribute(attribute);
    }
  };
}
