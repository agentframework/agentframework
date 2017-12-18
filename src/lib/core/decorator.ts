import { CanDecorate, IAgentAttribute, IAttribute } from './attribute';
import { Reflector } from './reflector';
import { ORIGIN_CONSTRUCTOR } from './symbol';
import { AgentInitializerInvocation, InitializerInvocation } from './initializers/invocation';
import { InterceptorInvocation } from './interceptors/invocation';
import { IInvocation } from './invocation';

export enum Target {
  Constructor          = 1,
  ConstructorParameter = 2,
  Field                = 4,
  Method               = 8,
  MethodParameter      = 16,
  Getter               = 32,
  Setter               = 64
}

/**
 * This is universal decorator for all supported target
 */
export type UniversalDecorator = <T extends Function>(target: Object | T, propertyKey?: string | symbol, descriptor?: PropertyDescriptor | number) => void;

/**
 * Decorate an agent with customized initializer, interceptors and attributes
 * @param {IAgentAttribute} initializer
 * @param {IAttribute[]} interceptors
 * @param {IAttribute[]} attributes
 * @returns {ClassDecorator}
 */
export function decorateAgent(initializer: IAgentAttribute, interceptors?: IAttribute[], attributes?: IAttribute[]): ClassDecorator {
  
  // upgrade target constructor to agent
  // this method will be called
  return <T extends Function>(target: T): void => {
    
    // the attributes to initialize agent instance
    if (attributes && attributes.length) {
      const reflection = Reflector(target);
      for (const attribute of attributes) {
        if (CanDecorate(attribute, target)) {
          reflection.addAttribute(attribute);
        }
      }
    }
    
    // the attributes to initialize agent constructor
    // current only support only one initializer, multiple interceptors
    if (CanDecorate(initializer, target)) {
      
      // start the pipeline
      let invocation: IInvocation = new AgentInitializerInvocation(target, initializer);
      invocation = new InitializerInvocation(invocation, initializer.getInitializer());
      
      // add interceptor into pipeline, if have
      if (initializer.getInterceptor) {
        invocation = new InterceptorInvocation(invocation, initializer.getInterceptor());
      }
      
      // extend pipeline from extra interceptors
      if (interceptors && interceptors.length) {
        for (const attribute of interceptors) {
          if (CanDecorate(attribute, target)) {
            const interceptor = attribute.getInterceptor();
            invocation = new InterceptorInvocation(invocation, interceptor);
          }
        }
      }
      
      // run this pipeline to generate a new constructor for this giving type
      return invocation.invoke(arguments);
    }
    
  }
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
      if (propertyKey == null) {
        // this is for constructor
        Reflector(target).parameters(parameterIndex).addAttribute(attribute);
      }
      else {
        // parameter for methods
        Reflector(target).property(propertyKey).value().parameters(parameterIndex).addAttribute(attribute);
      }
    }
  }
}


/**
 * Decorate attribute to the target
 */
export function decorate(attribute: IAttribute, allows: Target): UniversalDecorator {
  return <T extends Function>(target: Object | T, propertyKey: string | symbol, descriptor?: PropertyDescriptor | number): void => {
    
    const attributeName = Reflect.getPrototypeOf(attribute).constructor.name;
    const isClass = typeof target === 'function';
    const descriptorType = typeof descriptor;
    
    if (isClass) {
      
      if (descriptorType === 'number') {
        // this is constructor parameter
        if (Target.ConstructorParameter !== (allows & Target.ConstructorParameter)) {
          throw new TypeError(`${attributeName} is not allow decorate on constructor parameters`);
        }
      }
      else {
        // this is constructor
        if (Target.Constructor !== (allows & Target.Constructor)) {
          throw new TypeError(`${attributeName} is not allow decorate on class`);
        }
      }
      
    }
    else {
      if (descriptorType === 'number') {
        
        // this is constructor parameter
        if (Target.MethodParameter !== (allows & Target.MethodParameter)) {
          throw new TypeError(`${attributeName} is not allow decorate on method parameters`);
        }
        
      }
      else if (descriptorType === 'object') {
        
        if (descriptor['value']) {
          
          if (typeof descriptor['value'] === 'function') {
            
            // this is method
            if (Target.Method !== (allows & Target.Method)) {
              throw new TypeError(`${attributeName} is not allow decorate on method`);
            }
            
          }
          else {
            
            // this is field
            if (Target.Field !== (allows & Target.Field)) {
              throw new TypeError(`${attributeName} is not allow decorate on field`);
            }
            
          }
          
        }
        if (descriptor['get']) {
    
          // this is constructor parameter
          if (Target.Method !== (allows & Target.Getter)) {
            throw new TypeError(`${attributeName} is not allow decorate on getter`);
          }
    
        }
        if (descriptor['set']) {
    
          // this is constructor parameter
          if (Target.Method !== (allows & Target.Setter)) {
            throw new TypeError(`${attributeName} is not allow decorate on setter`);
          }
          
        }
      }
      else {
        
        // this is constructor
        if (Target.Field !== (allows & Target.Field)) {
          throw new TypeError(`${attributeName} is not allow decorate on field`);
        }
        
      }
    }
    
    if (CanDecorate(attribute, target, propertyKey)) {
      if (isClass) {
        if (descriptorType === 'number') {
          Reflector(target).parameters(<number>descriptor).addAttribute(attribute);
        }
        else {
          Reflector(target).addAttribute(attribute);
        }
      }
      else {
        if (descriptorType === 'number') {
          Reflector(target).property(propertyKey).value().parameters(<number>descriptor).addAttribute(attribute);
        }
        else if (descriptorType === 'object') {
          Reflector(target).property(propertyKey, <PropertyDescriptor>descriptor).value().addAttribute(attribute);
        }
        else {
          Reflector(target).property(propertyKey).value().addAttribute(attribute);
        }
      }
    }
  }
}
