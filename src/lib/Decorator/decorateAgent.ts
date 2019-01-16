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

import { IAttribute } from '../Core/IAttribute';
import { CanDecorate } from '../Compiler/Internal/Utils';
import { CreateAgentInvocation } from '../Compiler/CreateAgentInvocation';
import { AgentAttribute } from '../Compiler/AgentAttribute';
import { Reflector } from '../Reflection/Reflector';

/**
 * Decorate an agent with customized initializer, interceptors and attributes
 *
 * @param {AgentAttribute} options
 * @param {IAttribute[]} attributes
 * @returns {ClassDecorator}
 */
export function decorateAgent(options: AgentAttribute, attributes?: IAttribute[]): ClassDecorator {
  // upgrade target constructor to agent
  // this method will be called
  return <TFunction extends Function>(target: TFunction): TFunction | void => {
    // apply extra attributes
    if (attributes && attributes.length) {
      const type = Reflector(target);
      for (const attribute of attributes) {
        if (CanDecorate(attribute, target)) {
          type.addAttribute(attribute);
        }
      }
    }

    // the attributes to initialize agent constructor
    // current only support only one initializer, one interceptor
    if (CanDecorate(options, target)) {
      // run this pipeline to generate a new constructor for this giving type
      return CreateAgentInvocation(target, options);
    }
    return target;
  };
}
