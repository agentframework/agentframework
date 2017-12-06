import { IAttribute, CanDecorate, IAgentAttribute } from './attribute';
import { Reflection } from './reflection';
import { AddConstructProxyInterceptor } from './interceptors/construct';
import { LocalDomain } from '../domain';
import { ORIGIN_CONSTRUCTOR } from './utils';


/**
 * Decorate class
 * @param attribute
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function decorateClass(attribute: IAgentAttribute): ClassDecorator {

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

      if (!proxied) {
        // intercept by implement ES6 proxy (dynamic proxy + pre-compiled constructor interceptor)
        proxiedConstructor = AddConstructProxyInterceptor(target);
        Reflect.set(proxiedConstructor, ORIGIN_CONSTRUCTOR, originConstructor);
      }
      else {
        // only proxy once for one class, no matter how many @agent() attribute we found
        proxiedConstructor = target;
      }

      // Register the agent class in LocalDomain for dependence injection
      LocalDomain.registerAgentType(attribute, proxiedConstructor);

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

/**
 * Return origin constructor for a giving constructor
 * @param type
 * @returns {any}
 */
export function getOriginConstructor(type: any): any {
  return type[ORIGIN_CONSTRUCTOR] || type;
}
