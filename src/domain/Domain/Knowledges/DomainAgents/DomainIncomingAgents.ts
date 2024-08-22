/* Copyright 2024 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { Remember } from '../../../../dependencies/agent';
import { AgentReference } from '../../Agent';

/**
 * @private
 * Map a type to another type
 */
export class DomainIncomingAgents {
  // key: Original Constructor, value: WeakMap<Domain, Agent Constructor>
  static get v1() {
    return Remember('DomainIncomingAgents', this, 'v1', () => new WeakMap<Function, Map<AgentReference, any>>());
  }
}
