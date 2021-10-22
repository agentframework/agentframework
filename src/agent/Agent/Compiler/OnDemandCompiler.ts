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

import { OnDemandInterceptorFactory } from './OnDemandInterceptorFactory';
import { MethodInvocation } from './Invocation/MethodInvocation';
import { PropertyInfo } from '../Reflection/PropertyInfo';
import { GetterSetterInvocation } from './Invocation/GetterSetterInvocation';
// import { AgentFrameworkError } from '../AgentFrameworkError';
import { OnDemandInvocationFactory } from './OnDemandInvocationFactory';
import { alter } from './alter';
import { PropertyInvocation } from '../TypeInvocations';
import { OnDemandParameterInterceptor } from './Interceptor/OnDemandParameterInterceptor';

export function UpgradeAgentProperties(
  origin: Function | object,
  target: Function | object,
  properties: ReadonlyArray<PropertyInfo>,
  receiver?: Function | object
) {
  // only proxy property contains interceptor
  // property without interceptor is metadata only attribute
  for (const property of properties) {
    if (receiver) {
      // can skip if property is exists
      if (Reflect.getOwnPropertyDescriptor(target, property.key)) {
        Reflect.deleteProperty(receiver, property.key);
        continue;
      }
    }

    const descriptor = Reflect.getOwnPropertyDescriptor(origin, property.key);
    // const descriptor5 = property.descriptor;
    // if (origin.constructor.name === 'Class4101') {
    //   console.log('Reflect.getOwnPropertyDescriptor', descriptor?.get?.toString());
    //   console.log('property.descriptor', descriptor5?.get?.toString());
    // }

    // if (descriptor2 !== descriptor) {
    //   console.log('not same', origin, property.key, property.descriptor === descriptor);

    // if (property.descriptor !== descriptor) {
    //   console.log('A', descriptor?.value?.toString());
    //   console.log('B', property.descriptor?.value?.toString());
    // }
    // }

    let newDescriptor: PropertyDescriptor;
    if (descriptor) {
      newDescriptor = OnDemandCompiler.makeProperty(property, descriptor, receiver || target);
    } else {
      newDescriptor = OnDemandCompiler.makeField(property, receiver || target);
    }
    Reflect.defineProperty(target, property.key, newDescriptor);
  }
}

class OnDemandCompiler {
  /**
   * Field will only call interceptor for only 1 time
   */
  static makeField(field: PropertyInfo, receiver: Function | object): PropertyDescriptor {
    const key = field.key;
    const fieldInvoker = new GetterSetterInvocation(field);
    return {
      get() {
        const chain = OnDemandInvocationFactory.createPropertyInvocation(fieldInvoker, field);
        const descriptor = {
          get() {
            return chain.invoke([], this);
            // return set(this, key, chain.invoke([undefined], this));
          },
          set(this: any) {
            descriptor.set = function (this: any) {
              chain.invoke(arguments, this);
            };
            alter(receiver, key, descriptor);
            chain.invoke(arguments, this);
          },
          configurable: true,
        };
        alter(receiver, key, descriptor);
        return chain.invoke([], this);
        // return set(this, key, chain.invoke([undefined], this));
      },
      set(this: any) {
        const chain = OnDemandInvocationFactory.createPropertyInvocation(fieldInvoker, field);
        const descriptor = {
          get() {
            descriptor.get = function () {
              return chain.invoke([], this);
              // return set(this, key, chain.invoke([undefined], this));
            };
            alter(receiver, key, descriptor);
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

        alter(receiver, key, descriptor);
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
          const getter = new MethodInvocation(getterFunction, property);
          const getterChain = OnDemandInvocationFactory.createPropertyInvocation(getter, property);
          const descriptor = {
            get() {
              return getterChain.invoke([], this);
            },
            set(value: any) {
              const setter = new MethodInvocation(setterFunction, property);
              const setterChain = OnDemandInvocationFactory.createPropertyInvocation(setter, property);
              descriptor.set = function () {
                setterChain.invoke(arguments, this);
              };
              alter(receiver, key, descriptor);
              setterChain.invoke(arguments, this);
            },
            configurable: true,
          };
          alter(receiver, key, descriptor);
          return getterChain.invoke([], this);
        };
        propertyDescriptor.set = function (this: any) {
          const setter = new MethodInvocation(setterFunction, property);
          const setterChain = OnDemandInvocationFactory.createPropertyInvocation(setter, property);
          const descriptor = {
            get() {
              const getter = new MethodInvocation(getterFunction, property);
              const getterChain = OnDemandInvocationFactory.createPropertyInvocation(getter, property);
              descriptor.get = function () {
                return getterChain.invoke([undefined], this);
              };
              alter(receiver, key, descriptor);
              return getterChain.invoke([undefined], this);
            },
            set(this: any) {
              return setterChain.invoke(arguments, this);
            },
            configurable: true,
          };
          alter(receiver, key, descriptor);
          return setterChain.invoke(arguments, this);
        };
      } else {
        // getter(yes), setter(no)
        propertyDescriptor.get = function (this: any) {
          const getter = new MethodInvocation(getterFunction, property);
          const getterChain = OnDemandInvocationFactory.createPropertyInvocation(getter, property);
          propertyDescriptor.get = function (this: any) {
            return getterChain.invoke([], this);
          };
          alter(receiver, key, propertyDescriptor);
          return getterChain.invoke([], this);
        };
      }
    } else if ('function' === typeof setterFunction) {
      // getter(no), setter(yes)
      propertyDescriptor.set = function (this: any) {
        const setter = new MethodInvocation(setterFunction, property);
        const setterChain = OnDemandInvocationFactory.createPropertyInvocation(setter, property);
        propertyDescriptor.set = function (this: any) {
          return setterChain.invoke(arguments, this);
        };
        alter(receiver, key, propertyDescriptor);
        return setterChain.invoke(arguments, this);
      };
    } else if ('function' === typeof defaultValue) {
      propertyDescriptor.value = function (this: any) {
        let chain: PropertyInvocation = new MethodInvocation(defaultValue, property);
        if (property.hasParameter()) {
          chain = OnDemandInterceptorFactory.addInterceptor(chain, new OnDemandParameterInterceptor(property));
        }
        chain = OnDemandInvocationFactory.createPropertyInvocation(chain, property);
        propertyDescriptor.value = function (this: any) {
          return chain.invoke(arguments, this);
        };
        alter(receiver, key, propertyDescriptor);
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
        const chain = OnDemandInvocationFactory.createPropertyInvocation(propertyInvoker, property);
        const descriptor = {
          get() {
            return chain.invoke([], this);
          },
          set(value: any) {
            descriptor.set = function () {
              chain.invoke(arguments, this);
            };
            alter(receiver, key, descriptor);
            chain.invoke(arguments, this);
          },
          configurable: true,
        };
        alter(receiver, key, descriptor);
        return chain.invoke([], this);
      };

      propertyDescriptor.set = function (this: any) {
        const chain = OnDemandInvocationFactory.createPropertyInvocation(propertyInvoker, property);
        const descriptor = {
          get() {
            descriptor.get = function () {
              return chain.invoke([], this);
            };
            alter(receiver, key, descriptor);
            return chain.invoke([], this);
          },
          set(this: any) {
            return chain.invoke(arguments, this);
          },
          configurable: true,
        };
        // console.log('called set', receiver, Reflect.getOwnPropertyDescriptor(receiver.prototype, key));
        alter(receiver, key, descriptor);
        return chain.invoke(arguments, this);
      };
    }

    // console.log('descriptor', descriptor);
    // console.log('propertyDescriptor', propertyDescriptor);
    return propertyDescriptor;
  }
}
