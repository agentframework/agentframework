import { Property } from './reflection';
import { Lookup } from './lookup';
import { createInterceptionChainFromAttribute, InterceptorFactory } from './interceptors/factory';
import { InitializerFactory } from './initializers/factory';
import { InitializerInvocation } from './initializers/invocation';
import { InterceptorInvocation } from './interceptors/invocation';
import { Constructor } from './constructor';
import { IInvocation } from './invocation';


export enum AgentCompileType {
  Custom          = -1,
  StaticFunction  = 1,
  StaticClass     = 2,
  StaticProxy     = 3,
  LazyFunction    = 21,
  LazyClass       = 22,
  LazyProxy       = 23,
  DynamicFunction = 31,
  DynamicClass    = 32,
  DynamicProxy    = 33
}

export enum AgentFeatures {
  Disabled    = -1,
  Initializer = 1,
  Interceptor = 2
}

export interface CompilerOptions {
  features: AgentFeatures,
  target: 'function' | 'class' | 'proxy'
}

export class Compiler {
  
  _options: Partial<CompilerOptions>;
  
  constructor(options?: Partial<CompilerOptions>) {
    options = options || {};
    
    // We will use `Lazy`(on-demand compile) method to upgrade user class into agent
    // please refer to ADR-0004
    options.target = options.target || 'function';
    options.features = options.features == null ? (AgentFeatures.Initializer ^ AgentFeatures.Interceptor) : options.features;
    
    this._options = options;
    
  }
  
  compile(target, parameters?: ArrayLike<any>): Constructor {
    
    let fields: PropertyDescriptorMap = {}, methods: PropertyDescriptorMap;
  
    if ((this._options.features & AgentFeatures.Initializer) === AgentFeatures.Initializer) {
      // do Initializer
      const initializers: Map<string | symbol, IInvocation> = Compiler.makePropertyInitializers(target);
      // invoke all initializers to generate default value bag
      if (initializers && initializers.size) {
        // bag = new Map<string, any>();
        for (const [key, initializer] of initializers) {
          const initializedValue = (initializer as IInvocation).invoke(parameters);
          if (initializedValue != null) {
            // bag.set(key, { value: initializedValue });
            fields[key] = { value: initializedValue };
          }
        }
      }
    }
    
    if ((this._options.features & AgentFeatures.Interceptor) === AgentFeatures.Interceptor) {
      // do Interceptor
      methods = Compiler.makePropertyInterceptors(target);
    }
    
    let CompiledAgent;
    
    if (fields || methods) {
      
      // EPIC: inject the intercepted value before construct a new instance
      if (this._options.target === 'class') {
        CompiledAgent = class extends target {
        };
      }
      else {
        /* istanbul ignore next */
        CompiledAgent = function () {
        };
        CompiledAgent.prototype = Object.create(target.prototype);
      }
      
      methods && Object.defineProperties(CompiledAgent.prototype, methods);
      fields && Object.defineProperties(CompiledAgent.prototype, fields);
      
    }
    else {
      CompiledAgent = target;
    }
    
    
    return CompiledAgent;
    
  }
  
  private static makePropertyInterceptors(target): PropertyDescriptorMap {
    
    // 1. find all the properties for this type which contains one or more attribute implemented 'getInterceptor'
    const properties: Property[] = Lookup.findInterceptors(target);
    if (!properties.length) {
      return;
    }
    
    let propertyInterceptors: PropertyDescriptorMap = {};
    
    for (const property of properties) {
      
      const name = property.targetKey;
      const descriptor = property.descriptor;
      
      if (!descriptor) {
        
        if (property.hasInitializer() || property.value().hasInitializer()) {
          // Interceptor can works with Initializer
          continue;
        }
        else {
          throw new Error(`Class: ${target.prototype.constructor.name}; Property: ${property.targetKey}; ` +
            `Interceptor not work with field property without Initializer`);
        }
        
      }
      
      // refer to the origin descriptor
      propertyInterceptors[name] = Object.create(descriptor);
      
      const value = property.descriptor.value;
      const getter = property.descriptor.get;
      const setter = property.descriptor.set;
      
      // find all the attributes
      let interceptorAttributes = property.getInterceptors();
      
      if (value) {
        
        // call interceptors on value first
        // then call interceptors on property
        interceptorAttributes = property.value().getInterceptors().concat(interceptorAttributes);
        
        /* istanbul ignore else  */
        if (typeof value === 'function') {
          propertyInterceptors[name].value = InterceptorFactory.createFunctionInterceptor(interceptorAttributes, value);
        }
        else {
          throw new Error(`Class: ${target.prototype.constructor.name}; Property: ${property.targetKey}; ` +
            `Interceptor not work with non-function property`);
        }
      }
      
      if (typeof getter === 'function') {
        interceptorAttributes = property.getter().getInterceptors().concat(interceptorAttributes);
        propertyInterceptors[name].get = InterceptorFactory.createFunctionInterceptor(interceptorAttributes, getter) as () => any;
      }
      
      if (typeof setter === 'function') {
        interceptorAttributes = property.setter().getInterceptors().concat(interceptorAttributes);
        propertyInterceptors[name].set = InterceptorFactory.createFunctionInterceptor(interceptorAttributes, setter) as (v: any) => void;
      }
      
    }
    
    return propertyInterceptors;
  }
  
  private static makePropertyInitializers(target): Map<string | symbol, IInvocation> {
    
    const initializers: Property[] = Lookup.findInitializers(target);
    let propertyInitializers: Map<string | symbol, IInvocation>;
    
    if (initializers.length > 0) {
      
      propertyInitializers = new Map<string, IInvocation>();
      
      for (const method of initializers) {
        
        const name = method.targetKey;
        
        if (method.descriptor) {
          throw new Error(`Class: ${target.prototype.constructor.name}; Property: ${method.targetKey}; ` +
            `Initializer not work with field property`);
        }
        else {
          
          let initializerAttributes = method.getInitializers();
          initializerAttributes = method.value().getInitializers().concat(initializerAttributes);
          
          // one property may have more than one interceptor.
          // we will call them one by one. passing the result of previous interceptor to the new interceptor
          const initialized = InitializerFactory.createValueInitializer(initializerAttributes, target, name);
          
          let interceptorAttributes = method.getInterceptors();
          interceptorAttributes = method.value().getInterceptors().concat(interceptorAttributes);
          
          // apply interceptors
          const intercepted = createInterceptionChainFromAttribute(initialized, interceptorAttributes);
          
          // InceptionInvocation means at least one interceptor in the attributes
          // do nothing if no interceptor found
          if (intercepted instanceof InitializerInvocation || intercepted instanceof InterceptorInvocation) {
            propertyInitializers.set(name, intercepted);
          }
        }
        
      }
    }
    
    return propertyInitializers;
  }
  
}
