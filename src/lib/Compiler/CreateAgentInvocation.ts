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

import { InitializerInvocation } from './Invocation/InitializerInvocation';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { IInvocation } from '../Core/IInvocation';
import { Agents } from '../Internal/Cache';
import { IAttribute } from '../Core/IAttribute';

/**
 * Build Agent using AgentAttribute
 */
export function CreateAgentInvocation<C extends Function>(target: C, attribute: IAttribute): C {
  if (Agents.has(target)) {
    return target;
  }

  // chain the pipeline
  // custom interceptors -> agent interceptor -> agent initializer -> agent invocation
  let invocation: IInvocation = new AgentInvocation(target);

  // add agent initializer into pipeline
  const initializer = attribute.initializer;
  if (initializer && 'function' === typeof initializer.initialize) {
    invocation = new InitializerInvocation(invocation, initializer);
  }
  // add agent interceptor into pipeline
  const interceptor = attribute.interceptor;
  if (interceptor && 'function' === typeof interceptor.intercept) {
    invocation = new InterceptorInvocation(invocation, interceptor);
  }

  const newTarget = invocation.invoke<C>(arguments);
  if (newTarget !== target) {
    Agents.set(newTarget, target);
  }
  return newTarget;
}
