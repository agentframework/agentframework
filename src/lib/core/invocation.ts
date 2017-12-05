import { Reflection } from './reflection';
import { AGENT_DOMAIN, ORIGIN_INSTANCE } from './utils';
import { AddProxyInterceptor } from './interceptors/proxy';
import { Metadata } from './metadata';
import { getDecoratingClass } from './decorator';


export interface IInvoke {
  (parameters: ArrayLike<any>): any
}

export interface IInvocation {
  target?: any;
  method?: IInvoke;
  
  invoke(parameters: ArrayLike<any>): any;
}

export class ConstructInvocation implements IInvocation {
  
  hasInterceptor: boolean;
  reflections: Map<string | symbol, Reflection>;
  
  constructor(private _target: any, private _receiver?: any) {
  }
  
  get target(): any {
    return this._target;
  }
  
  /**
   * Run property interceptor if have
   * @param {ArrayLike<any>} parameters
   * @returns {any}
   */
  invoke(parameters: ArrayLike<any>): any {
    
    const results = Reflection.findPropertyAttributes(this._target);
    let agent;
    let bag;
    
    if (results.size > 0) {
      
      bag = new Map<string, any>();
      
      for (const [key, value] of results) {
        let injected = false;
        let interceptedResult = null;
        // one property may have more than one interceptor.
        // we will call them one by one. passing the result of previous interceptor to the new interceptor
        for (const attribute of value) {
          const interceptor = attribute.getInterceptor();
          if (interceptor) {
            injected = true;
            interceptedResult = interceptor.intercept(interceptedResult, parameters);
          }
        }
        
        if (injected) {
          bag.set(key, interceptedResult);
        }
      }
    }
    
    // EPIC: inject the required properties before construct the object
    if (bag && bag.size) {
      
      // create transparent layer for property injector
      class DynamicAgent extends this._target {
      }
      
      for (const [key, value] of bag) {
        Reflect.defineProperty(DynamicAgent.prototype, key, {
          // true if and only if the value associated with the property may be changed (data descriptors only).
          writable: true,
          // true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
          configurable: true,
          // true if and only if this property shows up during enumeration of the properties on the corresponding object.
          enumerable: true,
          // The value associated with the property (data descriptors only).
          value
        });
      }
      
      agent = Reflect.construct(this._target, parameters, DynamicAgent);
    }
    else if (this._receiver) {
      agent = Reflect.construct(this._target, parameters, this._receiver);
    }
    else {
      agent = Reflect.construct(this._target, parameters);
    }
    
    if (!this.reflections) {
      this.reflections = Metadata.getAll(getDecoratingClass(this._target).prototype);
      for (const reflection of this.reflections.values()) {
        if (reflection.targetKey) {
          this.hasInterceptor = true;
          break;
        }
      }
    }

    // check interceptors and do not add proxy if no interceptors
    if (this.hasInterceptor) {
      const proxiedAgent = AddProxyInterceptor(agent);
      // mark origin instance
      Reflect.set(proxiedAgent, ORIGIN_INSTANCE, agent);
      return proxiedAgent
    }
    else {
      return agent;
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
