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

import { Interceptor } from './Interceptor';

/**
 * Represents an attribute.
 */
export interface Attribute extends Object {
  /**
   * Hook executed before decoration.
   * If this method returns `false`, the attribute will not be applied to the class.
   *
   * NOTE: The interface must define at least one member;
   * otherwise, TypeScript will treat it as an empty type.
   *
   * @param {Object | Function} target The target object or constructor function
   * @param {string | Symbol} key The property key (optional)
   * @param {PropertyDescriptor} descriptor The property descriptor or an index (optional)
   * @returns {boolean} boolean indicating whether to proceed with decoration (`false` to abort)
   *
   */
  beforeDecorate?(target: object | Function, key?: string | symbol, descriptor?: PropertyDescriptor | number): boolean;

  /**
   * The interceptor associated with this attribute.
   */
  readonly interceptor?: Interceptor;
}
