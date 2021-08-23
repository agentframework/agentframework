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

import { Arguments, TypeInvocation } from '../../../dependencies/core';
import { DomainLike } from '../DomainLike';
import { DomainAgentAttribute } from './DomainAgentAttribute';

/**
 * Register agent to domain
 */
export class RegisterDomainAgentAttribute extends DomainAgentAttribute {
  constructor(domain: DomainLike) {
    super(domain);
  }

  intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
    const type = super.intercept(target, params, receiver);
    this.domain.addType(type);
    return type;
  }

  construct<T extends Function>(target: T, params: Arguments, receiver: T): any {
    const agent = super.construct(target, params, receiver);
    this.domain.addAgent(receiver, agent);
    return agent;
  }
}
