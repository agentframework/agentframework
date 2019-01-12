import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { ConstructInvocation } from './Invocation/ConstructInvocation';
import { Arguments } from '../Core/Arguments';
import { Reflector } from '../Core/Reflector';
import { MethodInvocation, ParameterizedMethodInvocation } from './Invocation/FunctionInvocation';
import { Constructor } from '../Core/Constructor';

/**
 * @ignore
 * @hidden
 */
export class InterceptorFactory {
  static createConstructor<T>(
    newTarget: Constructor<T>,
    args: ArrayLike<any>,
    target: Constructor<T>,
    params: Arguments
  ) {
    // search all attributes on this class constructor
    const invocation = new ConstructInvocation(newTarget, args, target, params);
    const interceptors = Reflector(target).getInterceptors();
    return InterceptorFactory.chainInterceptorAttributes(invocation, interceptors);
  }

  static createFunction<T>(
    attributes: Array<IAttribute>,
    target: Constructor<T>,
    method: Function,
    design: any,
    params?: Map<number, IInvocation>
  ): Function {
    let origin: IInvocation, factory: Function;
    if (params && params.size) {
      origin = new ParameterizedMethodInvocation(target, method, design, params);
      factory = new Function('c', `return function ${method.name}(){return c.target=this,c.invoke(arguments)}`);
    } else {
      origin = new MethodInvocation(target, method, design);
      factory = new Function('c', `return function(){return c.target=this,c.invoke(arguments)}`);
    }
    const chain = InterceptorFactory.chainInterceptorAttributes(origin, attributes);
    if (chain instanceof MethodInvocation) {
      // do nothing
      return method;
    } else {
      return factory(chain);
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
