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
