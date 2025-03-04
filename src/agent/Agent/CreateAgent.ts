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
import { OnDemandInvocationFactory } from './Compiler/OnDemandInvocationFactory';
import { CanDecorate } from './Decorate/CanDecorate';
import { AgentFrameworkError } from './AgentFrameworkError';
import { RememberAgent } from './Knowledges/Agents';
import { GetType } from './Knowledges/Types';
import { OnDemandTypeInfo } from './Reflection/OnDemandTypeInfo';
import { CreateAgentConfiguration } from './CreateAgentConfiguration';
import { TypeAttribute } from './TypeAttributes';
import { CONSTRUCTOR } from './WellKnown';
import { CreateAgentType } from './Knowledges/AgentTypes';

/**
 * Creates a new agent type from giving class type with specified attribute and registers it in the Agent registry.
 * Always returns a new Agent type.
 *
 * @param type The original class or function to be transformed into an agent.
 * @param strategy (Optional) The attribute defining the agent's strategy.
 * @param version (Optional) A version number to track agent modifications.
 * @returns A newly created Agent type.
 */
export function CreateAgent<T extends Function>(type: T, strategy?: TypeAttribute, version?: number): T {
  // Always create a new agentType using the latest annotations.

  // Step 1: Retrieve the original type if the given type is already an agentType.
  // If `type` is an agentType, extract its original class.
  // This ensures we always create an agentType from the raw, unproxied class.
  const target = GetType(type) || type;

  // Step 2: Validate the class name.
  // A valid agentType must have a name; otherwise, throw an error.
  const id = target.name;
  if (!id) {
    throw new AgentFrameworkError('InvalidTypeName');
  }

  // Step 3: Create a strategy instance.
  // If a strategy is provided, create a copy of it; otherwise, construct a new `AgentAttribute`.
  let attribute: CreateAgentConfiguration;
  if (strategy) {
    // Step 4: Validate the strategy type. (if have)
    // Ensure the provided strategy is an instance of `AgentAttribute`.
    if (Reflect.has(strategy, 'construct')) {
      attribute = Object.create(strategy);
    } else {
      throw new AgentFrameworkError('InvalidAgentStrategy');
    }
  } else {
    attribute = Reflect.construct(AgentAttribute, [target, type, version]);
  }

  // Step 5: Check if decoration is allowed.
  // If decoration is not permitted, throw an error.
  if (!CanDecorate(attribute, target)) {
    throw new AgentFrameworkError('NoCreateAgentPermission');
  }

  // Step 6: Retrieve metadata and type information.
  const typeDesign = OnDemandTypeInfo.find(target);
  const typeConstructor = typeDesign.property(CONSTRUCTOR);
  const receiver = CreateAgentType(id);

  // Step 7: Create an invocation chain for the agentType.
  // The invocation chain is responsible for managing agentType creation and interceptors.
  // `decorateAgent()` will insert interceptors into this chain.
  // TODO: Cache the invocation chain to improve performance. key: typeConstructor + attribute
  const chain = OnDemandInvocationFactory.createAgentInvocation(target, typeDesign, typeConstructor, attribute);

  /* eslint-disable-next-line prefer-rest-params */
  const newReceiver = chain.invoke<T>([attribute, target], receiver);

  // Step 8: Register the newly created agentType type.
  // This mapping associates the new agentType proxy with its original type.
  RememberAgent(target, newReceiver);

  return newReceiver;
}
