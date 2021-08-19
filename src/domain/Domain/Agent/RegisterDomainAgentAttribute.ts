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

import { Arguments } from '../../../dependencies/core';
import { Domain } from '../Domain';
import { DomainAgentAttribute } from './DomainAgentAttribute';
// import { RememberAgentType } from '../../../core/Core/Helpers/AgentHelper';
// import { DomainLike } from '../DomainLike';
// import { IsDomainType } from '../Helpers/IsDomain';
// import { HasPrototype } from '../Helpers/HasPrototype';
// import { Domain } from '../Domain';
// import { OnDemandClassConstructor } from './DomainAgentConstructor';

export class RegisterDomainAgentAttribute extends DomainAgentAttribute {
  constructor(readonly domain: Domain) {
    super();
  }

  construct<T extends Function>(target: T, params: Arguments, newTarget: T): any {
    const agent = super.construct(target, params, newTarget);
    this.domain.addAgent(newTarget, agent);
    return agent;
  }
}
