import { Reflection } from './reflection';
import { AgentInterceptorType, AgentOptions } from './decorator';
import {
  CreatePlainInstanceInvoker,
  CreatePostInterceptedInstanceInvoker,
  CreatePreInterceptedInstanceInvoker
} from './invoker';


export interface IInvoke {
  (parameters: ArrayLike<any>): any
}

export interface IInvocation {
  target?: any;
  method?: IInvoke;
  
  invoke(parameters: ArrayLike<any>): any;
}

export class ConstructInvocation implements IInvocation {
  
  constructor(private _target: any, private _options: Partial<AgentOptions>) {
    if (AgentInterceptorType.BeforeConstructor === _options.intercept) {
      // user defined interceptors will run before constructor
      this.invoke = CreatePreInterceptedInstanceInvoker(this._target, this._options);
    }
    else if (AgentInterceptorType.AfterConstructor === _options.intercept) {
      // user defined interceptors will run after constructor
      this.invoke = CreatePostInterceptedInstanceInvoker(this._target, this._options);
    }
    else if (AgentInterceptorType.Disable === _options.intercept) {
      // user defined interceptors will be disabled, this is good for metadata only class
      this.invoke = CreatePlainInstanceInvoker(this._target, this._options);
    }
    else {
      this.invoke = function () {
        throw new TypeError(`Unsupported AgentInjectType ${this._options.intercept} on class ${this._target.prototype.constructor.name}`)
      };
    }
  }
  
  get target(): any {
    return this._target;
  }
  
  /**
   * Run property interceptor if have
   */
  invoke() {
    throw new TypeError(`Unsupported AgentInjectType ${this._options.intercept} on class ${this._target.prototype.constructor.name}`)
  };
  
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

export class ValueInvocation implements IInvocation {
  
  constructor(private _target: any, private _propertyKey: PropertyKey) {
  }
  
  get target(): any {
    return this._target;
  }
  
  invoke(parameters: ArrayLike<any>): any {
    if (!this._target) {
      return this._target;
    }
    return this._target[this._propertyKey];
  }
  
}
