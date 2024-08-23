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

export function GetDomainAgent<T extends AgentReference>(domain: DomainLike, identifier: T): Agent<T> | undefined {
  const map = DomainAgents.v1.get(domain);
  if (map) {
    return map.get(identifier);
  }
  return undefined;
}
