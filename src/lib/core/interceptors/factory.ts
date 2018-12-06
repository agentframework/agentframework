import { GetInterceptor, IAttribute } from '../attribute';
import { IInvocation } from '../invocation';
import { InterceptorInvocation } from './interceptorInvocation';

// const ORIGIN = Symbol('agent.framework.origin.method');
/**
 * @ignore
 * @hidden
 * @param {IInvocation} origin
 * @param {Array<IAttribute>} attributes
 * @returns {IInvocation}
 */
export function createInterceptionChainFromAttribute(origin: IInvocation, attributes: Array<IAttribute>): IInvocation {

  let invocation: IInvocation = origin;

  // make invocation chain of interceptors
  for (const attribute of attributes) {
    const interceptor = GetInterceptor(attribute);
    if (interceptor) {
      invocation = new InterceptorInvocation(invocation, interceptor);
    }
  }

  return invocation;

}

// TODO: add cache to improve performance
// 1. create a hash based CacheMap
// 2. implement the hash for attributes/prototype/describer
