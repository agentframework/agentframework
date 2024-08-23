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

import { Once } from '../../dependencies/agent';
import { InMemoryDomain } from './InMemoryDomain';
import { Agent, AgentReference } from './Agent';
import { SubDomainLike } from './SubDomainLike';
import { DomainLike } from './DomainLike';
import { GetDomain } from './Knowledges/Domains/Domains';
import { GetGlobalDomain } from './Knowledges/Domains/GetGlobalDomain';

export class InMemorySubDomain extends InMemoryDomain implements SubDomainLike {
  get domain(): DomainLike {
    // GetDomain(this) will return this. So must use GetDomain(this.constructor)
    return Once(this, 'domain', GetDomain(this.constructor) || GetGlobalDomain());
  }

  getType<T extends Function>(type: T): T | undefined {
    return super.getType<T>(type) || this.domain.getType<T>(type);
  }

  getAgentType<T extends Function>(type: T): T | undefined {
    return super.getAgentType<T>(type) || this.domain.getAgentType<T>(type);
  }

  getOwnAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined {
    return super.getAgent<T>(identifier);
  }

  getAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined {
    return super.getAgent<T>(identifier) || this.domain.getAgent<T>(identifier);
  }
}
