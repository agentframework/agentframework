import { IInvocation } from './invocation';
import { IAttribute, GetInterceptor } from './attribute';
import { IInterceptor } from './interceptor';


export function createInvocationChainFromAttribute(origin: IInvocation, attributes: Array<IAttribute>): IInvocation {

  let invocation: IInvocation = origin;

  // make invocation chain of interceptors
  for(const attribute of attributes) {
    const interceptor = GetInterceptor(attribute);
    if (interceptor) {
      invocation = new InceptionInvocation(invocation, interceptor);
    }
  }

  return invocation;
  
}


/**
 * InceptionInvocation will call next interceptor in the chain
 */
export class InceptionInvocation implements IInvocation {

  constructor(private _invocation: IInvocation, private _interceptor: IInterceptor) {
  }

  get target(): any {
    return this._invocation.target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._interceptor.intercept(this._invocation, parameters);
  }

}

