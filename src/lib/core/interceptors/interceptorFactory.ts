// 3. replace InterceptorFactory with CachedInterceptorFactory
import { IAttribute } from '../attribute';
import { AgentOptions } from '../agent';
import { IDesign } from '../design';
import { IInvocation, IInvoke } from '../invocation';
import { ConstructInvocation } from './invocation';
import { InterceptorInvocation } from './interceptorInvocation';
import { createInterceptionChainFromAttribute } from './factory';

/**
 * @ignore
 * @hidden
 */
export class InterceptorFactory {
  
  
  public static createConstructInterceptor<T>(attributes: Array<IAttribute>,
                                              target: T,
                                              options: Partial<AgentOptions>,
                                              design: IDesign): IInvocation {
    const invocation = new ConstructInvocation(target, options, design);
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
