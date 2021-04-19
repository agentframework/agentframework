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
import { AgentAttribute } from './AgentAttribute';
import { GetAgentType, RememberAgentType } from '../Helpers/AgentType';
import { AgentInvocation } from './AgentInvocation';
import { ClassAttribute } from '../Interfaces/TypeAttributes';
import { OnDemandTypeInfo } from '../Reflection/OnDemandTypeInfo';
import { ChainFactory } from '../Compiler/Factory/ChainFactory';
import { Invocation } from '../Interfaces/Invocation';
import { AgentFrameworkError } from '../Error/AgentFrameworkError';
import { AbstractConstructor } from '../Constructor';
import { HasInterceptor } from '../Helpers/Interceptor';

/**
 * Create a new agent from attribute, and add into Agent registry
 *
 * @param type
 * @param strategy
 */
export function CreateAgent<T extends AbstractConstructor<any>>(type: T, strategy?: ClassAttribute): T {
  // always create new agent using latest annotation

  // 1. get original type if giving type is an agent type
  // target is an agent already
  // set the target to origin type to recreate this
  // so create another proxy from this origin class
  const target = GetAgentType(type) || type;

  if (!target.name) {
    throw new AgentFrameworkError('InvalidClassName');
  }

  const handlers = strategy || Reflect.construct(AgentAttribute, [type]);

  const design = OnDemandTypeInfo.find(target);

  let invocation: Invocation = new AgentInvocation(design);

  if (design.hasOwnInterceptor()) {
    const interceptors = design.findOwnAttributes(HasInterceptor);
    //.concat(property.value.findOwnAttributes(HasInterceptor));
    invocation = ChainFactory.chainInterceptorAttributes(invocation, interceptors);
  }

  // classic
  // create an invocation for agent type.
  // this chain used to generate agent of this target
  // empty agent
  const chain = CreateAgentInvocation(invocation, handlers, target);

  // create a new type from this invocation, initialize the agent using reflection info
  /* eslint-disable-next-line prefer-rest-params */
  const agent = chain.invoke<T>([Function, target.name, handlers], target);

  // register new agent map to old type
  // key: Agent proxy, value: origin type
  // if (agent !== target) {
  RememberAgentType(agent, target);
  // }

  return agent;
}
