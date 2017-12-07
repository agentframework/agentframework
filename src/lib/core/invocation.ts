import { Reflection } from './reflection';
import { AgentCompileType, AgentInterceptorType, AgentOptions } from './decorator';
import {
  CreatePlainInstanceInvoker,
  CreatePostInterceptedInstanceInvoker,
  CreateInitializedInstanceInvoker
} from './invoker';
import { CreatePropertyInitializers } from './interceptors/prototype';


export interface IInvoke {
  (parameters: ArrayLike<any>): any
}

export interface IInvocation {
  target?: any;
  method?: IInvoke;
  
  invoke(parameters: ArrayLike<any>): any;
}

export class ConstructInvocation implements IInvocation {
  
  _initializers: Map<string, IInvocation>;
  
  constructor(private _target: any, private _options: Partial<AgentOptions>) {
  
    if (_options.compile === AgentCompileType.Static) {
      this._initializers = CreatePropertyInitializers(_target);
    }
    
    if (AgentInterceptorType.BeforeConstructor === _options.intercept) {
      // user defined interceptors will run before constructor
      this.invoke = CreateInitializedInstanceInvoker(this._target, this._options);
    }
    else if (AgentInterceptorType.AfterConstructor === _options.intercept) {
      // user defined interceptors will run after constructor
      this.invoke = CreatePostInterceptedInstanceInvoker(this._target, this._options);
    }
    else if (AgentInterceptorType.Disable === _options.intercept) {
      // user defined interceptors will be disabled, this is good for metadata only class
      this.invoke = CreatePlainInstanceInvoker(this._target, this._options);
    }
    
  }
  
  get target(): any {
    return this._target;
  }
  
  get initializers(): Map<string, IInvocation> {
    if (!this._initializers) {
      this._initializers = CreatePropertyInitializers(this._target);
    }
    return this._initializers;
  }
  
  /**
   * Run property interceptor if have
   */
  invoke() {
    throw new TypeError(`Unsupported AgentInterceptorType ${this._options.intercept} on class ${this._target.prototype.constructor.name}`)
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

export class ValueInitializer implements IInvocation {
  
  constructor(private _target: any, private _propertyKey: PropertyKey) {
  }
  
  get target(): any {
    return this._target;
  }
  
  invoke(parameters: ArrayLike<any>): any {
    return this._target.prototype[this._propertyKey];
  }
  
}
