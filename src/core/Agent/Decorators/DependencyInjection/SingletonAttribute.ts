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

import { AgentFrameworkError } from '../../AgentFrameworkError';
import { PropertyInterceptor } from '../../../Core/Annotation/TypeInterceptors';
import { PropertyInvocation } from '../../../Core/Annotation/TypeInvocations';
import { CreateAgent } from '../../CreateAgent';
import { Singletons } from '../../Knowledges/Singletons';
import { IsAgent } from '../../Knowledges/Agents';
import { Arguments } from '../../../Core/WellKnown';

export class SingletonAttribute implements PropertyInterceptor {
  readonly type?: Function;

  constructor(type?: Function) {
    this.type = type;
  }

  get interceptor() {
    return this;
  }

  intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
    const customType = this.type;
    const designType = target.design && target.design.type;
    const type = customType || designType;
    if (!type) {
      throw new AgentFrameworkError('UnknownSingletonType');
    }

    const existsAgent =
      (customType && Singletons.v1.get(customType.prototype)) ||
      (designType && Singletons.v1.get(designType.prototype));

    if ('undefined' === typeof existsAgent) {
      // create new
      let agentType;
      if (IsAgent(type)) {
        agentType = type;
      } else {
        agentType = CreateAgent(type);
      }
      const newAgent = Reflect.construct(agentType, params);
      Singletons.v1.set(type.prototype, newAgent);
      return target.invoke([newAgent], receiver);
    }

    return target.invoke([existsAgent], receiver);
  }
}
