import { AgentFeatures } from './compilerOptions';
import { Property } from './property';
import { Constructor, TypedConstructor } from './constructor';
import { IAttribute } from './attribute';

export class PropertyFilters {
  static FilterAttribute(property: Property, filterCriteria?: Constructor): boolean {
    return property.hasAttribute(filterCriteria);
  }

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
