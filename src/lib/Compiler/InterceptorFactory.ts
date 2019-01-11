import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { GetInterceptor } from './Internal/Utils';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { ConstructInvocation } from './Invocation/ConstructInvocation';
import { Arguments } from '../Core/Arguments';
import { Reflector } from '../Core/Reflector';
import { MethodInvocation, ParameterizedMethodInvocation } from './Invocation/FunctionInvocation';

/**
 * @ignore
 * @hidden
 */
export class InterceptorFactory {
  static createConstructor<T>(target: T, newTarget: T, params: Arguments, id: any) {
    // search all attributes on this class constructor
    const invocation = new ConstructInvocation(target, newTarget, params, id);
    const interceptors = Reflector(target).getInterceptors();
    return InterceptorFactory.chainInterceptorAttributes(invocation, interceptors);
  }

  static createFunction(
    attributes: Array<IAttribute>,
    method: Function,
    design: any,
    params?: Map<number, IInvocation>
  ): Function {
    let origin: IInvocation;
    if (params && params.size) {
      origin = new ParameterizedMethodInvocation(method, design, params);
    } else {
      origin = new MethodInvocation(method, design);
    }
    const chain = InterceptorFactory.chainInterceptorAttributes(origin, attributes);
    if (chain instanceof InterceptorInvocation || (params && params.size)) {
      return Function('c', 'return function(){return c.target=this,c.invoke(arguments)}')(chain);
    } else {
      // no interceptor found
      return method;
    }
  }

  /**
   * @ignore
   * @hidden
   */
  static chainInterceptorAttributes(origin: IInvocation, attributes: Array<IAttribute>): IInvocation {
    // make invocation chain of interceptors
    for (const attribute of attributes) {
      const interceptor = GetInterceptor(attribute);
      if (interceptor) {
        origin = new InterceptorInvocation(origin, interceptor);
      }
    }
    return origin;
  }
}
