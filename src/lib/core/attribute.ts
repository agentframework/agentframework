import { IInterceptor } from './interceptor';
import { Reflection } from './reflection';
import { AddConstructInterceptor } from './interceptors/construct';
import { AddPrototypeInterceptor } from './interceptors/prototype';

const ORIGIN = Symbol('agent.framework.origin.constructor');

export interface IAttribute {
  
  /**
   * Fired before decoration of this attribute
   * @param target
   * @param targetKey
   */
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean
  
  /**
   * Get unique type name for this attribute
   */
  getType(): string
  
  /**
   * Get interceptor for this _invocation
   */
  getInterceptor(): IInterceptor
  
}

/**
 * Decorate class members
 * @param attribute
 * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
 */
export function decorateClassMembers(attribute: IAttribute) {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    if (attribute.beforeDecorate(target, propertyKey, descriptor)) {
      Reflection.addAttribute(attribute, target, propertyKey, descriptor)
    }
  }
}

/**
 * Decorate class
 * @param attribute
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function decorateClass(attribute: IAttribute) {
  
  // upgrade prototype
  return <Constructor extends Function>(target: Constructor): Constructor | void => {
  
    const originTarget = target[ORIGIN] || target;
    
    if (attribute.beforeDecorate(originTarget)) {
      Reflection.addAttribute(attribute, originTarget);
      const upgradedTarget = AddPrototypeInterceptor(originTarget);
      const upgradedConstructor = AddConstructInterceptor(upgradedTarget);
      upgradedConstructor[ORIGIN] = originTarget;
      return upgradedConstructor;
    }
    
  }
}
