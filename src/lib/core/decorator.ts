import { IAttribute, CanDecorate } from './attribute';
import { Reflection } from './reflection';
import {
  Constructor,
  CreateLazyFunctionConstructorInterceptor,
  CreateLazyClassConstructorInterceptor,
  CreateLazyProxyConstructorInterceptor,
  CreateStaticFunctionConstructorInterceptor,
  CreateStaticClassConstructorInterceptor,
  CreateStaticProxyConstructorInterceptor,
  CreateDynamicFunctionConstructorInterceptor,
  CreateDynamicClassConstructorInterceptor,
  CreateDynamicProxyConstructorInterceptor
} from './interceptors/construct';
import { ORIGIN_CONSTRUCTOR } from './utils';
import { IDomain, LocalDomain } from '../domain';
import { isUndefined } from 'util';

export enum AgentFeatures {
  Disabled = 0,
  Initializer = 1,
  Interceptor = 2
}

export enum AgentCompileType {
  StaticFunction = 1,
  StaticClass = 2,
  StaticProxy = 3,
  LazyFunction = 21,
  LazyClass = 22,
  LazyProxy = 23,
  DynamicFunction = 31,
  DynamicClass = 32,
  DynamicProxy = 33
}

export interface AgentOptions {
  attribute: IAttribute,
  domain: IDomain,
  features: AgentFeatures,
  compile: AgentCompileType
}

/**
 * Decorate an agent
 */
export function decorateAgent(options: Partial<AgentOptions>): ClassDecorator {

  options = options || {};

  // We will use `Lazy` method to create agent
  // please refer to ADR-0004
  options.compile = options.compile || AgentCompileType.LazyFunction;
  options.features = options.features == null ? (AgentFeatures.Initializer ^ AgentFeatures.Interceptor) : options.features;

  return <T extends Function>(target: T): T | void => {

    // Reflect.has will check all base classes
    const isAgent = target[ORIGIN_CONSTRUCTOR];
    if (isAgent) {
      throw new TypeError(`Unable to decorate as agent more than one time for class '${target.name}'`);
    }

    const attribute = options.attribute;

    // when attribute is not null. check the attribute before upgrading class to agent
    if (!attribute || CanDecorate(attribute, target)) {

      // not adding to reflection if attribute is null
      if (attribute) {
        Reflection.addAttribute(attribute, target);
      }

      // make a new constructor from chained interceptors which defined in class attributes
      let proxiedConstructor;

      if (AgentCompileType.LazyFunction === options.compile) {
        proxiedConstructor = CreateLazyFunctionConstructorInterceptor<T>(target, options)
      }
      else if (AgentCompileType.LazyClass === options.compile) {
        proxiedConstructor = CreateLazyClassConstructorInterceptor<T>(target as any as Constructor, options);
      }
      else if (AgentCompileType.LazyProxy === options.compile) {
        proxiedConstructor = CreateLazyProxyConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.StaticFunction === options.compile) {
        proxiedConstructor = CreateStaticFunctionConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.StaticClass === options.compile) {
        proxiedConstructor = CreateStaticClassConstructorInterceptor<T>(target as any as Constructor, options);
      }
      else if (AgentCompileType.StaticProxy === options.compile) {
        proxiedConstructor = CreateStaticProxyConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.DynamicFunction === options.compile) {
        proxiedConstructor = CreateDynamicFunctionConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.DynamicClass === options.compile) {
        proxiedConstructor = CreateDynamicClassConstructorInterceptor<T>(target as any as Constructor, options);
      }
      else if (AgentCompileType.DynamicProxy === options.compile) {
        proxiedConstructor = CreateDynamicProxyConstructorInterceptor<T>(target, options);
      }
      else {
        throw new Error(`Not supported agent build type: ${options.compile} on type ${target.prototype.constructor.name}`);
      }

      // use LocalDomain if domain is not specified in the options
      const domain = options.domain || LocalDomain;

      // register this agent with domain
      domain.register(target, proxiedConstructor);

      // proxiedConstructor = AddConstructInterceptor(target as any as Constructor<T>);
      Reflect.set(proxiedConstructor, ORIGIN_CONSTRUCTOR, target);

      return proxiedConstructor;

    }

  };

}


/**
 * Decorate class with attribute
 */
export function decorateClass(attribute: IAttribute): ClassDecorator {
  // upgrade prototype
  return <T extends Function>(target: T): void => {
    if (CanDecorate(attribute, target)) {
      Reflection.addAttribute(attribute, target);
    }
  }
}


/**
 * Decorate class members
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
