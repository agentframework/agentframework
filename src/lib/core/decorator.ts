import { IAttribute } from './attribute';
import { Reflection } from './reflection';
import { AddPrototypeInterceptor } from './interceptors/prototype';
import { AddConstructInterceptor } from './interceptors/construct';

const ORIGIN_CONSTRUCTOR = Symbol('agent.framework.origin.constructor');

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
    
    const originTarget = target[ORIGIN_CONSTRUCTOR] || target;
    
    if (attribute.beforeDecorate(originTarget)) {
      Reflection.addAttribute(attribute, originTarget);
      const upgradedTarget = AddPrototypeInterceptor(originTarget);
      const upgradedConstructor = AddConstructInterceptor(upgradedTarget);
      upgradedConstructor[ORIGIN_CONSTRUCTOR] = originTarget;
      return upgradedConstructor;
    }
    
  }
}
