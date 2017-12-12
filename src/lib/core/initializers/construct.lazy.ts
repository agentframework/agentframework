import { IInitializer } from '../initializer';
import { INTERCEPTED_CONSTRUCTOR } from '../symbol';
import { Reflector } from '../reflector';
import { InterceptorFactory } from '../interceptors/factory';
import { AgentInitializerInvocation } from './invocation';
import { Constructor } from '../constructor';


//region LazyFunctionConstructorInitializer
/**
 * Create lazy agent constructor initializer using function
 */
export class LazyFunctionConstructorInitializer implements IInitializer {
  
  initialize(invocation: AgentInitializerInvocation, parameters: ArrayLike<any>): any {
  
    const target = invocation.target;
    const attribute = invocation.attribute;
    const options = invocation.attribute.options;
    
    const AgentProxy = function () {
      
      if (!new.target) {
        throw new TypeError(`Class constructor cannot be invoked without 'new'`);
      }
      
      const proto = new.target.prototype;
      
      let interceptedConstructor = proto[INTERCEPTED_CONSTRUCTOR];
      
      if (!interceptedConstructor) {
        
        const originConstructor = proto.constructor;
        
        // search all attributes on this class constructor
        const customAttributes = Reflector(originConstructor).getInterceptors();
        
        // create a interceptor chain from the found attributes
        interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options);
        
        // cache the interceptor
        // use symbol here to allow reset cache when needed
        Reflect.set(proto, INTERCEPTED_CONSTRUCTOR, interceptedConstructor);
        
      }
      
      // invoke the cached chain
      const createdAgent = interceptedConstructor.invoke(arguments);
      
      // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);
      
      // return the new created instance
      return createdAgent;
      
    };
    
    // this is the only place we can modify the proxy target
    
    // it's very important to have target.prototype here
    // since Reflector will use target.prototype as a key
    Object.defineProperty(AgentProxy, 'prototype', {
      value: target.prototype,
      writable:false,
      enumerable:false,
      configurable:false
    });
    
    return AgentProxy;
    
  }
  
}
//endregion

//region LazyClassConstructorInitializer
/**
 * Create lazy agent constructor initializer using class (es5)
 */
export class LazyClassConstructorInitializer implements IInitializer {
  
  initialize(invocation: AgentInitializerInvocation, parameters: ArrayLike<any>): any {
  
    const target = <Constructor><any>invocation.target;
    const attribute = invocation.attribute;
    const options = invocation.attribute.options;
  
    return class extends target {
    
      constructor() {
      
        // do not call super constructor since we don't access this from this method
        /* istanbul ignore if  */
        if (0) {
          super();
        }
        
        const proto = new.target.prototype.__proto__;
      
        let interceptedConstructor = proto[INTERCEPTED_CONSTRUCTOR];
      
        if (!interceptedConstructor) {
        
          const originConstructor = proto.constructor;
        
          // search all attributes on this class constructor
          const customAttributes = Reflector(originConstructor).getInterceptors();
        
          // create a interceptor chain from the found attributes
          interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options);
        
          // cache the interceptor
          // use symbol here to allow reset cache when needed
          Reflect.set(proto, INTERCEPTED_CONSTRUCTOR, interceptedConstructor);
        
        }
      
        // invoke the cached chain
        const createdAgent = interceptedConstructor.invoke(arguments);
      
        // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);
      
        // return the new created instance
        return createdAgent;
      
      }
      
    };
    
  }
  
}
//endregion

//region LazyProxyConstructorInitializer
/**
 * Create lazy agent constructor initializer using proxy (es6)
 */
export class LazyProxyConstructorInitializer implements IInitializer {
  
  initialize(invocation: AgentInitializerInvocation, parameters: ArrayLike<any>): any {
    
    const target = <Constructor><any>invocation.target;
    const attribute = invocation.attribute;
    const options = invocation.attribute.options;
  
    const typeProxyHandler = {
    
      construct: (target: any, parameters: any, receiver: any): object => {
      
        const proto = target.prototype;
      
        let interceptedConstructor = proto[INTERCEPTED_CONSTRUCTOR];
      
        if (!interceptedConstructor) {
        
          const originConstructor = proto.constructor;
        
          // search all attributes on this class constructor
          const customAttributes = Reflector(originConstructor).getInterceptors();
        
          // create a interceptor chain from the found attributes
          interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options);
        
          // cache the interceptor
          // use symbol here to allow reset cache when needed
          Reflect.set(proto, INTERCEPTED_CONSTRUCTOR, interceptedConstructor);
        
        }
      
        // invoke the cached chain
        const createdAgent = interceptedConstructor.invoke(arguments);
      
      
        // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);
      
        // return the new created instance
        return createdAgent;
      
      }
    
    };
  
    return new Proxy(target, typeProxyHandler);
    
  }
  
}
//endregion
