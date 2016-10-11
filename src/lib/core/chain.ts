import { IInvocation } from './invocation';
import { IAttribute } from './attribute';
import { IInterceptor } from './interceptor';

export function createInvocationChainFromAttribute(origin: IInvocation, attributes: Array<IAttribute>) {
  
  let invocation: IInvocation = origin;
  
  // make invocation chain of interceptors
  attributes.forEach(function (attribute) {
    const interceptor = attribute.getInterceptor();
    invocation = new InceptionInvocation(invocation, interceptor);
  });
  
  return invocation;
  
}


/**
 * InceptionInvocation will call next interceptor in the chain
 */
class InceptionInvocation implements IInvocation {
  
  constructor(private _invocation: IInvocation, private _interceptor: IInterceptor) {
  }
  
  get target(): any {
    return this._invocation.target;
  }
  
  invoke(parameters: ArrayLike<any>): any {
    return this._interceptor.intercept(this._invocation, parameters);
  }
  
}
