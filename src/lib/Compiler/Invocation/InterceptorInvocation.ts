import { IInvocation } from '../../Core/IInvocation';
import { IInterceptor } from '../../Core/IInterceptor';

/**
 * @ignore
 * @hidden
 */
export class InterceptorInvocation implements IInvocation {
  constructor(private _invocation: IInvocation, private _interceptor: IInterceptor) {}

  get design(): any {
    return this._invocation.design;
  }

  get target(): Function {
    return this._invocation.target;
  }
  
  invoke(parameters: ArrayLike<any>): any {
    return this._interceptor.intercept(this._invocation, parameters);
  }
}
