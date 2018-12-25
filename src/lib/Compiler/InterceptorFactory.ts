import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { GetInterceptor } from './Internal/Utils';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { ConstructInvocation } from './Invocation/ConstructInvocation';
import { AgentAttribute } from '../Core/AgentAttribute';
import { Arguments } from '../Core/Arguments';
import { Reflector } from '../Core/Reflector';

/**
 * @ignore
 * @hidden
 */
export class InterceptorFactory {
  static createConstructor<T>(target: T, newTarget: T, options: AgentAttribute, params: Arguments) {
    // search all attributes on this class constructor
    const invocation = new ConstructInvocation(target, newTarget, options, params);
    const interceptors = Reflector(target).getInterceptors();
    return InterceptorFactory.chainInterceptorAttributes(invocation, interceptors);
  }

  static createFunction(
    attributes: Array<IAttribute>,
    method: Function,
    parameters?: Map<number, IInvocation>
  ): Function {
    const originMethod = method; // method[ORIGIN] || method;

    let origin: IInvocation;
    if (parameters && parameters.size) {
      origin = {
        invoke: function(params: ArrayLike<any>) {
          const args = Array.prototype.slice.call(params, 0);
          for (const idx of parameters.keys()) {
            const param = parameters.get(idx);
            if (param) {
              args[idx] = param.invoke([params[idx]]);
            }
          }
          return Reflect.apply(originMethod, this.target, args);
        }
      };
    } else {
      origin = {
        invoke: function(parameters: ArrayLike<any>) {
          return Reflect.apply(originMethod, this.target, parameters);
        }
      };
    }

    const chain = InterceptorFactory.chainInterceptorAttributes(origin, attributes);

    if (chain instanceof InterceptorInvocation || parameters) {
      return Function('c', 'return function(){return c.target=this,c.invoke(arguments)}')(chain);
    } else {
      return originMethod;
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
