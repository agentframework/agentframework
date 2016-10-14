import { IAttribute } from './attribute';
import { Reflection } from './reflection';
import { AddPrototypeInterceptor } from './interceptors/prototype';
import { AddConstructProxyInterceptor } from './interceptors/construct';

const ORIGIN_CONSTRUCTOR = Symbol('agent.framework.origin.constructor');

/**
 * Decorate class
 * @param attribute
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function decorateClass(attribute: IAttribute): ClassDecorator {
  
  // upgrade prototype
  return <Constructor extends Function>(target: Constructor): Constructor | void => {
    
    const originTarget = target[ORIGIN_CONSTRUCTOR] || target;
    
    if (!attribute.beforeDecorate || attribute.beforeDecorate(originTarget)) {
      Reflection.addAttribute(attribute, originTarget);
      const upgradedTarget = AddPrototypeInterceptor(originTarget);
      const upgradedConstructor = AddConstructProxyInterceptor(upgradedTarget);
      upgradedConstructor[ORIGIN_CONSTRUCTOR] = originTarget;
      return upgradedConstructor;
    }
    
    return target;
  }
}

/**
 * Decorate class members
 * @param attribute
 * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
 */
export function decorateClassMember(attribute: IAttribute) {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    if (!attribute.beforeDecorate || attribute.beforeDecorate(target, propertyKey, descriptor)) {
      Reflection.addAttribute(attribute, target, propertyKey, descriptor)
    }
  }
}

/**
 * Decorate class property
 * @param attribute
 * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
 */
export function decorateClassMethod(attribute: IAttribute): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    if (!attribute.beforeDecorate || attribute.beforeDecorate(target, propertyKey, descriptor)) {
      Reflection.addAttribute(attribute, target, propertyKey, descriptor)
    }
  }
}

/**
 * Decorate class field
 * @param attribute
 * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
 */
export function decorateClassProperty(attribute: IAttribute): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    // TypeScript is not smart enough to identify the PropertyDescriptor on method
    if (descriptor) {
      throw new TypeError(`${Reflect.getPrototypeOf(attribute).constructor.name} can only decorate on class property`);
    }
    if (!attribute.beforeDecorate || attribute.beforeDecorate(target, propertyKey)) {
      Reflection.addAttribute(attribute, target, propertyKey)
    }
  }
}

