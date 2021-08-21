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

import { ChainFactory } from './ChainFactory';
import { MethodInvocation } from './Invocation/MethodInvocation';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { ParameterInterceptor } from './Invocation/ParameterInterceptor';
import { PropertyInfo } from '../Interfaces/PropertyInfo';
import { define } from '../Helpers/Prototype';
import { GetterSetterInvocation } from './Invocation/GetterSetterInvocation';
import { AgentFrameworkError } from '../AgentFrameworkError';
import { HasInterceptor } from '../Helpers/CustomInterceptor';
import { Attribute } from '../Interfaces/Attribute';

export class OnDemandClassCompiler {
  static emit(
    target: Function | object,
    properties: Map<PropertyKey, PropertyInfo>,
    receiver?: Function | object
  ): any {
    const map: any = {};

    // only proxy property contains interceptor
    // property without interceptor is metadata only attribute
    for (const [key, property] of properties.entries()) {
      const descriptor = property.descriptor;
      if (descriptor) {
        map[key] = OnDemandClassCompiler.makeProperty(property, descriptor, receiver || target);
      } else {
        map[key] = OnDemandClassCompiler.makeField(property, receiver || target);
      }
    }

    // use define properties is a little bit faster then define the property one by one
    Object.defineProperties(target, map);

    return map;
  }

  // /**
  //  * Create interceptor for the getter
  //  */
  // private static createGetterInterceptor(origin: PropertyInvocation): Invocation {
  //   // console.log('createGetterInterceptor', origin.target.name, origin.design.name);
  //   const property = origin.design;
  //   const attributes = property.findOwnAttributes(HasInterceptor);
  //   //.concat(property.getter.findOwnAttributes(HasInterceptor));
  //   return ChainFactory.chainInterceptorAttributes(origin, attributes);
  // }
  //
  // /**
  //  * Create interceptor for the setter
  //  */
  // private static createSetterInterceptor(origin: PropertyInvocation): Invocation {
  //   // console.log('createSetterInterceptor', origin.target.name, origin.design.name);
  //   const property = origin.design;
  //   const attributes = property.findOwnAttributes(HasInterceptor);
  //   //.concat(property.setter.findOwnAttributes(HasInterceptor));
  //   return ChainFactory.chainInterceptorAttributes(origin, attributes);
  // }

  // /**
  //  * Create method interceptor
  //  */
  // static createMethodInterceptor(origin: PropertyInvocation): Invocation {
  //   // console.log('createMethodInterceptor', origin.target.name, origin.design.name);
  //   const property = origin.design;
  //
  //   //
  //   const attributes = property.findOwnAttributes(HasInterceptor);
  //   //.concat(property.value.findOwnAttributes(HasInterceptor));
  //
  //   // create interceptor
  //   const intercepted = ChainFactory.chainInterceptorAttributes(origin, attributes);
  //
  //   // create a extra parameter invocation if have
  //   return new InterceptorInvocation(intercepted, new ParameterInterceptor(property));
  // }

  // static createParameterInterceptor(origin: IParameterInvocation, interceptors): IInvocation {
  //   const design = origin.design;
  //
  //   const interceptors = design.getInterceptors(); // get all interceptors
  //
  //   // create interceptor
  //   return ChainFactory.chainInterceptorAttributes(origin, interceptors);
  // }

  /**
   * Create interceptor for field initializer
   */
  private static findOwnPropertyInterceptors(property: PropertyInfo): Array<Attribute> {
    const attributes = property.findOwnAttributes(HasInterceptor);
    //.concat(property.value.findOwnAttributes(HasInterceptor));
    return attributes;
  }

  /**
   * Field will only call interceptor for only 1 time
   */
  private static makeField(field: PropertyInfo, receiver: Function | object): PropertyDescriptor {
    const key = field.key;
    const fieldInvoker = new GetterSetterInvocation(field);
    return {
      get() {
        const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(field);
        const chain = ChainFactory.chainInterceptorAttributes(fieldInvoker, attributes);
        const descriptor = {
          get() {
            return chain.invoke([], this);
            // return set(this, key, chain.invoke([undefined], this));
          },
          set(this: any) {
            descriptor.set = function (this: any) {
              chain.invoke(arguments, this);
            };
            define(receiver, key, descriptor);
            chain.invoke(arguments, this);
          },
          configurable: true,
        };
        define(receiver, key, descriptor);
        return chain.invoke([], this);
        // return set(this, key, chain.invoke([undefined], this));
      },
      set(this: any) {
        const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(field);
        const chain = ChainFactory.chainInterceptorAttributes(fieldInvoker, attributes);
        const descriptor = {
          get() {
            descriptor.get = function () {
              return chain.invoke([], this);
              // return set(this, key, chain.invoke([undefined], this));
            };
            define(receiver, key, descriptor);
            return chain.invoke([], this);
            // return set(this, key, chain.invoke([undefined], this));
          },
          set(this: any) {
            return chain.invoke(arguments, this);
          },
          configurable: true,
        };

        // console.log('set receiver', receiver['prototype']);
        // console.log('set this',this);

        define(receiver, key, descriptor);
        return chain.invoke(arguments, this);
      },
      configurable: true,
    };
  }

  private static makeProperty(
    property: PropertyInfo,
    descriptor: PropertyDescriptor,
    receiver: Function | object
  ): PropertyDescriptor {
    const key = property.key;
    let propertyDescriptor = Object.create(descriptor);
    // user can change this property
    propertyDescriptor.configurable = true;
    const method = descriptor.value;
    const getterMethod = descriptor.get;
    const setterMethod = descriptor.set;
    if (method != null) {
      // if (typeof method === 'function') {
      // typeof method === 'function'
      // value only
      if (typeof method === 'function') {
        propertyDescriptor.value = function (this: any) {
          const origin = new MethodInvocation(property, method);
          const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
          const chain = new InterceptorInvocation(
            ChainFactory.chainInterceptorAttributes(origin, attributes),
            new ParameterInterceptor(property)
          );
          propertyDescriptor.value = function (this: any) {
            return chain.invoke(arguments, this);
          };
          define(receiver, key, propertyDescriptor);
          return chain.invoke(arguments, this);
        };
      } else {
        propertyDescriptor = {
          enumerable: descriptor.enumerable,
          configurable: true,
        };

        const propertyInvoker = new GetterSetterInvocation(property);

        // getter and setter
        propertyDescriptor.get = function (this: any) {
          const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
          const chain = ChainFactory.chainInterceptorAttributes(propertyInvoker, attributes);
          const descriptor = {
            get() {
              return chain.invoke([], this);
            },
            set(value: any) {
              const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
              const chain = ChainFactory.chainInterceptorAttributes(propertyInvoker, attributes);
              descriptor.set = function () {
                chain.invoke(arguments, this);
              };
              define(receiver, key, descriptor);
              chain.invoke(arguments, this);
            },
            configurable: true,
          };
          define(receiver, key, descriptor);
          return chain.invoke([], this);
        };
        propertyDescriptor.set = function (this: any) {
          const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
          const chain = ChainFactory.chainInterceptorAttributes(propertyInvoker, attributes);
          const descriptor = {
            get() {
              const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
              const chain = ChainFactory.chainInterceptorAttributes(propertyInvoker, attributes);
              descriptor.get = function () {
                return chain.invoke([], this);
              };
              define(receiver, key, descriptor);
              return chain.invoke([], this);
            },
            set(this: any) {
              return chain.invoke(arguments, this);
            },
            configurable: true,
          };
          // console.log('called set', receiver, Reflect.getOwnPropertyDescriptor(receiver.prototype, key));
          define(receiver, key, descriptor);
          return chain.invoke(arguments, this);
        };
      }
    } else {
      // getter or setter
      if (typeof getterMethod === 'function') {
        if (typeof setterMethod === 'function') {
          // getter and setter
          propertyDescriptor.get = function (this: any) {
            const origin = new MethodInvocation(property, getterMethod);
            const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
            const chain = ChainFactory.chainInterceptorAttributes(origin, attributes);
            const descriptor = {
              get() {
                return chain.invoke([], this);
              },
              set(value: any) {
                const origin = new MethodInvocation(property, setterMethod);
                const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
                const chain = ChainFactory.chainInterceptorAttributes(origin, attributes);
                descriptor.set = function () {
                  chain.invoke(arguments, this);
                };
                define(receiver, key, descriptor);
                chain.invoke(arguments, this);
              },
              configurable: true,
            };
            define(receiver, key, descriptor);
            return chain.invoke([], this);
          };
          propertyDescriptor.set = function (this: any) {
            const origin = new MethodInvocation(property, setterMethod);
            const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
            const chain = ChainFactory.chainInterceptorAttributes(origin, attributes);
            const descriptor = {
              get() {
                const origin = new MethodInvocation(property, getterMethod);
                const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
                const chain = ChainFactory.chainInterceptorAttributes(origin, attributes);
                descriptor.get = function () {
                  return chain.invoke([undefined], this);
                };
                define(receiver, key, descriptor);
                return chain.invoke([undefined], this);
              },
              set(this: any) {
                return chain.invoke(arguments, this);
              },
              configurable: true,
            };
            define(receiver, key, descriptor);
            return chain.invoke(arguments, this);
          };
        } else {
          // getter, no setter
          propertyDescriptor.get = function (this: any) {
            const origin = new MethodInvocation(property, getterMethod);
            const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
            const chain = ChainFactory.chainInterceptorAttributes(origin, attributes);
            propertyDescriptor.get = function (this: any) {
              return chain.invoke([], this);
            };
            define(receiver, key, propertyDescriptor);
            return chain.invoke([], this);
          };
        }
      } else if (typeof setterMethod === 'function') {
        // setter
        propertyDescriptor.set = function (this: any) {
          const origin = new MethodInvocation(property, setterMethod);
          const attributes = OnDemandClassCompiler.findOwnPropertyInterceptors(property);
          const chain = ChainFactory.chainInterceptorAttributes(origin, attributes);
          propertyDescriptor.set = function (this: any) {
            return chain.invoke(arguments, this);
          };
          define(receiver, key, propertyDescriptor);
          return chain.invoke(arguments, this);
        };
      } else {
        throw new AgentFrameworkError('InvalidProperty: ' + property.declaringType.name + '.' + key.toString());
      }
    }

    // console.log('descriptor', descriptor);
    // console.log('propertyDescriptor', propertyDescriptor);
    return propertyDescriptor;
  }
}
