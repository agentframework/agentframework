import { Property } from './Property';
import { Constructor } from '../Constructor';
import { AgentFeatures } from '../AgentFeatures';
import { IAttribute } from '../IAttribute';
import { Type } from './Type';

/**
 * Represents a callback function that is used to filter a list of behavior represented in a map of Behavior objects.
 */
export interface PropertyFilter {
  /**
   * @param {Property} value The Behavior object to which the filter is applied.
   * @param filterCriteria An arbitrary object used to filter the list.
   * @returns {boolean} `true` to include the behavior in the filtered list; otherwise false.
   */
  (value: Property<Type>, filterCriteria?: any): boolean;
}

export class PropertyFilters {
  static FilterAttribute<T extends IAttribute>(
    property: Property<Type>,
    filterCriteria?: Constructor<T>
  ): boolean {
    return property.hasAttribute(filterCriteria);
  }

  static FilterFeatures(property: Property<Type>, filterCriteria?: AgentFeatures): boolean {
    if (!filterCriteria) {
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
