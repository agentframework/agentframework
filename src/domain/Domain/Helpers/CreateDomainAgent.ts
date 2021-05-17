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

import { AgentFrameworkError, ClassAttribute, CreateAgent } from '../../../dependencies/core';
import { DomainAgentAttribute } from '../Attributes/DomainAgentAttribute';
import { Domain } from '../Domain';
import { GetDomain } from './GetDomain';
import { RememberDomain } from './RememberDomain';
import { RememberDomainAgent } from './RememberDomainAgent';

export function CreateDomainAgent<T extends Function>(domain: Domain, type: T, strategy?: ClassAttribute): T {
  // check owner domain
  const owner = GetDomain(type);
  if (owner && domain !== owner) {
    throw new AgentFrameworkError('NotSupportCreateAgentForOtherDomain');
  }

  // 1. get original type if giving type is an agent type
  // const origin = Knowledge.GetType(type);
  // if (origin) {
  //   // target is an agent already
  //   // set the target to origin type to recreate this
  //   // so create another proxy from this origin class
  //   console.log('exists domain type', type);
  //   type = origin;
  // }

  // if (typeof domain.constructor.name === 'function') {
  //   debugger;
  //   console.log('<< CREATE >>', domain.constructor.name, '====>', type.name);
  // }

  const createAgentStrategy =
    strategy ||
    domain.getAgent(DomainAgentAttribute) ||
    Reflect.construct(domain.getType(DomainAgentAttribute) || DomainAgentAttribute, [domain]);

  // upgrade to Agent only if interceptor or initializer found
  const newCreatedAgent = CreateAgent(type, createAgentStrategy);
  // console.log('found', domain, type, newType)
  // const name = Reflector(type).name;
  // const factory = Function(name, [`return`, `class`, `${name}$`, `extends`, name, '{}'].join(' '));
  // const newType = factory(type);
  // Knowledge.RememberType(domainAgent, type);
  // DomainKnowledge.RememberDomainAgent(domain, type, domainAgent);
  RememberDomain(newCreatedAgent, domain);
  RememberDomain(newCreatedAgent.prototype, domain);

  RememberDomainAgent(domain, type, newCreatedAgent);
  RememberDomainAgent(domain, newCreatedAgent, newCreatedAgent);
  // this._upgrades.set(type, newCreatedAgent);
  // this._upgrades.set(newCreatedAgent, newCreatedAgent);

  return newCreatedAgent;
}
