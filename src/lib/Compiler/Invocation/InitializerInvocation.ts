import { IInvocation } from '../../Core/IInvocation';
import { IInitializer } from '../../Core/IInitializer';

/**
 * Invocation for an initializer
 * @ignore
 * @hidden
 */
export class InitializerInvocation implements IInvocation {
  constructor(private _invocation: IInvocation, private _initializer: IInitializer) {}

  get design(): any {
    return this._invocation.design;
  }

  get target(): any {
    return this._invocation.target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._initializer.initialize(this._invocation, parameters);
  }
}
