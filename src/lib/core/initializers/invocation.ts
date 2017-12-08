import { IInvocation } from '../invocation';
import { IInitializer } from '../initializer';

/**
 * Read the property from origin prototype
 */
export class ValueInvocation implements IInvocation {

  constructor(private _target: any, private _propertyKey: PropertyKey) {
  }

  get target(): any {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._propertyKey;
  }

}

/**
 * Invocation for an initializer
 */
export class InitializerInvocation implements IInvocation {

  constructor(private _invocation: IInvocation, private _initializer: IInitializer) {
  }

  get target(): any {
    return this._invocation.target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return this._initializer.initialize(this._invocation, parameters);
  }

}
