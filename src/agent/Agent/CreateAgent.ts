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
import { TypeAttribute } from './TypeAttributes';
import { OnDemandInvocationFactory } from './Compiler/OnDemandInvocationFactory';
import { CanDecorate } from './Decorate/CanDecorate';
import { AgentFrameworkError } from './AgentFrameworkError';
import { RememberAgent } from './Knowledges/Agents';
import { GetType } from './Knowledges/Types';
import { OnDemandTypeInfo } from './Reflection/OnDemandTypeInfo';
import { CONSTRUCTOR } from './WellKnown';

/**
 * Create a new agent from attribute, and add into Agent registry, do not cache anything
 *
 * @param type
 * @param strategy
 * @param version
 */
export function CreateAgent<T extends Function>(type: T, strategy?: TypeAttribute, version?: number): T {
  // always create new agent using the latest annotation

  // 1. get original type if giving type is an agent type
  // target is an agent already
  // set the target to origin type to recreate this
  // creates another proxy from this origin class

  // ALWAYS create agent from raw type
  // this will return the origin type
  const target = GetType(type) || type;

  // create a cache layer for strategy
  const attribute = strategy ? Object.create(strategy) : Reflect.construct(AgentAttribute, [type, target, version]);

  if (!CanDecorate(attribute, type)) {
    throw new AgentFrameworkError('NoCreateAgentPermission');
  }

  // Collect information of this target
  const staticDesign = OnDemandTypeInfo.find(target);
  const classDesign = (attribute.type = staticDesign.prototype);
  const classConstructor = (attribute.property = classDesign.property(CONSTRUCTOR));

  // calculate total version according to the information above
  attribute.version = classDesign.version + classConstructor.version + (version || 0);

  //console.log('design1', staticDesign)
  //console.log('design2', staticDesign.property(CONSTRUCTOR))
  //console.log('design3', staticDesign.prototype)
  //console.log('design4', staticDesign.prototype.property(CONSTRUCTOR))

  // create an invocation for agent type.
  // this chain used to generate agent of this target
  // empty agent
  const chain = OnDemandInvocationFactory.createAgentInvocation(target, staticDesign, attribute);

  // create a new type from this invocation, initialize the agent using reflection info
  /* eslint-disable-next-line prefer-rest-params */
  const newReceiver = chain.invoke<T>([target.name, Proxy, attribute], target);

  // register new agent map to old type
  // key: Agent proxy, value: origin type
  RememberAgent(target, newReceiver);

  return newReceiver;
}
