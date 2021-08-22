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

import { AgentAttribute } from './AgentAttribute';
import { ClassAttribute } from '../Interfaces/TypeAttributes';
import { GetType, RememberAgent } from '../Helpers/AgentHelper';
import { InvocationFactory } from '../Compiler/InvocationFactory';
import { CanDecorate } from '../Decorator/CanDecorate';
import { AgentFrameworkError } from '../AgentFrameworkError';

/**
 * Create a new agent from attribute, and add into Agent registry
 *
 * @param type
 * @param strategy
 */
export function CreateAgent<T extends Function>(type: T, strategy?: ClassAttribute): T {
  // always create new agent using latest annotation

  // 1. get original type if giving type is an agent type
  // target is an agent already
  // set the target to origin type to recreate this
  // so create another proxy from this origin class
  const attribute = strategy || Reflect.construct(AgentAttribute, []);

  if (!CanDecorate(attribute, type)) {
    throw new AgentFrameworkError('NoPermissionToCreateAgent');
  }

  // ALWAYS create agent from raw type
  const receiver = GetType(type) || type;
  // classic
  // create an invocation for agent type.
  // this chain used to generate agent of this target
  // empty agent
  const chain = InvocationFactory.createAgentInvocation(receiver, attribute);

  // create a new type from this invocation, initialize the agent using reflection info
  /* eslint-disable-next-line prefer-rest-params */
  const newAgent = chain.invoke<T>([receiver.name, attribute, Proxy], receiver);

  // register new agent map to old type
  // key: Agent proxy, value: origin type
  RememberAgent(newAgent, receiver);

  return newAgent;
}
