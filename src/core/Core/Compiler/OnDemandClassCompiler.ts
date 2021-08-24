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
import { PropertyInfo } from '../Interfaces/PropertyInfo';
import { define } from '../Helpers/Prototype';
import { GetterSetterInvocation } from './Invocation/GetterSetterInvocation';
// import { AgentFrameworkError } from '../AgentFrameworkError';
import { InvocationFactory } from './InvocationFactory';

export function UpgradeAgentProperties(
  target: Function | object,
  properties: Map<PropertyKey, PropertyInfo>,
  receiver?: Function | object
) {
  // only proxy property contains interceptor
  // property without interceptor is metadata only attribute
  for (const [key, property] of properties.entries()) {
    const descriptor = Reflect.getOwnPropertyDescriptor(property.declaringType.prototype, key);
    let newDescriptor: PropertyDescriptor;
    if (descriptor) {
      newDescriptor = OnDemandClassCompiler.makeProperty(property, descriptor, receiver || target);
    } else {
      newDescriptor = OnDemandClassCompiler.makeField(property, receiver || target);
    }
    Reflect.defineProperty(target, key, newDescriptor);
  }
}

class OnDemandClassCompiler {
  /**
   * Field will only call interceptor for only 1 time
   */
  static makeField(field: PropertyInfo, receiver: Function | object): PropertyDescriptor {
    const key = field.key;
    const fieldInvoker = new GetterSetterInvocation(field);
    return {
      get() {
        const chain = InvocationFactory.createPropertyInvocation(fieldInvoker, field);
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
        const chain = InvocationFactory.createPropertyInvocation(fieldInvoker, field);
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

  static makeProperty(
    property: PropertyInfo,
    descriptor: PropertyDescriptor,
    receiver: Function | object
  ): PropertyDescriptor {
    const key = property.key;
    let propertyDescriptor = Object.create(descriptor);
    // user can change this property
    propertyDescriptor.configurable = true;
    const defaultValue = descriptor.value;
    const getterFunction = descriptor.get;
    const setterFunction = descriptor.set;

    if ('function' === typeof getterFunction) {
      if ('function' === typeof setterFunction) {
        // getter(yes) and setter(yes)
        propertyDescriptor.get = function (this: any) {
          const getter = new MethodInvocation(property, getterFunction);
          const getterChain = InvocationFactory.createPropertyInvocation(getter, property);
          const descriptor = {
            get() {
              return getterChain.invoke([], this);
            },
            set(value: any) {
              const setter = new MethodInvocation(property, setterFunction);
              const setterChain = InvocationFactory.createPropertyInvocation(setter, property);
              descriptor.set = function () {
                setterChain.invoke(arguments, this);
              };
              define(receiver, key, descriptor);
              setterChain.invoke(arguments, this);
            },
            configurable: true,
          };
          define(receiver, key, descriptor);
          return getterChain.invoke([], this);
        };
        propertyDescriptor.set = function (this: any) {
          const setter = new MethodInvocation(property, setterFunction);
          const setterChain = InvocationFactory.createPropertyInvocation(setter, property);
          const descriptor = {
            get() {
              const getter = new MethodInvocation(property, getterFunction);
              const getterChain = InvocationFactory.createPropertyInvocation(getter, property);
              descriptor.get = function () {
                return getterChain.invoke([undefined], this);
              };
              define(receiver, key, descriptor);
              return getterChain.invoke([undefined], this);
            },
            set(this: any) {
              return setterChain.invoke(arguments, this);
            },
            configurable: true,
          };
          define(receiver, key, descriptor);
          return setterChain.invoke(arguments, this);
        };
      } else {
        // getter(yes), setter(no)
        propertyDescriptor.get = function (this: any) {
          const getter = new MethodInvocation(property, getterFunction);
          const getterChain = InvocationFactory.createPropertyInvocation(getter, property);
          propertyDescriptor.get = function (this: any) {
            return getterChain.invoke([], this);
          };
          define(receiver, key, propertyDescriptor);
          return getterChain.invoke([], this);
        };
      }
    } else if ('function' === typeof setterFunction) {
      // getter(no), setter(yes)
      propertyDescriptor.set = function (this: any) {
        const setter = new MethodInvocation(property, setterFunction);
        const setterChain = InvocationFactory.createPropertyInvocation(setter, property);
        propertyDescriptor.set = function (this: any) {
          return setterChain.invoke(arguments, this);
        };
        define(receiver, key, propertyDescriptor);
        return setterChain.invoke(arguments, this);
      };
    } else if ('function' === typeof defaultValue) {
      propertyDescriptor.value = function (this: any) {
        const origin = new MethodInvocation(property, defaultValue);
        const param = ChainFactory.addParameterInterceptor(origin, property);
        const chain = InvocationFactory.createPropertyInvocation(param, property);
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
        const chain = InvocationFactory.createPropertyInvocation(propertyInvoker, property);
        const descriptor = {
          get() {
            return chain.invoke([], this);
          },
          set(value: any) {
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
        const chain = InvocationFactory.createPropertyInvocation(propertyInvoker, property);
        const descriptor = {
          get() {
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

    // console.log('descriptor', descriptor);
    // console.log('propertyDescriptor', propertyDescriptor);
    return propertyDescriptor;
  }
}
