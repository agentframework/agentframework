import { IAttribute, CanDecorate } from './attribute';
import { Reflection } from './reflection';
import { AddConstructProxyInterceptor } from './interceptors/construct';
import { LocalDomain } from '../domain';
import { AgentAttribute } from '../agent';
import { ORIGIN_CONSTRUCTOR } from './utils';


/**
 * Decorate class
 * @param attribute
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function decorateClass(attribute: IAttribute): ClassDecorator {

  // upgrade prototype
  return <T extends Function>(target: T): T | void => {

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
    const originConstructor = proxied ? Reflect.get(target, ORIGIN_CONSTRUCTOR) : target;

    if (CanDecorate(attribute, originConstructor)) {

      // Attribute should always add to originalConstructor
      Reflection.addAttribute(attribute, originConstructor);

      let proxiedConstructor;

      // intercept by implement ES6 proxy (dynamic proxy + pre-compiled constructor interceptor)
      proxiedConstructor = AddConstructProxyInterceptor(target, [attribute]);
      Reflect.set(proxiedConstructor, ORIGIN_CONSTRUCTOR, originConstructor);

      // intercept by overloading ES5 prototype (static intercept)
      // AddPrototypeInterceptor(upgradedConstructor);

      // register the agent class in LocalDomain for dependence injection
      if (attribute instanceof AgentAttribute) {
        // Register class attribute with proxied class constructor
        LocalDomain.registerAgentType(attribute, proxiedConstructor);
      }

      return proxiedConstructor;
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
 * Decorate class property or getter
 * @param attribute
 * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
 */
export function decorateClassPropertyOrGetter(attribute: IAttribute): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    // TypeScript is not smart enough to identify the PropertyDescriptor on method
    if (descriptor && !descriptor.get) {
      throw new TypeError(`${Reflect.getPrototypeOf(attribute).constructor.name} can only decorate on class property or getter`);
    }
    if (CanDecorate(attribute, target, propertyKey)) {
      Reflection.addAttribute(attribute, target, propertyKey)
    }
  }
}

/**
 * Decorate class property
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
