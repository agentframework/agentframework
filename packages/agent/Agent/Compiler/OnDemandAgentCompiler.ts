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

import { OnDemandInvocationFactory } from './OnDemandInvocationFactory';
import { set } from '../Helpers/set';
import { PropertyInfo } from '../Reflection/PropertyInfo';

export function UpgradeAgentProperties(
  members: Map<string | symbol, number>,
  prototype: Function | object,
  proxy: Function | object,
  properties: ReadonlyArray<PropertyInfo>,
  cache?: Function | object
): number {
  let version = 0;
  // only proxy property contains interceptor
  // property without interceptor is metadata only attribute
  for (const property of properties) {
    // updates version
    version += property.version;
    members.set(property.key, property.version);

    // can skip if property is exists
    if (cache && Reflect.getOwnPropertyDescriptor(proxy, property.key)) {
      Reflect.deleteProperty(cache, property.key);
      continue;
    }

    // get latest descriptor, design.descriptor is original descriptor
    const descriptor = Reflect.getOwnPropertyDescriptor(prototype, property.key);

    let newDescriptor: PropertyDescriptor;
    if (descriptor) {
      newDescriptor = OnDemandAgentCompiler.makeProperty(property, descriptor, cache || proxy);
    } else {
      newDescriptor = OnDemandAgentCompiler.makeField(property, cache || proxy);
    }
    Reflect.defineProperty(proxy, property.key, newDescriptor);
  }

  return version;
}

class OnDemandAgentCompiler {
  /**
   * Field will only call interceptor for only 1 time
   */
  static makeField(property: PropertyInfo, receiver: Function | object): PropertyDescriptor {
    const cache = new WeakMap<any, any>();
    const descriptor: PropertyDescriptor = {
      configurable: true,
    };
    descriptor.get = function (this: any) {
      const chain = OnDemandInvocationFactory.createFieldInvocation(property, cache);
      descriptor.get = function (this: any) {
        return chain.invoke([], this);
      };
      descriptor.set = function (this: any) {
        return chain.invoke(arguments, this);
      };
      set(receiver, chain.design.key, descriptor);
      return chain.invoke([], this);
    };
    descriptor.set = function (this: any) {
      const chain = OnDemandInvocationFactory.createFieldInvocation(property, cache);
      descriptor.get = function (this: any) {
        return chain.invoke([], this);
      };
      descriptor.set = function (this: any) {
        return chain.invoke(arguments, this);
      };
      set(receiver, chain.design.key, descriptor);
      return chain.invoke(arguments, this);
    };
    return descriptor;
  }

  static makeProperty(
    property: PropertyInfo,
    descriptor: PropertyDescriptor,
    proxy: Function | object
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
        // ************************
        // getter, setter
        // ************************
        propertyDescriptor.get = function (this: any) {
          const getterChain = OnDemandInvocationFactory.createPropertyInvocation(getterFunction, property);
          propertyDescriptor.get = function (this: any) {
            return getterChain.invoke([], this);
          };
          const setterChain = OnDemandInvocationFactory.createPropertyInvocation(setterFunction, property);
          propertyDescriptor.set = function (this: any) {
            setterChain.invoke(arguments, this);
          };
          set(proxy, key, propertyDescriptor);
          return getterChain.invoke([], this);
        };
        propertyDescriptor.set = function (this: any) {
          const getterChain = OnDemandInvocationFactory.createPropertyInvocation(getterFunction, property);
          propertyDescriptor.get = function () {
            return getterChain.invoke([], this);
          };
          const setterChain = OnDemandInvocationFactory.createPropertyInvocation(setterFunction, property);
          propertyDescriptor.set = function () {
            setterChain.invoke(arguments, this);
          };
          set(proxy, key, propertyDescriptor);
          return setterChain.invoke(arguments, this);
        };
      } else {
        // ************************
        // getter
        // ************************
        propertyDescriptor.get = function (this: any) {
          const getterChain = OnDemandInvocationFactory.createPropertyInvocation(getterFunction, property);
          propertyDescriptor.get = function (this: any) {
            return getterChain.invoke([], this);
          };
          set(proxy, key, propertyDescriptor);
          return getterChain.invoke([], this);
        };
      }
    } else if ('function' === typeof setterFunction) {
      // ************************
      //          , setter(yes)
      // ************************
      propertyDescriptor.set = function (this: any) {
        const setterChain = OnDemandInvocationFactory.createPropertyInvocation(setterFunction, property);
        propertyDescriptor.set = function (this: any) {
          return setterChain.invoke(arguments, this);
        };
        set(proxy, key, propertyDescriptor);
        return setterChain.invoke(arguments, this);
      };
    } else if ('function' === typeof defaultValue) {
      // ************************
      // .value = function
      // ************************
      propertyDescriptor.value = function (this: any) {
        let methodChain = OnDemandInvocationFactory.createPropertyInvocation(defaultValue, property);
        propertyDescriptor.value = function (this: any) {
          return methodChain.invoke(arguments, this);
        };
        set(proxy, key, propertyDescriptor);
        return methodChain.invoke(arguments, this);
      };
    } else {
      propertyDescriptor = this.makeField(property, proxy);
    }

    // console.log('descriptor', descriptor);
    // console.log('propertyDescriptor', propertyDescriptor);
    return propertyDescriptor;
  }
}
