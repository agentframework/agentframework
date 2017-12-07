import { Reflection } from '../reflection';
import { INTERCEPTED_CONSTRUCTOR, PROXY_PROTOTYPE } from '../utils';
import { AgentOptions } from '../decorator';
import { InterceptorFactory } from './factory';

export interface Constructor extends Function {
  new (...params: Array<any>): any;
}

//region CreateLazyFunctionConstructorInterceptor
/**
 * Create lazy constructor using function
 */
export function CreateLazyFunctionConstructorInterceptor<T extends Function>(target: T, options: Partial<AgentOptions>): any {
  
  const AgentProxy = function () {
    
    const proto = target.prototype;

    let interceptedConstructor = proto[INTERCEPTED_CONSTRUCTOR];
  
    if (!interceptedConstructor) {
      
      const originConstructor = proto.constructor;
      
      // search all attributes on this class constructor
      const customAttributes = Reflection.getAttributes(originConstructor);
      
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
  // assignProperties(target, AgentProxy);
  AgentProxy.prototype = target.prototype;
  
  return AgentProxy;
}
//endregion

//region CreateLazyClassConstructorInterceptor
/**
 * Create lazy constructor using class
 */
export function CreateLazyClassConstructorInterceptor<T extends Function>(target: Constructor, options: Partial<AgentOptions>): any {
  
  return class extends target {
    
    constructor() {
      
      // do not call super constructor since we don't access this from this method
      if (0) {
        super();
      }
      
      const proto = target.prototype;
      
      let interceptedConstructor = proto[INTERCEPTED_CONSTRUCTOR];
      
      if (!interceptedConstructor) {
        
        const originConstructor = proto.constructor;
        
        // search all attributes on this class constructor
        const customAttributes = Reflection.getAttributes(originConstructor);
        
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
  }
  
}
//endregion

//region CreateLazyProxyConstructorInterceptor
/**
 * Create lazy constructor using proxy (es6)
 */
export function CreateLazyProxyConstructorInterceptor<T extends Function>(target: T, options: Partial<AgentOptions>): T {
  
  const typeProxyHandler = {
    
    construct: (target: T, parameters: any, receiver: T): object => {
      
      const proto = target.prototype;
      
      let interceptedConstructor = proto[INTERCEPTED_CONSTRUCTOR];
      
      if (!interceptedConstructor) {
        
        const originConstructor = proto.constructor;
        
        // search all attributes on this class constructor
        const customAttributes = Reflection.getAttributes(originConstructor);
        
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
//endregion

//region CreateStaticClassConstructorInterceptor
/**
 * Create static constructor using class
 */
export function CreateStaticClassConstructorInterceptor<T extends Function>(target: Constructor, options: Partial<AgentOptions>): any {
  
  const proto = target.prototype;
  const originConstructor = proto.constructor;
  
  // search all attributes on this class constructor
  const customAttributes = Reflection.getAttributes(originConstructor);
  
  // create a interceptor chain from the found attributes
  const interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options);
  
  return class extends target {
    
    constructor() {
      
      // do not call super constructor since we don't access this from this method
      if (0) {
        super();
      }
  
      // invoke the cached chain
      const createdAgent = interceptedConstructor.invoke(arguments);
  
      // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);
  
      // return the new created instance
      return createdAgent;
      
    }
    
  }
  
}
//endregion

//region CreateStaticFunctionConstructorInterceptor
/**
 * Create static constructor using function
 */
export function CreateStaticFunctionConstructorInterceptor<T extends Function>(target: T, options: Partial<AgentOptions>): any {
  
  const proto = target.prototype;
  const originConstructor = proto.constructor;
  
  // search all attributes on this class constructor
  const customAttributes = Reflection.getAttributes(originConstructor);
  
  // create a interceptor chain from the found attributes
  const interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options);
  
  //
  const AgentProxy = function () {
    
    // invoke the cached chain
    const createdAgent = interceptedConstructor.invoke(arguments);
    
    // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);
    
    // return the new created instance
    return createdAgent;
    
  };
  
  // this is the only place we can modify the proxy target
  // assignProperties(target, AgentProxy);
  AgentProxy.prototype = target.prototype;
  
  return AgentProxy;
}
//endregion

//region CreateStaticProxyConstructorInterceptor
/**
 * Create static constructor using proxy (es6)
 */
export function CreateStaticProxyConstructorInterceptor<T extends Function>(target: T, options: Partial<AgentOptions>): T {
  
  const proto = target.prototype;
  const originConstructor = proto.constructor;
  
  // search all attributes on this class constructor
  const customAttributes = Reflection.getAttributes(originConstructor);
  
  // create a interceptor chain from the found attributes
  const interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options);
  
  
  const typeProxyHandler = {
    
    construct: (target: T, parameters: any, receiver: T): object => {
      
      // invoke the cached chain
      const createdAgent = interceptedConstructor.invoke(arguments);
      
      // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);
      
      // return the new created instance
      return createdAgent;
      
    }
    
  };
  
  return new Proxy(target, typeProxyHandler);
  
}
//endregion

//region CreateDynamicClassConstructorInterceptor
/**
 * Create dynamic constructor using class
 */
export function CreateDynamicClassConstructorInterceptor<T extends Function>(target: Constructor, options: Partial<AgentOptions>): any {
  
  return class extends target {
    
    constructor() {
      
      // do not call super constructor since we don't access this from this method
      if (0) {
        super();
      }
  
      const proto = target.prototype;
      const originConstructor = proto.constructor;
  
      // search all attributes on this class constructor
      const customAttributes = Reflection.getAttributes(originConstructor);
  
      // create a interceptor chain from the found attributes
      const interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options);
  
      // invoke the cached chain
      const createdAgent = interceptedConstructor.invoke(arguments);
      
      // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);
      
      // return the new created instance
      return createdAgent;
      
    }
    
  }
  
}
//endregion

//region CreateDynamicFunctionConstructorInterceptor
/**
 * Create dynamic constructor using function
 */
export function CreateDynamicFunctionConstructorInterceptor<T extends Function>(target: T, options: Partial<AgentOptions>): any {
  
  //
  const AgentProxy = function () {
  
    const proto = target.prototype;
    const originConstructor = proto.constructor;
  
    // search all attributes on this class constructor
    const customAttributes = Reflection.getAttributes(originConstructor);
  
    // create a interceptor chain from the found attributes
    const interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options);
  
    // invoke the cached chain
    const createdAgent = interceptedConstructor.invoke(arguments);
    
    // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);
    
    // return the new created instance
    return createdAgent;
    
  };
  
  // this is the only place we can modify the proxy target
  // assignProperties(target, AgentProxy);
  AgentProxy.prototype = target.prototype;
  
  return AgentProxy;
}
//endregion

//region CreateDynamicProxyConstructorInterceptor
/**
 * Create dynamic constructor using proxy (es6)
 */
export function CreateDynamicProxyConstructorInterceptor<T extends Function>(target: T, options: Partial<AgentOptions>): T {
  
  const typeProxyHandler = {
    
    construct: (target: T, parameters: any, receiver: T): object => {
  
      const proto = target.prototype;
      const originConstructor = proto.constructor;
  
      // search all attributes on this class constructor
      const customAttributes = Reflection.getAttributes(originConstructor);
  
      // create a interceptor chain from the found attributes
      const interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options);
  
      // invoke the cached chain
      const createdAgent = interceptedConstructor.invoke(arguments);
      
      // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);
      
      // return the new created instance
      return createdAgent;
      
    }
    
  };
  
  return new Proxy(target, typeProxyHandler);
  
}
//endregion
