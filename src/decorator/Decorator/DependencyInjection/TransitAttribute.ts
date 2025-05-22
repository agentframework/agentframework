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

import { CreateAgent } from '../../../agent/Agent/CreateAgent.ts';
import { AgentFrameworkError } from '../../../agent/Agent/AgentFrameworkError.ts';
import { PropertyInterceptor } from '../../../core/Core/Interception/TypeInterceptors.ts';
import { PropertyInvocation } from '../../../core/Core/Interception/TypeInvocations.ts';
import { Arguments } from '../../../core/Core/Interception/Arguments.ts';

export class TransitAttribute implements PropertyInterceptor {
  readonly type?: Function;

  constructor(type?: Function) {
    this.type = type;
  }

  get interceptor() {
    return this;
  }

  intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
    if (params.length) {
      throw new AgentFrameworkError('NotAllowModifyTransitVariable');
    }

    const value: object | undefined = target.invoke(params, receiver);
    if (typeof value !== 'undefined') {
      return value;
    }

    const customType = this.type;
    const designType = target.design && target.design.type;
    const type = customType || designType;
    if (!type) {
      throw new AgentFrameworkError('UnknownTransitType');
    }

    const AgentClass = CreateAgent(type);
    // console.log('TransitClass from', type);
    // console.log('TransitClass to', AgentClass);
    const agent = Reflect.construct(AgentClass, params);
    return target.invoke([agent], receiver);
  }
}
