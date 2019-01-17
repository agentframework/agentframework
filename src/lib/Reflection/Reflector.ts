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

import { Type } from './Type';
import { Agents } from '../Internal/Cache';

/**
 * Reflector is the interface to access type data from class or class instance or class prototype
 */
export function Reflector(target: Function | Object): Type {
  if (new.target) {
    // NOTE: in AgentFramework 1.0, the reflection data can only set on Class.
    // At present, we didn't found any use case to access reflection data on instance.
    // We will added the support if got enough requirements.
    throw new SyntaxError(`Not allow calling new Reflector`);
  }

  let ctor;
  if ('function' === typeof target) {
    ctor = target;
  } else if ('object' === typeof target) {
    // if a object hasOwnPropertyDescriptor('constructor') then this object is a prototype
    const constructor = Object.getOwnPropertyDescriptor(target, 'constructor');
    if (constructor && 'function' === typeof constructor.value) {
      return Type.of(target);
    } else {
      throw new Error('AgentFramework 1.x do not support access metadata on instance');
    }
  } else {
    // number, boolean
    throw new TypeError(`Reflection target type is not supported`);
  }

  let proto;
  // make sure get the prototype of origin type
  if (Agents.has(ctor)) {
    proto = Agents.get(ctor)!.prototype;
  } else {
    proto = ctor.prototype;
  }

  return Type.of(proto);
}
