// utilize code gen
import { ICompiler } from './ICompiler';
import { Compiler } from './Compiler';
import { InitializerFactory } from './InitializerFactory';
import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { InterceptorFactory } from './InterceptorFactory';
import { Arguments } from './Arguments';
import { IInvocation } from '../Core/IInvocation';
import { AgentFeatures } from '../Reflection/AgentFeatures';
import { Reflector } from '../Reflection/Reflector';
import { PropertyFilters } from '../Reflection/PropertyFilters';
import { Constructor } from '../Core/Constructor';
import { Method } from '../Reflection/Method';

export class AgentCompiler implements ICompiler {
  compile<T>(target: Constructor<T>, params: Arguments): T {
    const names = new Set<PropertyKey>();
    let initializers: any, interceptors: any;

    // field property initializer
    initializers = this.makePropertyInitializers(target, names);

    // do Interceptor
    interceptors = this.makePropertyInterceptors(target, names);

    let CompiledAgent;

    if (initializers || interceptors) {
      // EPIC: inject the intercepted value before construct a new instance
      const compiler = new Compiler(target);
      compiler.defineFields(initializers, params);
      compiler.defineProperties(interceptors);
      CompiledAgent = compiler.compile();
    } else {
      //
      CompiledAgent = target;
    }

    return CompiledAgent;
  }

  compileParameters(target: Function, method: Method<any>): Map<number, IInvocation> {
    const maxParameter = method.parameterCount();
    const parameterInitializers = new Map<number, IInvocation>();

    for (let idx = 0; idx < maxParameter; idx++) {
      const parameter = method.parameter(idx);

      // get all initializer
      let initializerAttributes = parameter.getInitializers();

      // apply initializers
      const initialized = InitializerFactory.createParameterInitializer(initializerAttributes, target, parameter);

      // get all interceptor
      let interceptorAttributes = parameter.getInterceptors();

      // apply interceptors
      const intercepted = InterceptorFactory.chainInterceptorAttributes(initialized, interceptorAttributes);

      // InceptionInvocation means at least one interceptor in the attributes
      // do nothing if no interceptor found
      if (intercepted instanceof InitializerInvocation || intercepted instanceof InterceptorInvocation) {
        parameterInitializers.set(idx, intercepted);
      }
      // else if (intercepted instanceof ParameterInvocation) {
      //   // do nothing
      // }
    }

    return parameterInitializers;
  }

  private makePropertyInterceptors<T>(
    target: Constructor<T>,
    names: Set<PropertyKey>
  ): Map<PropertyKey, IInvocation> | undefined {
    const layers = Reflector(target).findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Interceptor);

    let propertyInterceptors: Map<PropertyKey, IInvocation> | undefined;

    if (layers.length) {
      for (const [, properties] of layers) {
        for (const [, property] of properties) {
          const name = property.targetKey;
          const descriptor = property.descriptor;

          if (!descriptor) {
            // this is a field
            // interceptor only works when custom initializer defined for this field
            if (property.hasInitializer() || property.value.hasInitializer()) {
              // this interceptor will created in makePropertyInitializers()
              continue;
            } else {
              throw new Error(
                `Class: ${target.prototype.constructor.name}; Property: ${property.targetKey.toString()}; ` +
                  `Interceptor not work with field property without Initializer`
              );
            }
          }

          // refer to the origin descriptor
          const newDescriptor = Object.create(descriptor);

          const value = descriptor.value;
          const getter = descriptor.get;
          const setter = descriptor.set;

          // find all the attributes
          let interceptorAttributes = property.getInterceptors();

          if (typeof getter === 'function') {
            interceptorAttributes = property.getter.getInterceptors().concat(interceptorAttributes);
            newDescriptor.get = InterceptorFactory.createFunction(
              interceptorAttributes,
              target,
              getter,
              property.getter
            );
          }
          if (typeof setter === 'function') {
            interceptorAttributes = property.setter.getInterceptors().concat(interceptorAttributes);
            newDescriptor.set = InterceptorFactory.createFunction(
              interceptorAttributes,
              target,
              setter,
              property.setter
            );
          }
          if (typeof value === 'function') {
            // call interceptors on value first
            // then call interceptors on property
            interceptorAttributes = property.value.getInterceptors().concat(interceptorAttributes);
            let parameters: Map<number, IInvocation> | undefined;
            if (property.value.hasParameterInterceptor() || property.value.hasParameterInitializer()) {
              parameters = this.compileParameters(value, property.value);
            }
            newDescriptor.value = InterceptorFactory.createFunction(
              interceptorAttributes,
              target,
              value,
              property.value,
              parameters
            );
          }
          if (names.has(name)) {
            throw new Error(
              `Class: ${target.prototype.constructor.name}; Property: ${property.targetKey.toString()}; ` +
                `Duplicate interceptor`
            );
          } else {
            names.add(name);
          }
          if (!propertyInterceptors) {
            propertyInterceptors = new Map<PropertyKey, IInvocation>();
          }
          propertyInterceptors.set(name, newDescriptor);
        }
      }
    }

    return propertyInterceptors;
  }

  private makePropertyInitializers<T>(
    target: Constructor<T>,
    names: Set<PropertyKey>
  ): Map<PropertyKey, IInvocation> | undefined {
    const layers = Reflector(target).findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Initializer);
    let propertyInitializers: Map<PropertyKey, IInvocation> | undefined;

    if (layers.length) {
      for (const [, initializers] of layers) {
        for (const [, property] of initializers) {
          const name = property.targetKey;

          if (property.descriptor) {
            // initializer is not for a method / getter / setter
            throw new Error(
              `Class: ${target.prototype.constructor.name}; Property: ${property.targetKey.toString()}; ` +
                `Initializer not work with method / getter / setter`
            );
          } else {
            let initializerAttributes = property.getInitializers();
            initializerAttributes = property.value.getInitializers().concat(initializerAttributes);

            // one property may have more than one interceptor.
            // we will call them one by one. passing the result of previous interceptor to the new interceptor
            const initialized = InitializerFactory.createFieldInitializer(
              initializerAttributes,
              target,
              name,
              property
            );

            // get all interceptors for the initializer
            let interceptorAttributes = property.getInterceptors();
            interceptorAttributes = property.value.getInterceptors().concat(interceptorAttributes);

            // apply interceptors
            const intercepted = InterceptorFactory.chainInterceptorAttributes(initialized, interceptorAttributes);

            // InceptionInvocation means at least one interceptor in the attributes
            // do nothing if no interceptor found
            if (intercepted instanceof InitializerInvocation || intercepted instanceof InterceptorInvocation) {
              if (names.has(name)) {
                throw new Error(
                  `Class: ${target.prototype.constructor.name}; Property: ${property.targetKey.toString()}; ` +
                    `Duplicate initializer`
                );
              } else {
                names.add(name);
              }
              if (!propertyInitializers) {
                propertyInitializers = new Map<PropertyKey, IInvocation>();
              }
              propertyInitializers.set(name, intercepted);
            }
          }
        }
      }
    }

    return propertyInitializers;
  }
}
