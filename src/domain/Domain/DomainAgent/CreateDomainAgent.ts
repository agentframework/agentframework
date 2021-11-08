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

import { AgentFrameworkError, TypeAttribute, CreateAgent } from '../../../dependencies/agent';
import { DomainAgentAttribute } from './DomainAgentAttribute';
import { Domain } from '../Domain';
import { GetDomain } from '../Helpers/GetDomain';
import { RememberDomain } from '../Helpers/RememberDomain';
import { RememberDomainAgent } from '../Helpers/RememberDomainAgent';

export function CompileDomainAgent<T extends Function>(
  domain: Domain,
  type: T,
  strategy?: TypeAttribute,
  version?: number
): T {
  // check owner domain
  const owner = GetDomain(type);
  if (owner && domain !== owner) {
    throw new AgentFrameworkError('NotSupportCreateAgentForOtherDomain');
  }

  // can not use domain.construct here
  const attribute =
    strategy ||
    domain.getAgent(DomainAgentAttribute) ||
    Reflect.construct(domain.getType(DomainAgentAttribute) || DomainAgentAttribute, [domain]);

  // upgrade to Agent only if interceptor or initializer found
  return CreateAgent(type, attribute, version);
}

/**
 * This function only called once per domain
 */
export function CreateDomainAgent<T extends Function>(
  domain: Domain,
  type: T,
  strategy?: TypeAttribute,
  version?: number
): T {
  // upgrade to Agent only if interceptor or initializer found
  const newCreatedDomainAgent = CompileDomainAgent(domain, type, strategy, version);

  RememberDomain(newCreatedDomainAgent, domain);
  RememberDomain(newCreatedDomainAgent.prototype, domain);

  RememberDomainAgent(domain, type, newCreatedDomainAgent);
  RememberDomainAgent(domain, newCreatedDomainAgent, newCreatedDomainAgent);

  return newCreatedDomainAgent;
}
