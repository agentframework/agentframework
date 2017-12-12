import { GetPrototypeArray, IsString } from './utils';
import { Constructor } from './constructor';
import { AgentFeatures } from './compiler';
import { Reflector } from './reflector';
import { Property} from './reflection';
import { PropertyFilters } from './filters';


export class Lookup {
  
  /**
   * Find all attribute with interceptor
   */
  public static findInterceptors(typeOrInstance: Constructor): Property[] {

    const prototypes = GetPrototypeArray(typeOrInstance);
    
    let results:Property[] = [];
    
    for (const proto of prototypes.reverse()) {
      
      const behaviors = Reflector(proto).findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Interceptor);
  
      results = results.concat(behaviors);
      
    }

    return results;
  }
  
  /**
   * Find all attribute with initializer
   */
  public static findInitializers(typeOrInstance: Constructor): Property[] {
  
    const prototypes = GetPrototypeArray(typeOrInstance);
  
    let results:Property[] = [];
  
    for (const proto of prototypes.reverse()) {
    
      const behaviors = Reflector(proto).findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Initializer);
    
      results = results.concat(behaviors);
    
    }
  
    return results;
  }

}
