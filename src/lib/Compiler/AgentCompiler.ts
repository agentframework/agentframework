/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

// utilize code gen
import { ICompiler } from './ICompiler';
import { Compiler } from './Compiler';
import { InitializerFactory } from './InitializerFactory';
import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { Arguments } from './Arguments';
import { IInvocation } from '../Core/IInvocation';
import { AgentFeatures } from '../Reflection/AgentFeatures';
import { Reflector } from '../Reflection/Reflector';
import { PropertyFilters } from '../Reflection/PropertyFilters';
import { Method } from '../Reflection/Method';
import { InterceptorChainFactory } from './InterceptorChainFactory';
import { InterceptorFunctionFactory } from './InterceptorFunctionFactory';
import { IsAgent } from '../Internal/Cache';

export class AgentCompiler implements ICompiler {
  compile(target: Function, params: Arguments): Function {
    const names = new Set<PropertyKey>();
    let initializers: any;
    let interceptors: any;

    // field property initializer
    initializers = this.makePropertyInitializers(target, names);

    // do Interceptor
    interceptors = this.makePropertyInterceptors(target, names);

    let compiled;

    if (initializers || interceptors) {
      const compiler = new Compiler(target);
      compiler.defineFields(initializers, params);
      compiler.defineProperties(interceptors);
      compiled = compiler.compile();
    } else {
      //
      compiled = target;
    }

    return compiled;
  }

  compileParameters(target: Function, method: Method<any>): Map<number, [IInvocation, IInvocation]> {
    const parameters = method.parameters();
    const parameterInitializers = new Map<number, [IInvocation, IInvocation]>();

    for (const parameter of parameters) {
      // get all initializer
      let initializerAttributes = parameter.getInitializers();

      // apply initializers
      const origin = InitializerFactory.createParameterInitializer(target, parameter);

      const initialized = InitializerFactory.chainInitializerAttributes(origin, initializerAttributes);

      // get all interceptor
      let interceptorAttributes = parameter.getInterceptors();

      // apply interceptors
      const intercepted = InterceptorChainFactory.chainInterceptorAttributes(initialized, interceptorAttributes);

      // getAvailableParameters() return only the parameter got interceptor or initializer
      parameterInitializers.set(parameter.index, [origin, intercepted]);
    }

    return parameterInitializers;
  }

  private makePropertyInterceptors(
    target: Function,
    names: Set<PropertyKey>
  ): Map<PropertyKey, IInvocation> | undefined {
    const layers = Reflector(target).findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Interceptor);

    let propertyInterceptors: Map<PropertyKey, IInvocation> | undefined;

    for (const [type, properties] of layers) {
      if (IsAgent(type.class)) {
        continue;
      }
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
          newDescriptor.get = InterceptorFunctionFactory.createFunction(
            interceptorAttributes,
            target,
            getter,
            property.getter
          );
        }
        if (typeof setter === 'function') {
          interceptorAttributes = property.setter.getInterceptors().concat(interceptorAttributes);
          newDescriptor.set = InterceptorFunctionFactory.createFunction(
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
          let parameters: Map<number, [IInvocation, IInvocation]> | undefined;
          if (property.value.hasParameters()) {
            parameters = this.compileParameters(value, property.value);
          }
          newDescriptor.value = InterceptorFunctionFactory.createFunction(
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

    return propertyInterceptors;
  }

  private makePropertyInitializers(
    target: Function,
    names: Set<PropertyKey>
  ): Map<PropertyKey, [IInvocation, IInvocation]> | undefined {
    const layers = Reflector(target).findProperties(PropertyFilters.FilterFeatures, AgentFeatures.Initializer);
    let propertyInitializers: Map<PropertyKey, [IInvocation, IInvocation]> | undefined;

    for (const [type, initializers] of layers) {
      if (IsAgent(type.class)) {
        continue;
      }
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
          const origin = InitializerFactory.createFieldInitializer(target, name, property);

          const initialized = InitializerFactory.chainInitializerAttributes(origin, initializerAttributes);

          // get all interceptors for the initializer
          let interceptorAttributes = property.getInterceptors();
          interceptorAttributes = property.value.getInterceptors().concat(interceptorAttributes);

          // apply interceptors
          const intercepted = InterceptorChainFactory.chainInterceptorAttributes(initialized, interceptorAttributes);

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
              propertyInitializers = new Map<PropertyKey, [IInvocation, IInvocation]>();
            }
            propertyInitializers.set(name, [origin, intercepted]);
          }
        }
      }
    }

    return propertyInitializers;
  }
}
