
import { GetInterceptor, IAttribute } from '../attribute';
import { AgentOptions } from '../decorator';
import { IInvocation, IInvoke } from '../invocation';
import { ConstructInvocation, InterceptorInvocation } from './invocation';

// const ORIGIN = Symbol('agent.framework.origin.method');

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
// 3. replace InterceptorFactory with CachedInterceptorFactory
export class InterceptorFactory {


  public static createConstructInterceptor<T>(attributes: Array<IAttribute>,
    target: T,
    options: Partial<AgentOptions>): IInvocation {
    const invocation = new ConstructInvocation(target, options);
    return createInterceptionChainFromAttribute(invocation, attributes);
  }


  // public static createGetterInterceptor(attributes: Array<IAttribute>,
  //   target: any,
  //   propertyKey: PropertyKey,
  //   receiver: any): IInvocation {
  //   const invocation = new GetterInvocation(target, propertyKey, receiver);
  //   return createInterceptionChainFromAttribute(invocation, attributes);
  // }
  //
  //
  // public static createSetterInterceptor(attributes: Array<IAttribute>,
  //   target: any,
  //   propertyKey: PropertyKey,
  //   receiver: any): IInvocation {
  //   const invocation = new SetterInvocation(target, propertyKey, receiver);
  //   return createInterceptionChainFromAttribute(invocation, attributes);
  // }


  public static createFunctionInterceptor(attributes: Array<IAttribute>, method: IInvoke): Function {
    const originMethod = method; // method[ORIGIN] || method;
    const origin: IInvocation = {
      invoke: function (parameters: ArrayLike<any>) {
        return Reflect.apply(originMethod, this.target, parameters);
      }
      // method: originMethod
    };
    const chain = createInterceptionChainFromAttribute(origin, attributes);
    if (chain instanceof InterceptorInvocation) {
      const upgradedMethod = function () {
        origin.target = this;
        return chain.invoke(arguments);
      };
      // upgradedMethod[ORIGIN] = originMethod;
      return upgradedMethod;
    }
    else {
      return originMethod;
    }

  }

}