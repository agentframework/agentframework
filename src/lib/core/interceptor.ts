import { IInvocation, ConstructInvocation, IInvoke } from './invocation';
import { IAttribute } from './attribute';
import { createInvocationChainFromAttribute } from './chain';

const ORIGIN = Symbol('agent.framework.origin.method');


export interface IInterceptor {
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any;
}

export class InterceptorFactory {
  
  public static createConstructInterceptor<T>(attributes: Array<IAttribute>,
                                              target: T,
                                              receiver: any): IInvocation {
    
    const invocation = new ConstructInvocation(target, receiver);
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
