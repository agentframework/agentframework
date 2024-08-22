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

import { TypeAttribute } from '../../../dependencies/agent';
import { Domain } from '../Domain';
import { RememberDomain } from '../Helpers/RememberDomain';
import { RememberDomainDomainAgentType } from '../Helpers/RememberDomainDomainAgentType';
import { CompileDomainAgent } from './CompileDomainAgent';

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

  // able to use agent to find domain
  RememberDomain(newCreatedDomainAgent, domain);
  RememberDomain(newCreatedDomainAgent.prototype, domain);

  // able to list all agent in a domain
  RememberDomainDomainAgentType(domain, type, newCreatedDomainAgent);
  RememberDomainDomainAgentType(domain, newCreatedDomainAgent, newCreatedDomainAgent);

  return newCreatedDomainAgent;
}
