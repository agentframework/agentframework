import { IInvocation } from '../invocation';
import { IInterceptor } from '../interceptor';

/**
 * Invocation for an interceptor, it call next interceptor in chain
 * @ignore
 * @hidden
 */
export class InterceptorInvocation implements IInvocation {

  constructor(private _invocation: IInvocation, private _interceptor: IInterceptor) {
  }

  get target(): any {
    return this._invocation.target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._interceptor.intercept(this._invocation, parameters);
  }

}
