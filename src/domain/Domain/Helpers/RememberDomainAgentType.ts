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

import { DomainAgentTypes } from '../DomainKnowledge';
import { DomainLike } from '../DomainLike';

export function RememberDomainAgentType(domain: DomainLike, type: Function, agentType: Function): void {
  let types = DomainAgentTypes.v1.get(type);
  if (!types) {
    types = new WeakMap();
    DomainAgentTypes.v1.set(type, types);
  }
  types.set(domain, agentType);
}
