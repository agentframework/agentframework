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

import { CreateAgentInvocation } from './CreateAgentInvocation';
import { Wisdom } from '../Wisdom';
import { AgentAttribute } from './AgentAttribute';

/**
 * Create a new agent from attribute, and add into Agent registry
 *
 * @param type
 * @param options
 */
export function CreateAgent<T extends Function>(type: T, options?: AgentAttribute): T {
  // always create new agent using latest annotation

  // 1. get original type if giving type is an agent type
  const origin = Wisdom.GetType(type);
  if (origin) {
    // target is an agent already
    // set the target to origin type to recreate this
    // so create another proxy from this origin class
    type = origin;
  }

  // classic
  // create an invocation for agent type
  const invocation = CreateAgentInvocation(type, options || new AgentAttribute());

  // create a new type from this invocation
  /* eslint-disable-next-line prefer-rest-params */
  const agent = invocation.invoke<T>([], type);

  // register new agent map to old type
  // key: Agent proxy, value: origin type
  if (agent !== type) {
    Wisdom.RememberType(agent, type);
  }

  return agent;
}
[];
