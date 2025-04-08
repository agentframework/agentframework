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

import { AgentReference } from '../Agent';
import { DomainLike } from '../DomainLike';

/**
 * In Memory is going to remove, in order to make full tree shakeable library
 */
export class InMemory {
  private readonly identifiers = new Map<AgentReference, any>(); // type-instance mapping
  private readonly futures = new Map<AgentReference, Promise<any>>(); // type-instance mapping (Promise)

  private static readonly domains = new WeakMap<object, InMemory>();

  private static domain(domain: DomainLike): InMemory {
    let value = this.domains.get(domain);
    if (!value) {
      value = new InMemory();
      this.domains.set(domain, value);
    }
    return value;
  }

  // type-instance mapping
  static agents(domain: DomainLike): Map<AgentReference, any> {
    return this.domain(domain).identifiers;
  }

  // type-promise<instance> mapping
  static incomingAgents(domain: DomainLike): Map<AgentReference, Promise<any>> {
    return this.domain(domain).futures;
  }
}
