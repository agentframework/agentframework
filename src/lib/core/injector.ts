import { AgentOptions, getOriginConstructor } from './decorator';
import { AddProxyInterceptor } from './interceptors/proxy';
import { Reflection } from './reflection';
import { ORIGIN_INSTANCE } from './utils';
import { IAttribute } from './attribute';
import { Metadata } from './metadata';
import { Constructor } from './interceptors/construct';

//region CreatePlainInstance
/**
 * Create instance which disable all interceptors
 */
export function CreatePlainInstance<T extends Function>(target: T, options: Partial<AgentOptions>): ()=>any  {
  if (options.customConstructor) {
    const customConstructor = options.customConstructor;
    return function () {
      return Reflect.construct(target, arguments, customConstructor);
    };
  }
  else {
    return function () {
      return Reflect.construct(target, arguments);
    };
  }
}
//endregion


//region CreatePreInterceptedInstance
/**
 * Create instance with run interceptors before constructor
 */
export function CreatePreInterceptedInstance<T extends Constructor>(target: T, options: Partial<AgentOptions>): ()=>any {
  
  const injectors = Reflection.findOwnInjectors(target);
  let agent;
  let bag;
  
  if (injectors.size > 0) {
    bag = new Map<string, PropertyDescriptor>();
    
    for (const [key, reflection] of injectors) {
      
      let injected = false;
      let interceptedValue = null;
      
      // one property may have more than one interceptor.
      // we will call them one by one. passing the result of previous interceptor to the new interceptor
      for (const attribute of reflection.getAttributes<IAttribute>()) {
        // attribute may not implement getInterceptor
        if (attribute.getInterceptor) {
          const interceptor = attribute.getInterceptor();
          if (interceptor) {
            injected = true;
            if (reflection.descriptor) {
              
              if (reflection.descriptor.get) {
              
              }
              
              console.log('Not support injector');
            }
            else {
              // this is a field property
              interceptedValue = interceptor.intercept(interceptedValue, parameters);
            }
          }
        }
      }
      
      if (injected && interceptedValue) {
        if (reflection.descriptor) {
        
        }
        else {
          bag.set(key, {
            // true if and only if the value associated with the property may be changed (data descriptors only).
            writable: true,
            // true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
            configurable: true,
            // true if and only if this property shows up during enumeration of the properties on the corresponding object.
            enumerable: true,
            // The value associated with the property (data descriptors only).
            value: interceptedValue
          });
        }
      }
    }
  }
  
  // EPIC: prepare the interceptors before construct a new instance
  if (bag && bag.size) {
    
    // introduce DynamicAgent for interceptors
    // create transparent layer for property injector
    class DynamicAgent extends target {
    }
    
    for (const [key, value] of bag) {
      Reflect.defineProperty(DynamicAgent.prototype, key, value);
    }
    
    agent = Reflect.construct(target, parameters, DynamicAgent);
    Reflect.set(agent, ORIGIN_INSTANCE, Reflect.getPrototypeOf(agent));
  }
  else if (options.customConstructor) {
    agent = Reflect.construct(target, parameters, options.customConstructor);
  }
  else {
    agent = Reflect.construct(target, parameters);
  }
  
  if (!this.reflections) {
    this.reflections = Metadata.getAll(getOriginConstructor(this._target).prototype);
    for (const reflection of this.reflections.values()) {
      if (reflection.targetKey) {
        this.hasInterceptor = true;
        break;
      }
    }
  }
  
  // check interceptors and do not add proxy if no interceptors
  if (this.hasInterceptor) {
    return function () {
      return AddProxyInterceptor(agent);
    }
    
  }
  else {
    return function (parameters: ArrayLike<any>): any {
      return CreatePreInterceptedInstance(this._target, this._options, parameters);
    }
  }
  
}
//endregion

//region CreatePostInterceptedInstance
/**
 * Create instance which run interceptors after constructor
 */
export function CreatePostInterceptedInstance<T extends Function>(target: T, options: Partial<AgentOptions>): ()=>any  {

}
//endregion
