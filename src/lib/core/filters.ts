import { AgentFeatures } from './compilerOptions';
import { Property } from './property';

export class PropertyFilters {
  // /**
  //  * Filters the classes represented in an array of Type objects.
  //  */
  // static FilterAttribute(behavior: Property, filterCriteria?: any): boolean {
  //   const results = behavior.getAttributes(filterCriteria);
  //   return results.length > 0;
  // }

  static FilterFeatures(property: Property, filterCriteria?: AgentFeatures): boolean {
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
