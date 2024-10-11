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
 * Create a new agent from attribute, and add into Agent registry
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

  // create a cache layer for strategy, just in case
  const attribute = strategy ? Object.create(strategy) : Reflect.construct(AgentAttribute, [target, type, version]);

  if (!CanDecorate(attribute, type)) {
    throw new AgentFrameworkError('NoCreateAgentPermission');
  }

  // Collect information of this target
  const design = OnDemandTypeInfo.find(target);
  const classDesign = (attribute.type = design.prototype);
  const classConstructor = (attribute.property = design.property(CONSTRUCTOR));

  // calculate total version according to the information above
  attribute.version = classDesign.version + classConstructor.version + (version || 0);

  // create an invocation for agent type.
  // this chain used to generate agent of this target
  // empty agent
  // TODO: cache the chain to improve performance
  const chain = OnDemandInvocationFactory.createAgentInvocation(target, classDesign, classConstructor, attribute);

  // create a new type from this invocation, initialize the agent using reflection info
  const id = target.name;
  // console.log('ID:=>>>', id, receiver.toString());

  // TODO: validate the id for the class
  if (!id) {
    throw new AgentFrameworkError('InvalidTypeName');
  }

  // make the proxy
  // performance test result shows the cached function has the best performance than native code
  const agent = Function(
    `$${id}`,
    '$',
    '$$',
    `
class ${id}1 extends $${id} {
  static {
    console.log('  static of class')
  }
  constructor(...params) {
    // call static constructor for once
    console.log('ctor of class')
    return $$(super(...$($${id}, ${id}1, ${id}$, params)));
    //return super(...params);
  }
}
class ${id}$ extends ${id}1 { /*[generated code]*/ }
return ${id}$`
  );

  console.log('before newReceiver');

  /* eslint-disable-next-line prefer-rest-params */
  const newReceiver = chain.invoke<T>([attribute, agent, Proxy], target);

  console.log('after newReceiver', newReceiver.toString());
  // console.log(Reflector(newReceiver))

  // register new agent map to old type
  // key: Agent proxy, value: origin type
  RememberAgent(target, newReceiver);

  return newReceiver;
}
