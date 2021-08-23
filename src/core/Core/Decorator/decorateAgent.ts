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
import { AddAttributeToClassReverse } from '../Helpers/AddAttribute';
import { Attribute } from '../Interfaces/Attribute';

/**
 * Decorate agent with attribute (this attribute will be used for upgrade agent)
 */
export function decorateAgent<T extends Attribute>(attribute: T) {
  // upgrade prototype
  return (target: Function): void => {
    if (CanDecorate(attribute, target)) {
      AddAttributeToClassReverse(attribute, target);
    }
  };
}
