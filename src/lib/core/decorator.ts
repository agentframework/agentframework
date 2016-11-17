import { IAttribute, CanDecorate } from './attribute';
import { Reflection } from './reflection';
import { AddConstructProxyInterceptor } from './interceptors/construct';
import { LocalDomain } from '../domain';
import { AgentAttribute, Agent } from '../agent';
import { ORIGIN_CONSTRUCTOR } from './utils';


/**
 * Decorate class
 * @param attribute
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function decorateClass(attribute: IAttribute): ClassDecorator {

  // upgrade prototype
  return <Constructor extends Agent>(target: Constructor): Constructor | void => {

    // // check the parents
    // let upgrade = true;
    // for (let current = target; !!current.name; current = Object.getPrototypeOf(current)) {
    //   console.log('check ====> name   :', current.name);
    //   console.log('            symbols:', Object.getOwnPropertySymbols(current));
    //   console.log('            props  :', Object.getOwnPropertyNames(current));
    //   const origin = current[ORIGIN_CONSTRUCTOR];
    //   if (origin) {
    //     console.log('            ORIGIN :', origin.name, '(do not upgrade)');
    //     upgrade = true;
    //     break;
    //   }
    // }

    const proxied = Reflect.has(target, ORIGIN_CONSTRUCTOR);
    const originalTarget = proxied ? Reflect.get(target, ORIGIN_CONSTRUCTOR) : target;

    if (CanDecorate(attribute, originalTarget)) {

      Reflection.addAttribute(attribute, originalTarget);

      let upgradedTarget;

      if (proxied) {
        upgradedTarget = target;
      }
      else {
        // intercept by implement ES6 proxy (dynamic intercept)
        upgradedTarget = AddConstructProxyInterceptor(target);
        Reflect.set(upgradedTarget, ORIGIN_CONSTRUCTOR, originalTarget);
      }
      // console.log('add class', typeof originTarget, typeof originTarget.prototype);

      // intercept by overloading ES5 prototype (static intercept)
      // AddPrototypeInterceptor(upgradedConstructor);

      // always register agent type in LocalDomain
      if (attribute instanceof AgentAttribute) {
        LocalDomain.registerAgentType(attribute, upgradedTarget);
      }

      return upgradedTarget;
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
    if (CanDecorate(attribute, target, propertyKey, descriptor)) {
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
    if (CanDecorate(attribute, target, propertyKey, descriptor)) {
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
    if (CanDecorate(attribute, target, propertyKey)) {
      Reflection.addAttribute(attribute, target, propertyKey)
    }
  }
}

export function getDecoratingClass(type: any): any {
  return type[ORIGIN_CONSTRUCTOR] || type;
}
