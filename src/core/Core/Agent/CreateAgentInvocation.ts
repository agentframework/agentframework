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

import { Invocation } from '../Interfaces/Invocation';
import { InterceptorInvocation } from '../Compiler/Invocation/InterceptorInvocation';
import { Attribute } from '../Interfaces/Attribute';
import { CanDecorate } from '../Decorator/CanDecorate';
import { GetInterceptor, HasInterceptor } from '../Helpers/CustomInterceptor';
import { ChainFactory } from '../Compiler/Factory/ChainFactory';
import { AgentInvocation } from './AgentInvocation';

/**
 * Build Agent using AgentAttribute
 */
export function CreateAgentInvocation(target: Function, attribute: Attribute): Invocation {
  //
  const invocation = new AgentInvocation(target);
  const design = invocation.design;

  // todo: cache the chain for this target
  let chain: Invocation = invocation;
  // chain user defined class attribute
  if (design.hasOwnInterceptor()) {
    const interceptors = design.findOwnAttributes(HasInterceptor);
    //.concat(property.value.findOwnAttributes(HasInterceptor));
    chain = ChainFactory.chainInterceptorAttributes(chain, interceptors);
  }

  // todo: cache do not include this attribute
  // add single interceptor into pipeline (optional)
  if (CanDecorate(attribute, target)) {
    const interceptor = GetInterceptor(attribute);
    if (interceptor) {
      chain = new InterceptorInvocation(chain, interceptor);
    }
  }

  return chain;
}
