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

import { remember } from '../../dependencies/core';
import { Domain } from './Domain';

/**
 * Get agent of giving type
 */
export class Agents {
  // key: Original Constructor, value: Agent Constructor
  @remember('Agents')
  static get v1(): WeakMap<Function, Function> {
    return new Map();
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
  @remember('Domains')
  static get v1(): WeakMap<Function | object, Domain | undefined> {
    return new Map();
  }
}

/**
 * Get agent of giving domain and type
 */
export class DomainAgents {
  // key: Original Constructor, value: Agent Constructor
  @remember('DomainAgents')
  static get v1(): WeakMap<Function, Map<Domain, Function>> {
    return new Map();
  }
}

/**
 * Get type of giving string id
 */
export class NamedTypes {
  // key: string, value: Constructor
  @remember('NamedTypes')
  static get v1(): Map<string, unknown> {
    return new Map();
  }
}

/**
 * Get initializers of giving type
 */
export class Initializers {
  // key: class, value: [Initializer Function, Class]
  @remember('Initializers')
  static get v1(): WeakMap<Function, Array<[Function, Function]>> {
    return new Map();
  }
}
