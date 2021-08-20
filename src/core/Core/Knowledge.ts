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

import { Invocation } from './Interfaces/Invocation';
import { remember } from './Decorators/Remember/remember';

/**
 * Get original type of giving agent
 */
export class Types {
  // core
  // key: Agent Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
  @remember('Types')
  static get v1() {
    return new WeakMap<Function | object, Function | object>();
  }
}

/**
 * Get invocations of giving type
 */
export class Invocations {
  @remember('Invocations')
  static get v1() {
    return new WeakMap<Function, Invocation>();
  }
}

/**
 * Get interceptors of giving type
 */
export class Interceptors {
  @remember('Interceptors')
  static get v1() {
    return new WeakMap<Function, [Function, unknown]>();
  }
}

/**
 * Get initializers of giving type
 */
export class Initializers {
  // key: class, value: [Initializer Function, Class]
  @remember('Initializers')
  static get v1() {
    return new WeakMap<Function, Array<[Function, Function]>>();
  }
}

/**
 * Get type of giving string id
 */
export class NamedTypes {
  // key: string, value: Constructor
  @remember('NamedTypes')
  static get v1() {
    return new Map<string, unknown>();
  }
}

export class Agents {
  // key: class, value: singleton instance
  @remember('Agents')
  static get v1() {
    return new WeakMap<Function, Function>();
  }
}
