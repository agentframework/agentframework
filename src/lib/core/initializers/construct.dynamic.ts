import { IInitializer } from '../initializer';
import { AgentInitializerInvocation } from './invocation';
import { Reflector } from '../reflector';
import { InterceptorFactory } from '../interceptors/factory';
import { Constructor } from '../constructor';


//region DynamicFunctionConstructorInitializer

/**
 * Create dynamic agent constructor initializer using function
 */
export class DynamicFunctionConstructorInitializer implements IInitializer {

  initialize(invocation: AgentInitializerInvocation, parameters: ArrayLike<any>): any {

    const target = invocation.target;
    const attribute = invocation.attribute;
    const options = invocation.attribute.options;

    const AgentProxy = function () {

      if (!new.target) {
        throw new TypeError(`Class constructor cannot be invoked without 'new'`);
      }

      const proto = new.target.prototype;
      const originConstructor = proto.constructor;

      // search all attributes on this class constructor
      const reflection = Reflector(originConstructor);
      const customAttributes = reflection.getInterceptors();

      // create a interceptor chain from the found attributes
      const interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options, reflection);

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
//endregion

//region DynamicClassConstructorInitializer

/**
 * Create dynamic agent constructor initializer using class (es5)
 */
export class DynamicClassConstructorInitializer implements IInitializer {

  initialize(invocation: AgentInitializerInvocation, parameters: ArrayLike<any>): any {

    const target = invocation.target as Constructor;
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
        const originConstructor = proto.constructor;

        // search all attributes on this class constructor
  
        const reflection = Reflector(originConstructor);
        const customAttributes = reflection.getInterceptors();

        // create a interceptor chain from the found attributes
        const interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options, reflection);

        // invoke the cached chain
        const createdAgent = interceptedConstructor.invoke(arguments);

        // Reflect.set(createdAgent, PROXY_PROTOTYPE, proto);

        // return the new created instance
        return createdAgent;

      }

    }

  }

}
//endregion

//region DynamicProxyConstructorInitializer

/**
 * Create dynamic agent constructor initializer using proxy (es6)
 */
export class DynamicProxyConstructorInitializer implements IInitializer {

  initialize(invocation: AgentInitializerInvocation, parameters: ArrayLike<any>): any {

    const target = invocation.target;
    const attribute = invocation.attribute;
    const options = invocation.attribute.options;

    const typeProxyHandler = {

      construct: (target: any, parameters: any, receiver: any): object => {

        const proto = target.prototype;
        const originConstructor = proto.constructor;

        // search all attributes on this class constructor
        const reflection = Reflector(originConstructor);
        const customAttributes = reflection.getInterceptors();

        // create a interceptor chain from the found attributes
        const interceptedConstructor = InterceptorFactory.createConstructInterceptor(customAttributes, originConstructor, options, reflection);

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
