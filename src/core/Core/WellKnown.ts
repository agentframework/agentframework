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

import { remember } from './Decorators/Remember/remember';
import { TypeInvocation } from './Interfaces/TypeInvocations';

export const CONSTRUCTOR = 'constructor';

export const INVOKE = 'invoke';

/**
 * Get original type of giving type
 */
export class Types {
  // core
  // key: agent | class, value: class
  @remember('Types')
  static get v1() {
    return new WeakMap<Function | object, Function | object>();
  }
}

/**
 * Get original type of giving agent
 */
export class Agents {
  // key: agent | agent.prototype, value: class | class.prototype
  @remember('Agents')
  static get v1() {
    return new WeakMap<Function | object, Function | object>();
  }
}

/**
 * Gets or sets interceptor for specified attribute
 */
export class CustomInterceptors {
  @remember('CustomInterceptors')
  static get v1() {
    return new WeakMap<Function, [Function, unknown]>();
  }
}

/**
 * Gets or sets invocations of giving type (to improve both `new Class()` perf and bootstrap perf)
 */
export class ClassInvocations {
  @remember('ClassInvocations')
  static get v1() {
    return new WeakMap<Function, TypeInvocation>();
  }
}

/**
 * Get object of giving string id
 */
export class Namespaces {
  // key: string, value: Constructor
  @remember('Namespaces')
  static get v1() {
    return new Map<string, unknown>();
  }
}

/**
 * Global Singleton instance
 */
export class Singletons {
  // key: class, value: singleton instance
  @remember('Singletons')
  static get v1() {
    return new WeakMap<Function | object, Function | object>();
  }
}
