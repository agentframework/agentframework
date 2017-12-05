import { IAttribute } from './attribute';
import { Reflection } from './reflection';


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
    
    const attributes = Reflection.findPropertyAttributes(this._target);
    
    if (attributes.size > 0) {
      
      // the soul of Agent
      class Agent extends this._target {
      }
      
      // intercept fields
      attributes.forEach((value: Array<IAttribute>, key: string) => {
        value.forEach(attr => {
          const interceptor = attr.getInterceptor();
          if (interceptor) {
            Reflect.defineProperty(Agent.prototype, key, {
              writable: true,
              configurable: true,
              value: interceptor.intercept(null, [])
            });
          }
        });
      });
      
      // System default
      const asGod = Reflect.construct(this._target, parameters, Agent);
      return asGod;
    }
    else {
      return Reflect.construct(this._target, parameters, this._receiver);
    }
    
    
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
