import { Type } from './type';
import { Constructor } from './constructor';


export interface IRegistry {
  
  /**
   *
   * @param filter
   * @param filterCriteria
   * @returns {Type[]}
   */
  findTypes(filter, filterCriteria: any): Type[];
  
  /**
   * Return the type information for this prototype
   * @param {Object} prototype
   * @param {boolean} throwOnError
   * @returns {Type[]}
   */
  getType(prototype: object, throwOnError?: boolean): Type;
  
  /**
   * Returns all the types defined within this registry.
   * @returns {Type[]}
   */
  getTypes(): Type[];
  
  /**
   * Resolve a type from a hash key
   * @returns {Type}
   */
  resolveType(hash: string): Type;
  
}


export class InMemoryRegistry implements IRegistry {
  
  findTypes(filter, filterCriteria: any): Type[] {
    throw new Error('Not support');
  }
  
  getType(className: Constructor, throwOnError?: boolean): Type[] {
    throw new Error('Not support');
  }
  
  getTypes(): Type[] {
    throw new Error('Not support');
  }
  
  resolveType(hash: string): Type {
    throw new Error('Not support');
  }
  
}


