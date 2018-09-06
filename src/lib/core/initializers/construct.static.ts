import { IInitializer } from '../initializer';
import { AgentInitializerInvocation } from './invocation';
import { Reflector } from '../reflector';
import { InterceptorFactory } from '../interceptors/factory';
import { Constructor } from '../constructor';

// region StaticFunctionConstructorInitializer

/**
 * Create static agent constructor initializer using function
 * @ignore
 * @hidden
 */
export class StaticFunctionConstructorInitializer implements IInitializer {
  initialize(invocation: AgentInitializerInvocation, parameters: ArrayLike<any>): any {
    const target = invocation.target;
    const attribute = invocation.attribute;
    const options = invocation.attribute.options;

    const proto = target.prototype;
    const originConstructor = proto.constructor;

    // search all attributes on this class constructor
    const reflection = Reflector(originConstructor);
    const customAttributes = reflection.getInterceptors();

    // create a interceptor chain from the found attributes
    const interceptedConstructor = InterceptorFactory.createConstructInterceptor(
      customAttributes,
      originConstructor,
      options,
      reflection
    );

    //
    const AgentProxy = function () {
      if (!new.target) {
        throw new TypeError(`Class constructor cannot be invoked without 'new'`);
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
}

// endregion

// region StaticClassConstructorInitializer

/**
 * Create static agent constructor initializer using class (es5)
 * @ignore
 * @hidden
 */
export class StaticClassConstructorInitializer implements IInitializer {
  initialize(invocation: AgentInitializerInvocation, parameters: ArrayLike<any>): any {
    const target = invocation.target as Constructor;
    const attribute = invocation.attribute;
    const options = invocation.attribute.options;

    const proto = target.prototype;
    const originConstructor = proto.constructor;

    // search all attributes on this class constructor
    const reflection = Reflector(originConstructor);
    const customAttributes = reflection.getInterceptors();

    // create a interceptor chain from the found attributes
    const interceptedConstructor = InterceptorFactory.createConstructInterceptor(
      customAttributes,
      originConstructor,
      options,
      reflection
    );

    return class extends target {
      constructor() {
        // do not call super constructor since we don't access this from this method
        /* istanbul ignore if  */
        if (0) {
          super();
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

// endregion

// region StaticProxyConstructorInitializer

/**
 * Create static agent constructor initializer using proxy (es6)
 * @ignore
 * @hidden
 */
export class StaticProxyConstructorInitializer implements IInitializer {
  initialize(invocation: AgentInitializerInvocation, parameters: ArrayLike<any>): any {
    const target = invocation.target;
    const attribute = invocation.attribute;
    const options = invocation.attribute.options;

    const proto = target.prototype;
    const originConstructor = proto.constructor;

    // search all attributes on this class constructor
    const reflection = Reflector(originConstructor);
    const customAttributes = reflection.getInterceptors();

    // create a interceptor chain from the found attributes
    const interceptedConstructor = InterceptorFactory.createConstructInterceptor(
      customAttributes,
      originConstructor,
      options,
      reflection
    );

    const typeProxyHandler = {
      construct: (target: any, parameters: any, receiver: any): object => {
        // invoke the cached chain
        const createdAgent = interceptedConstructor.invoke(arguments);

        // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);

        // return the new created instance
        return createdAgent;
      }
    };

    const AgentProxy = new Proxy(target, typeProxyHandler);

    // copy static methods & symbols
    for (const sym of Object.getOwnPropertySymbols(target)) {
      Reflect.set(AgentProxy, sym, target[sym]);
    }
    for (const key of Object.getOwnPropertyNames(target)) {
      if (key !== 'prototype' && key !== 'length' && key !== 'name') {
        Reflect.set(AgentProxy, key, target[key]);
      }
    }

    return AgentProxy;
  }
}

// endregion
