import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';

/**
 * @ignore
 * @hidden
 */
export class InterceptorChainFactory {
  /**
   * @ignore
   * @hidden
   */
  static chainInterceptorAttributes(origin: IInvocation, attributes: Array<IAttribute>): IInvocation {
    // make invocation chain of interceptors
    for (const attribute of attributes) {
      const interceptor = attribute.interceptor;
      if (interceptor && 'function' === typeof interceptor.intercept) {
        origin = new InterceptorInvocation(origin, interceptor);
      }
    }
    return origin;
  }
}
