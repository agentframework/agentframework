import { IInvocation, ConstructInvocation, IInvoke, GetterInvocation, SetterInvocation } from './invocation';
import { IAttribute } from './attribute';
import { createInvocationChainFromAttribute } from './chain';
import { AgentOptions } from './decorator';

const ORIGIN = Symbol('agent.framework.origin.method');

export interface IInterceptor {
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any;
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
    return createInvocationChainFromAttribute(invocation, attributes);
  }
  
  
  public static createGetterInterceptor(attributes: Array<IAttribute>,
                                        target: any,
                                        propertyKey: PropertyKey,
                                        receiver: any): IInvocation {
    const invocation = new GetterInvocation(target, propertyKey, receiver);
    return createInvocationChainFromAttribute(invocation, attributes);
  }
  
  public static createSetterInterceptor(attributes: Array<IAttribute>,
                                        target: any,
                                        propertyKey: PropertyKey,
                                        receiver: any) {
    const invocation = new SetterInvocation(target, propertyKey, receiver);
    return createInvocationChainFromAttribute(invocation, attributes);
  }
  
  public static createFunctionInterceptor(attributes: Array<IAttribute>, method: IInvoke) {
    const originMethod = method[ORIGIN] || method;
    const origin: IInvocation = {
      invoke: function (parameters: ArrayLike<any>) {
        return Reflect.apply(originMethod, this.target, parameters);
      },
      method: originMethod
    };
    
    const chain = createInvocationChainFromAttribute(origin, attributes);
    const upgradedMethod = function () {
      origin.target = this;
      return chain.invoke(arguments);
    };
    upgradedMethod[ORIGIN] = originMethod;
    return upgradedMethod;
  }
  
}
