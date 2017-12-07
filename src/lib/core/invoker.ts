import { AgentOptions, getOriginConstructor } from './decorator';
import { AddProxyInterceptor } from './interceptors/proxy';
import { Reflection } from './reflection';
import { ORIGIN_INSTANCE } from './utils';
import { IAttribute } from './attribute';
import { Metadata } from './metadata';
import { Constructor } from './interceptors/construct';
import { InterceptorFactory } from './interceptor';
import { IInvocation } from './invocation';
import { InceptionInvocation } from './chain';
import { CreateMemberInterceptors } from './interceptors/prototype';

//region CreatePlainInstanceInvoker
/**
 * Create instance which disable all interceptors
 */
export function CreatePlainInstanceInvoker<T extends Function>(target: T, options: Partial<AgentOptions>): () => any {
  return function () {
    return Reflect.construct(target, arguments);
  };
}

//endregion


//region CreatePostInterceptedInstanceInvoker
/**
 * Create instance which run interceptors after constructor
 */
export function CreatePostInterceptedInstanceInvoker<T extends Function>(target: T, options: Partial<AgentOptions>): () => any {

  return function() {
  
  }
  
}

//endregion


//region CreatePreInterceptedInstanceInvoker
/**
 * Create instance with run field property interceptors before constructor
 */
export function CreatePreInterceptedInstanceInvoker<T extends Constructor>(target: T, options: Partial<AgentOptions>): () => any {
  
  // reflections of the property which contains at least one attribute defined a getInterceptor interface
  
  const interceptors = CreateMemberInterceptors(target);
  
  return function () {
    
    let fieldInterceptors: Map<string, IInvocation> = interceptors.fieldInterceptors;
    let methodInterceptors: Map<string, IInvocation> = interceptors.methodInterceptors;
    let agent;
    let bag;
  
    if (fieldInterceptors && fieldInterceptors.size) {
    
      bag = new Map<string, PropertyDescriptor>();
    
      // run all interceptors
      for (const [key, interceptor] of fieldInterceptors) {
        
        const interceptedValue = (<IInvocation>interceptor).invoke(arguments);
      
        if (interceptedValue != null) {
          bag.set(key, {
            // true if and only if the value associated with the property may be changed (data descriptors only).
            writable: true,
            // true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
            configurable: true,
            // true if and only if this property shows up during enumeration of the properties on the corresponding object.
            enumerable: true,
            // The value associated with the property (data descriptors only).
            value: interceptedValue
          });
        }
      
      }
    
    }
  
    // EPIC: inject the intercepted value before construct a new instance
    if (bag && bag.size) {
    
      // introduce DynamicAgent for interceptors
      // create transparent layer for property injector
      class DynamicAgent extends target {
      }
    
      for (const [key, value] of bag) {
        Reflect.defineProperty(DynamicAgent.prototype, key, value);
      }
    
      agent = Reflect.construct(target, arguments, DynamicAgent);
      
      Reflect.set(agent, ORIGIN_INSTANCE, Reflect.getPrototypeOf(agent));
    }
    else {
      
      agent = Reflect.construct(target, arguments);
      
    }
  
    // check interceptors and do not add proxy if no interceptors
    if (methodInterceptors && methodInterceptors.size) {
      return AddProxyInterceptor(agent);
    }
    else {
      return agent;
    }
    
  };
  
  
  
}

//endregion

