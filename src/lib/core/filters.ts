import { AgentFeatures } from './decorator';
import { Property } from './reflection';

export class PropertyFilters {
  
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
