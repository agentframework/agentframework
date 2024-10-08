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

import { InMemoryDomain } from './InMemoryDomain';
import { GetDomain } from './Helpers/GetDomain';
import { Agent, AgentReference } from './Agent';
import { SubDomainLike } from './SubDomainLike';
import { DomainLike } from './DomainLike';
import { GetSystemDomain } from './Helpers/GetSystemDomain';
import { Once } from '../../dependencies/agent';

export class InMemorySubDomain extends InMemoryDomain implements SubDomainLike {

  get parent(): DomainLike {
    // GetDomain(this) will return this. So must use GetDomain(this.constructor)
    return Once(this, 'parent', GetDomain(this.constructor) || GetSystemDomain());
  }
  
  getAgentType<T extends Function>(type: T): T | undefined {
    return super.getAgentType<T>(type) || this.parent.getAgentType<T>(type);
  }

  getOwnType<T extends Function>(type: T): T | undefined {
    return super.getType<T>(type);
  }

  getType<T extends Function>(type: T): T | undefined {
    return super.getType<T>(type) || this.parent.getType<T>(type);
  }

  getOwnAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined {
    return super.getAgent<T>(identifier);
  }

  getAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined {
    return super.getAgent<T>(identifier) || this.parent.getAgent<T>(identifier);
  }
}
