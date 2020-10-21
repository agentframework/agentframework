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

import { TypeInfo } from './Interfaces/TypeInfo';
import { OnDemandTypeInfo } from './Reflection/OnDemandTypeInfo';

/**
 * Reflector is the interface to access type data from class constructor or class prototype
 *
 * Access class member annotations
 *
 * Reflector(UserClass).property('main');
 *
 * Access class static member annotations
 *
 * Reflector(UserClass).static.property('main');
 */
export function Reflector(target: Function | object): TypeInfo {
  if (new.target) {
    throw new SyntaxError(`Not allow add 'new' keyword for Reflector()`);
  }

  let ctor: Function;
  if (target == null) {
    throw new SyntaxError(`Reflector(null) is not supported`);
  } else if (typeof target === 'function') {
    ctor = target;
  } else if (typeof target === 'object') {
    // if a object hasOwnPropertyDescriptor('constructor') then this object is a prototype
    // instance don't have own constructor property
    if (Reflect.getOwnPropertyDescriptor(target, 'constructor')) {
      throw new SyntaxError(`Reflector(${target.constructor.name}.prototype) is not implemented yet`);
    } else {
      // object without own property constructor consider an instance
      throw new SyntaxError(`Reflector(${target.constructor.name} {}) is not implemented yet`);
    }
  } else {
    // number, boolean, string and so on
    throw new SyntaxError(`Reflector(${typeof target}) is not supported`);
  }

  // make sure get the prototype of origin type
  return OnDemandTypeInfo.get(ctor);
}
