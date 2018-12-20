import { Property } from './reflection';
import { Lookup } from './lookup';
import { createInterceptionChainFromAttribute } from './interceptors/factory';
import { InitializerFactory } from './initializers/factory';
import { InitializerInvocation } from './initializers/invocation';
import { InterceptorInvocation } from './interceptors/interceptorInvocation';
import { Constructor } from './constructor';
import { IInvocation } from './invocation';
import { CONSTRUCTOR_INITIALIZER, FIELD_INITIALIZER } from './symbol';
import { Reflector } from './reflector';
import { AgentFeatures, CompilerOptions } from './compilerOptions';
import { InterceptorFactory } from './interceptors/interceptorFactory';

/**
 * @ignore
 * @hidden
 */
export class Compiler {
  _options: Partial<CompilerOptions>;

  constructor(options?: Partial<CompilerOptions>) {
    options = options || {};

    // We will use `Lazy`(on-demand compile) method to upgrade user class into agent
    // please refer to ADR-0004
    options.target = options.target || 'function';
    options.features =
      options.features == null ? AgentFeatures.Initializer ^ AgentFeatures.Interceptor : options.features;

    this._options = options;
  }

  private static makeConstructorParameterInitializers(target): Map<number, IInvocation> {
    const method = Reflector(target);

    const maxParameter = method.parameterCount();
    let constructorParameterInitializers: Map<number, IInvocation> = new Map<number, IInvocation>();

    for (let idx = 0; idx < maxParameter; idx++) {
      const parameter = method.parameter(idx);

      // get all initializer
      let initializerAttributes = parameter.getInitializers();
      // apply initializers
      const initialized = InitializerFactory.createParameterInitializer(initializerAttributes, target, parameter);

      // get all interceptors for the initializer
      let interceptorAttributes = parameter.getInterceptors();
      // apply interceptors
      const intercepted = createInterceptionChainFromAttribute(initialized, interceptorAttributes);

      // InceptionInvocation means at least one interceptor in the attributes
      // do nothing if no interceptor found
      if (intercepted instanceof InitializerInvocation || intercepted instanceof InterceptorInvocation) {
        constructorParameterInitializers.set(idx, intercepted);
      }
    }

    return constructorParameterInitializers;
  }

  private static makePropertyInterceptors(target): PropertyDescriptorMap {
    // 1. find all the properties for this type which contains one or more attribute implemented 'getInterceptor'
    const properties: Property[] = Lookup.findInterceptors(target);
    if (!properties.length) {
      return;
    }

    let propertyInterceptors: any = {};

    for (const property of properties) {
      const name = property.targetKey;
      const descriptor = property.descriptor;

      if (!descriptor) {
        if (property.hasInitializer() || property.value().hasInitializer()) {
          // Interceptor can works with Initializer
          continue;
        } else {
          throw new Error(
            `Class: ${target.prototype.constructor.name}; Property: ${property.targetKey.toString()}; ` +
            `Interceptor not work with field property without Initializer`
          );
        }
      }

      // refer to the origin descriptor
      propertyInterceptors[name] = Object.create(descriptor);

      const value = descriptor.value;
      const getter = descriptor.get;
      const setter = descriptor.set;

      // find all the attributes
      let interceptorAttributes = property.getInterceptors();

      if (value) {
        // call interceptors on value first
        // then call interceptors on property
        interceptorAttributes = property
          .value()
          .getInterceptors()
          .concat(interceptorAttributes);

        /* istanbul ignore else  */
        if (typeof value === 'function') {
          propertyInterceptors[name].value = InterceptorFactory.createFunctionInterceptor(interceptorAttributes, value);
        } else {
          throw new Error(
            `Class: ${target.prototype.constructor.name}; Property: ${property.targetKey.toString()}; ` +
            `Interceptor not work with non-function property`
          );
        }
      }

      if (typeof getter === 'function') {
        interceptorAttributes = property
          .getter()
          .getInterceptors()
          .concat(interceptorAttributes);
        propertyInterceptors[name].get = InterceptorFactory.createFunctionInterceptor(
          interceptorAttributes,
          getter
        ) as () => any;
      }

      if (typeof setter === 'function') {
        interceptorAttributes = property
          .setter()
          .getInterceptors()
          .concat(interceptorAttributes);
        propertyInterceptors[name].set = InterceptorFactory.createFunctionInterceptor(
          interceptorAttributes,
          setter
        ) as (v: any) => void;
      }
    }

    return propertyInterceptors;
  }

  private static makePropertyInitializers(target): Map<string | symbol, IInvocation> {
    const initializers: Property[] = Lookup.findInitializers(target);
    let propertyInitializers: Map<string | symbol, IInvocation>;

    if (initializers.length > 0) {
      propertyInitializers = new Map<string, IInvocation>();

      for (const property of initializers) {
        const name = property.targetKey;

        if (property.descriptor) {
          throw new Error(
            `Class: ${target.prototype.constructor.name}; Property: ${property.targetKey.toString()}; ` +
            `Initializer not work with field property`
          );
        } else {
          let initializerAttributes = property.getInitializers();
          initializerAttributes = property
            .value()
            .getInitializers()
            .concat(initializerAttributes);

          // one property may have more than one interceptor.
          // we will call them one by one. passing the result of previous interceptor to the new interceptor
          const initialized = InitializerFactory.createValueInitializer(initializerAttributes, target, name, property);

          // get all interceptors for the initializer
          let interceptorAttributes = property.getInterceptors();
          interceptorAttributes = property
            .value()
            .getInterceptors()
            .concat(interceptorAttributes);

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

  compile(target, parameters?: ArrayLike<any>): Constructor {
    let params: Map<number, IInvocation>,
      fields: any = {},
      methods: PropertyDescriptorMap;

    if ((this._options.features & AgentFeatures.Initializer) === AgentFeatures.Initializer) {
      const lazy = (this._options.features & AgentFeatures.LazyInitializer) === AgentFeatures.LazyInitializer;

      // constructor parameter initializer
      params = Compiler.makeConstructorParameterInitializers(target);

      // field property initializer
      const initializers: Map<string | symbol, IInvocation> = Compiler.makePropertyInitializers(target);
      // invoke all initializers to generate default value bag
      if (initializers && initializers.size) {
        // bag = new Map<string, any>();
        for (const [key, initializer] of initializers) {
          // bag.set(key, { value: initializedValue });
          if (lazy) {
            fields[key] = {
              get: function () {
                const value = (initializer as IInvocation).invoke(parameters);
                Reflect.defineProperty(this, key, { value });
                return value;
              }
            };
          } else {
            const initializedValue = (initializer as IInvocation).invoke(parameters);
            fields[key] = {
              value: initializedValue
            };
          }
          fields[key][FIELD_INITIALIZER] = initializer; // cache initializer
        }
      }
    }

    if ((this._options.features & AgentFeatures.Interceptor) === AgentFeatures.Interceptor) {
      // do Interceptor
      methods = Compiler.makePropertyInterceptors(target);
    }

    let CompiledAgent;

    if (Object.keys(fields).length || methods) {
      // EPIC: inject the intercepted value before construct a new instance
      if (this._options.target === 'class') {
        CompiledAgent = class extends target { };
      } else {
        /* istanbul ignore next */
        CompiledAgent = function () { };
        CompiledAgent.prototype = Object.create(target.prototype);
      }

      fields && Object.defineProperties(CompiledAgent.prototype, fields);
      methods && Object.defineProperties(CompiledAgent.prototype, methods);
    } else {
      CompiledAgent = target;
    }

    if (params) {
      CompiledAgent[CONSTRUCTOR_INITIALIZER] = params;
    }

    return CompiledAgent;
  }
}
