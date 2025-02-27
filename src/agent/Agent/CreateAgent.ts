/**
 * Copyright (c) 2016 Ling Zhang
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is provided on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AgentAttribute } from './AgentAttribute';
import { TypeAttribute } from './TypeAttributes';
import { OnDemandInvocationFactory } from './Compiler/OnDemandInvocationFactory';
import { CanDecorate } from './Decorate/CanDecorate';
import { AgentFrameworkError } from './AgentFrameworkError';
import { RememberAgent } from './Knowledges/Agents';
import { GetType } from './Knowledges/Types';
import { OnDemandTypeInfo } from './Reflection/OnDemandTypeInfo';
import { CONSTRUCTOR } from './WellKnown';
import { GetAgentConstructor } from './Knowledges/AgentConstructors';

/**
 * Creates a new agent from the given attribute and registers it in the Agent registry.
 * Always returns a new Agent type.
 *
 * @param type The original class or function to be transformed into an agent.
 * @param strategy (Optional) The attribute defining the agent's strategy.
 * @param version (Optional) A version number to track agent modifications.
 * @returns A newly created Agent type.
 */
export function CreateAgent<T extends Function>(type: T, strategy?: TypeAttribute, version?: number): T {
  // Always create a new agent using the latest annotations.

  // Step 1: Retrieve the original type if the given type is already an agent.
  // If `type` is an agent, extract its original class.
  // This ensures we always create an agent from the raw, unproxied class.
  const target = GetType(type) || type;

  // Step 2: Validate the class name.
  // A valid agent must have a name; otherwise, throw an error.
  const n = target.name;
  if (!n) {
    throw new AgentFrameworkError('InvalidTypeName');
  }

  // Step 3: Validate the strategy type.
  // Ensure the provided strategy is an instance of `AgentAttribute`.
  if (strategy && !(strategy instanceof AgentAttribute)) {
    throw new AgentFrameworkError('InvalidAgentStrategy');
  }

  // Step 4: Create a strategy instance.
  // If a strategy is provided, create a copy of it; otherwise, construct a new `AgentAttribute`.
  const attribute = strategy ? Object.create(strategy) : Reflect.construct(AgentAttribute, [target, type, version]);

  // Step 5: Check if decoration is allowed.
  // If decoration is not permitted, throw an error.
  if (!CanDecorate(attribute, type)) {
    throw new AgentFrameworkError('NoCreateAgentPermission');
  }

  // Step 6: Collect metadata and type information.
  const typeDesign = OnDemandTypeInfo.find(target);
  const typeConstructor = typeDesign.property(CONSTRUCTOR);
  const classDesign = (attribute.type = typeDesign.prototype);
  const classConstructor = (attribute.property = classDesign.property(CONSTRUCTOR));

  // Step 7: Compute the agent version.
  // The version is derived from class metadata and the provided version parameter.
  attribute.name = n;
  attribute.version = classDesign.version + classConstructor.version + (version || 0);

  // Step 8: Create an invocation chain for the agent.
  // The invocation chain is responsible for managing agent creation and interceptors.
  // `decorateAgent()` will insert interceptors into this chain.
  // TODO: Cache the invocation chain to improve performance.
  const chain = OnDemandInvocationFactory.createAgentInvocation(target, typeDesign, typeConstructor, attribute);

  /* eslint-disable-next-line prefer-rest-params */
  const newReceiver = chain.invoke<T>([attribute, GetAgentConstructor(n), Proxy], target);

  // Step 9: Register the newly created agent.
  // This mapping associates the new agent proxy with its original type.
  RememberAgent(target, newReceiver);

  return newReceiver;
}
