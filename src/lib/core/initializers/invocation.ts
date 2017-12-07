import { IInvocation } from '../invocation';
import { IInitializer } from '../initializer';

export class ValueInitializerInvocation implements IInvocation {
  
  constructor(private _target: any, private _propertyKey: PropertyKey) {
  }
  
  get target(): any {
    return this._target;
  }
  
  invoke(parameters: ArrayLike<any>): any {
    return this._target.prototype[this._propertyKey];
  }
  
}

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
