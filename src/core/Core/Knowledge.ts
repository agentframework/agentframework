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
import { Remember } from './Wisdom/Remember';

/**
 * Get original type of giving agent
 */
export class Types {
  // core
  // key: Agent Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
  static get v1() {
    return Remember<Map<Function | object, Function | object>>(this, 'v1', Map);
  }
}

/**
 * Get invocations of giving type
 */
export class Invocations {
  static get v1() {
    return Remember<Map<Function, Invocation>>(this, 'v1', Map);
  }
}

/**
 * Get interceptors of giving type
 */
export class Interceptors {
  static get v1() {
    return Remember<Map<Function, [Function, unknown]>>(this, 'v1', Map);
  }
}
