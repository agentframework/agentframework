import { IAttribute, CanDecorate } from './attribute';
import {
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
import { IsFunction} from './utils';
import { IDomain } from '../domain';
import { Reflector } from './reflector';
import { ORIGIN_CONSTRUCTOR } from './symbol';


export enum AgentFeatures {
  Disabled    = 0,
  Initializer = 1,
  Interceptor = 2
}

export enum AgentCompileType {
  StaticFunction  = 1,
  StaticClass     = 2,
  StaticProxy     = 3,
  LazyFunction    = 21,
  LazyClass       = 22,
  LazyProxy       = 23,
  DynamicFunction = 31,
  DynamicClass    = 32,
  DynamicProxy    = 33
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
  
  // We will use `Lazy` method to upgrade user class into agent
  // please refer to ADR-0004
  options.compile = options.compile || AgentCompileType.LazyFunction;
  options.features = options.features == null ? (AgentFeatures.Initializer ^ AgentFeatures.Interceptor) : options.features;
  
  // use LocalDomain if domain is not specified in the options
  // const domain: IDomain = options.domain;
  
  return <T extends Function>(target: T): T | void => {
    
    // Only check current type
    const origin = Object.getOwnPropertyDescriptor(target, ORIGIN_CONSTRUCTOR);
    if (origin && IsFunction(origin.value)) {
      throw new TypeError(`Unable to decorate as agent more than one time for class '${origin.value.prototype.constructor.name}'`);
    }
    
    const attribute = options.attribute;
    
    // when attribute is not null. check the attribute before upgrading class to agent
    if (!attribute || CanDecorate(attribute, target)) {
      
      // not adding to reflection if attribute is null
      if (attribute) {
        Reflector(target).addAttribute(attribute);
      }
      
      // make a new constructor from chained interceptors which defined in class attributes
      let agent;
      
      if (AgentCompileType.LazyFunction === options.compile) {
        agent = CreateLazyFunctionConstructorInterceptor<T>(target, options)
      }
      else if (AgentCompileType.LazyClass === options.compile) {
        agent = CreateLazyClassConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.LazyProxy === options.compile) {
        agent = CreateLazyProxyConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.StaticFunction === options.compile) {
        agent = CreateStaticFunctionConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.StaticClass === options.compile) {
        agent = CreateStaticClassConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.StaticProxy === options.compile) {
        agent = CreateStaticProxyConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.DynamicFunction === options.compile) {
        agent = CreateDynamicFunctionConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.DynamicClass === options.compile) {
        agent = CreateDynamicClassConstructorInterceptor<T>(target, options);
      }
      else if (AgentCompileType.DynamicProxy === options.compile) {
        agent = CreateDynamicProxyConstructorInterceptor<T>(target, options);
      }
      else {
        throw new Error(`Not supported agent build type: ${options.compile} on type ${target.prototype.constructor.name}`);
      }
      
      // register this agent with domain
      // domain.register(target, agent);
      
      // this property can not be changed.
      Object.defineProperty(agent, ORIGIN_CONSTRUCTOR, {
        configurable: false,
        enumerable: false,
        value: target,
        writable: false
      });
      
      return agent;
      
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
      Reflector(target).addAttribute(attribute);
    }
  }
}


/**
 * Decorate class properties (field, getter, setter and methods)
 */
export function decorateClassMember(attribute: IAttribute) {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    if (CanDecorate(attribute, target, propertyKey, descriptor)) {
      Reflector(target).property(propertyKey, descriptor).addAttribute(attribute);
    }
  }
}

/**
 * Decorate class method
 */
export function decorateClassMethod(attribute: IAttribute): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    if (CanDecorate(attribute, target, propertyKey, descriptor)) {
      Reflector(target).property(propertyKey, descriptor).value().addAttribute(attribute);
    }
  }
}

/**
 * Decorate class field
 */
export function decorateClassField(attribute: IAttribute): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
    // TypeScript is not smart enough to identify the PropertyDescriptor on method
    if (descriptor) {
      throw new TypeError(`${Reflect.getPrototypeOf(attribute).constructor.name} can only decorate on class field property`);
    }
    if (CanDecorate(attribute, target, propertyKey)) {
      Reflector(target).property(propertyKey).value().addAttribute(attribute);
    }
  }
}

/**
 * Decorate class method parameter
 */
export function decorateParameter(attribute?: IAttribute): ParameterDecorator {
  attribute = attribute || {};
  return (target: Object, propertyKey: string | symbol, parameterIndex: number): void => {
    if (CanDecorate(attribute, target, propertyKey)) {
      Reflector(target).property(propertyKey).value().parameters(parameterIndex).addAttribute(attribute);
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
