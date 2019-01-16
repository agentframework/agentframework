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

import { Property } from './Property';
import { Constructor } from '../Compiler/Constructor';
import { AgentFeatures } from './AgentFeatures';
import { IAttribute } from '../Core/IAttribute';

/**
 * Represents a callback function that is used to filter a list of behavior represented in a map of Behavior objects.
 */
export interface PropertyFilter {
  /**
   * @param {Property} value The Behavior object to which the filter is applied.
   * @param filterCriteria An arbitrary object used to filter the list.
   * @returns {boolean} `true` to include the behavior in the filtered list; otherwise false.
   */
  (value: Property, filterCriteria?: any): boolean;
}

export class PropertyFilters {
  static FilterAttribute<T extends IAttribute>(property: Property, filterCriteria?: Constructor<T>): boolean {
    return property.hasAttribute(filterCriteria);
  }

  static FilterFeatures(property: Property, filterCriteria?: AgentFeatures): boolean {
    if (filterCriteria == null) {
      throw new Error('Missing AgentFeatures to filter');
    }
    return property.hasFeatures(filterCriteria);
  }

  // static FilterName(value: Property, filterCriteria?: any): boolean {
  //   return true;
  // }
  //
  // static FilterNameIgnoreCase(value: Property, filterCriteria?: any): boolean {
  //   return true;
  // }
}
