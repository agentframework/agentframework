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

import { Agent, AgentReference } from '../../Agent';
import { DomainLike } from '../../DomainLike';
import { DomainAgents } from './DomainAgents';

export function GetOrCreateDomainAgents(domain: DomainLike): Map<AgentReference, any> {
  const _existsAgents = DomainAgents.v1.get(domain);
  if (!_existsAgents) {
    const _newAgents = new Map();
    DomainAgents.v1.set(domain, _newAgents);
    return _newAgents;
  }
  return _existsAgents;
}

export function GetDomainAgent<T extends AgentReference>(domain: DomainLike, identifier: T): Agent<T> | undefined {
  const _agents = DomainAgents.v1.get(domain);
  if (_agents) {
    return _agents.get(identifier);
  }
  return undefined;
}

export function ForgetDomainAgent<T extends AgentReference>(
  domain: DomainLike,
  identifier: T,
  agent: Agent<T>
): boolean {
  const _agents = DomainAgents.v1.get(domain);
  if (_agents && _agents.has(identifier) && _agents.get(identifier) === agent) {
    _agents.delete(identifier);
    // do not dispose because this agent may used by others
    return true;
  }
  return false;
}

export function DisposeDomainAgents<T extends AgentReference>(domain: DomainLike): void {
  const _agents = DomainAgents.v1.get(domain);
  if (_agents) {
    for (const agent of _agents.values()) {
      if (typeof agent === 'object' && agent != null && typeof agent.dispose === 'function') {
        //  TODO: only dispose the agent of current domain
        agent.dispose();
      }
    }
    _agents.clear();
  }
}

export function SetDomainAgent<T extends AgentReference>(domain: DomainLike, identifier: T, agent: Agent<T>): void {
  const _agents = GetOrCreateDomainAgents(domain);
  _agents.set(identifier, agent);
}

export function RememberDomainAgent<T extends AgentReference>(domain: DomainLike, agent: Agent<T>): void {
  const _agents = GetOrCreateDomainAgents(domain);
  let ctor: Function | null | undefined = agent.constructor;
  while (ctor && !_agents.has(ctor) && Function.prototype !== ctor) {
    _agents.set(ctor, agent);
    ctor = Reflect.getPrototypeOf(ctor) as Function;
  }
}
