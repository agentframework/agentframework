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

import { TypeInfo } from './Reflection/TypeInfo';
import { OnDemandTypeInfo } from './Reflection/OnDemandTypeInfo';
import { AgentFrameworkError } from './AgentFrameworkError';
import { CONSTRUCTOR } from './WellKnown';
import { GetType } from './Knowledges/Types';

/**
 * Reflector is the interface to access type data from class constructor or class prototype
 *
 * Access class member annotations
 *
 * Reflector(UserClass).property('main');               // for class member
 * Reflector(UserClass).prototype.property('main');     // for class member
 * Reflector(UserClass).static.property('main');        // for static member
 *
 * Access class static member annotations
 *
 * Reflector(UserClass.prototype).property('main');   // for class member
 * Reflector(UserClass).property('main');             // for static member
 */
export function Reflector(target: Function | object): TypeInfo {
  if (typeof target === 'function') {
    // make sure get the prototype of origin type
    return OnDemandTypeInfo.find(GetType(target.prototype) || target.prototype);
  } else if (target == null) {
    throw new AgentFrameworkError(`NotSupported: Reflector(null) is not supported`);
  } else if (typeof target === 'object') {
    // if a object hasOwnPropertyDescriptor('constructor') then this object is a prototype
    // instance don't have own constructor property
    if (Reflect.getOwnPropertyDescriptor(target, CONSTRUCTOR)) {
      return OnDemandTypeInfo.find(GetType(target) || target);
    } else {
      // object without own property constructor consider an instance
      throw new AgentFrameworkError(`NotSupported: Reflector(${target.constructor.name} {}) is not supported`);
    }
  } else {
    // number, boolean, string and so on
    throw new AgentFrameworkError(`NotSupported: Reflector(${typeof target}) is not supported`);
  }
}
