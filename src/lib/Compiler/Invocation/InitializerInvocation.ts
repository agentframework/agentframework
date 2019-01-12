import { IInvocation } from '../../Core/IInvocation';
import { IInitializer } from '../../Core/IInitializer';

/**
 * @ignore
 * @hidden
 */
export class InitializerInvocation implements IInvocation {
  constructor(private _invocation: IInvocation, private _initializer: IInitializer) {}

  get design(): any {
    return this._invocation.design;
  }

  get target(): Function {
    return this._invocation.target;
  }
  
  set target(newTarget: Function) {
    this._invocation.target = newTarget;
  }
  
  invoke(parameters: ArrayLike<any>): any {
    return this._initializer.initialize(this._invocation, parameters);
  }
}
