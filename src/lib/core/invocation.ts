export interface IInvoke {
  (parameters: ArrayLike<any>): any
}

export interface IInvocation {
  target?: any;
  method?: IInvoke;
  invoke(parameters: ArrayLike<any>): any;
}

export class ConstructInvocation implements IInvocation {

  constructor(private _target: any, private _receiver: any) {
  }

  get target(): any {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return Reflect.construct(this._target, parameters, this._receiver);
  }

}

export class GetterInvocation implements IInvocation {

  constructor(private _target: any, private _propertyKey: PropertyKey, private _receiver: any) {
  }

  get target(): any {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return Reflect.get(this._target, this._propertyKey, this._receiver);
  }

}

export class SetterInvocation implements IInvocation {

  constructor(private _target: any, private _propertyKey: PropertyKey, private _receiver: any) {
  }

  get target(): any {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return Reflect.set(this._target, this._propertyKey, parameters[0], this._receiver);
  }

}
