import { Reflection } from '../reflection';
import { InterceptorFactory } from '../interceptor';
import { IAttribute } from '../attribute';
import { INTERCEPTOR_CONSTRUCTOR } from '../utils';


/**
 * Create a proxied constructor (es6)
 * @param {Constructor} target
 * @param {Array<IAttribute>} attributes
 * @returns {Function}
 * @constructor
 */
export function AddConstructProxyInterceptor<Constructor extends Function>(target: Constructor, attributes?: Array<IAttribute>) {

  // MVP: Support multiple agent decoration on same class
  // if (customAttributes.length > 1) {
  //   throw new TypeError('Not Support Multiple Agent Decoration');
  // }

  // build a chain of constructors from decorated agent attributes
  // [ 1. User Defined, 2. User Defined, ... last. Origin Constructor ]
  // Pre-compile constructor interceptor to improve the performance

  const typeProxyHandler = {
    construct: (target: Function, parameters: any, receiver: any): object => {

      let chainedInterceptor;

      if (Reflect.has(target, INTERCEPTOR_CONSTRUCTOR)) {
        chainedInterceptor = Reflect.get(target, INTERCEPTOR_CONSTRUCTOR);
      }
      else {
        // search all attributes on this class constructor
        const customAttributes = attributes || Reflection.getAttributes(target);

        // create a interceptor chain from the found attributes
        chainedInterceptor = InterceptorFactory.createConstructInterceptor(customAttributes, target);

        // cache the chain for later use
        Reflect.set(target, INTERCEPTOR_CONSTRUCTOR, chainedInterceptor);
      }

      // invoke the cached chain
      const createdAgent = chainedInterceptor.invoke(parameters);
     
      // return the new created instance
      return createdAgent;

    }
  };

  return new Proxy(target, typeProxyHandler);
}
