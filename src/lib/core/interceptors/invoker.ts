import { AgentOptions } from '../decorator';
import { AddProxyInterceptor } from './proxy';
import { ORIGIN_INSTANCE } from '../utils';
import { Constructor } from './construct';
import { IInvocation } from '../invocation';

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
  
  return function () {
  
  }
  
}

//endregion


//region CreatePreInterceptedInstanceInvoker
/**
 * Create instance with run field property interceptors before constructor
 */
export function CreateInitializedInstanceInvoker<T extends Constructor>(target: T, options: Partial<AgentOptions>): () => any {
  
  // reflections of the property which contains at least one attribute defined a getInterceptor interface
  return function () {
    
    const initializers: Map<string, IInvocation> = this.initializers;
    let agent;
    let bag;
    
    // invoke all initializers to generate default value bag
    if (initializers && initializers.size) {
      
      bag = new Map<string, PropertyDescriptor>();
      
      for (const [key, initializer] of initializers) {
        
        const initializedValue = (<IInvocation>initializer).invoke(arguments);
        
        if (initializedValue != null) {
          bag.set(key, {
            // true if and only if the value associated with the property may be changed (data descriptors only).
            writable: true,
            // true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
            configurable: true,
            // true if and only if this property shows up during enumeration of the properties on the corresponding object.
            enumerable: true,
            // The value associated with the property (data descriptors only).
            value: initializedValue
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
        DynamicAgent.prototype[key] = value.value;
      }
      
      agent = Reflect.construct(target, arguments, DynamicAgent);
      
      const applies = new Map<string, PropertyDescriptor>();
  
      // TODO: user called defineProperty on these types
      
      // save current value, in case user have modified it
      for (const [key, value] of bag) {
        if (!agent.hasOwnProperty(agent, key)) {
          applies.set(key, value);
        }
      }
      
      Object.setPrototypeOf(agent, target.prototype);
      
      for (const [key, value] of applies) {
        agent[key] = value.value;
      }
      
    }
    else {
      
      agent = Reflect.construct(target, arguments);
      
    }
    
    // check interceptors and do not add proxy if no interceptors
    if (!1) {
      return AddProxyInterceptor(agent);
    }
    else {
      return agent;
    }
    
  };
  
  
}

//endregion

