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

import { Remember } from '../../dependencies/agent';
import { Domain } from './Domain';

export class SingletonAgents {
  // key: class, value: singleton instance
  static get v1() {
    return Remember('SingletonAgents', this, 'v1', () => new WeakMap<Function, Function>());
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
    return Remember('Domains', this, 'v1', () => new WeakMap<Function | object, Domain | undefined>());
  }
}

/**
 * Get agent of giving domain and type
 */
export class DomainAgents {
  // key: Original Constructor, value: Agent Constructor
  static get v1() {
    return Remember('DomainAgents', this, 'v1', () => new WeakMap<Function, Map<Domain, Function>>());
  }
}
