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

import { Remember } from '../../dependencies/core';
import { Domain } from './Domain';

/**
 * Get agent of giving type
 */
export class Agents {
  // key: Original Constructor, value: Agent Constructor
  static get v1() {
    return Remember<WeakMap<Function, Function>>(this, 'Agents', 'v1', Map);
  }
}

/**
 * Get domain of giving instance or type
 */
export class Domains {
  // key: Agent Type,             value: Domain instance
  // key: Agent Type Prototype,   value: Domain instance
  // key: Domain instance,        value: Domain instance
  // key: Domain Type Prototype,  value: Domain Type Prototype
  static get v1() {
    return Remember<WeakMap<Function | object, Domain | undefined>>(this, 'Domains', 'v1', Map);
  }
}

/**
 * Get agent of giving domain and type
 */
export class DomainAgents {
  // key: Original Constructor, value: Agent Constructor
  static get v1() {
    return Remember<WeakMap<Function, Map<Domain, Function>>>(this, 'DomainAgents', 'v1', Map);
  }
}

/**
 * Get type of giving string id
 */
export class NamedTypes {
  // key: string, value: Constructor
  static get v1() {
    return Remember<Map<string, unknown>>(this, 'NamedTypes', 'v1', Map);
  }
}

/**
 * Get initializers of giving type
 */
export class Initializers {
  // key: class, value: [Initializer Function, Class]
  static get v1() {
    return Remember<WeakMap<Function, Array<[Function, Function]>>>(this, 'Initializers', 'v1', Map);
  }
}
