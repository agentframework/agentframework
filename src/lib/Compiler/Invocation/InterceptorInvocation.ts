import { IInvocation } from '../../Core/IInvocation';
import { IInterceptor } from '../../Core/IInterceptor';

/**
 * Invocation for an interceptor, it call next interceptor in chain
 * @ignore
 * @hidden
 */
export class InterceptorInvocation implements IInvocation {
  constructor(private _invocation: IInvocation, private _interceptor: IInterceptor) {}

  get design(): any {
    return this._invocation.design;
  }

  get target(): any {
    return this._invocation.target;
  }

  set target(value: any) {
    this._invocation.target = value;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._interceptor.intercept(this._invocation, parameters);
  }
}
