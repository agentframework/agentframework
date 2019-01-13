import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { DirectConstructInvocation, InterceptedConstructInvocation } from './Invocation/ConstructInvocation';
import { Arguments } from './Arguments';
import { DirectMethodInvocation, InterceptedMethodInvocation } from './Invocation/MethodInvocations';
import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { Reflector } from '../Reflection/Reflector';
import { Method } from '../Reflection/Method';
import { Property } from '../Reflection/Property';

/**
 * @ignore
 * @hidden
 */
export class InterceptorFactory {
  static createConstructor<C extends Function>(newTarget: C, args: ArrayLike<any>, target: C, params: Arguments) {
    // search all attributes on this class constructor
    const design = Reflector(target);
    let invocation;
    if (design.isParametersAvailable()) {
      invocation = new InterceptedConstructInvocation(newTarget, args, target, params, design);
    } else {
      invocation = new DirectConstructInvocation(newTarget, args, target, params, design);
    }
    const interceptors = design.getInterceptors();
    return InterceptorFactory.chainInterceptorAttributes(invocation, interceptors);
  }

  static createFunction<T>(
    attributes: Array<IAttribute>,
    target: Function,
    method: Function,
    design: Method<Property>,
    params?: Map<number, IInvocation>
  ): Function {
    let origin: IInvocation, factory: Function;
    if (params && params.size) {
      origin = new InterceptedMethodInvocation(target, method, design, params);
      factory = new Function('c', 'o', `return function ${method.name}(){return c.target=this,c.invoke(arguments)}`);
    } else {
      origin = new DirectMethodInvocation(target, method, design);
      factory = new Function('c', 'o', `return function(){return c.target=this,c.invoke(arguments)}`);
    }
    const chain = InterceptorFactory.chainInterceptorAttributes(origin, attributes);
    if (chain instanceof DirectMethodInvocation) {
      // do nothing
      return method;
    } else {
      return factory(chain, origin);
    }
  }

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
