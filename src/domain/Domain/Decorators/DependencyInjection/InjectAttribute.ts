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

import {
  PropertyAttribute,
  PropertyInvocation,
  PropertyInterceptor,
  Arguments,
  AgentFrameworkError,
} from '../../../../../lib/dependencies/agent';
import { GetDomainFromInvocation } from '../../Helpers/GetDomainFromInvocation';

export class InjectAttribute implements PropertyAttribute, PropertyInterceptor {
  constructor(readonly type?: Function) {}

  get interceptor() {
    return this;
  }

  intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
    if (params.length) {
      throw new AgentFrameworkError('NotAllowModifyInjectVariable');
    }

    let value: object | undefined = target.invoke(params, receiver);
    if (typeof value !== 'undefined') {
      return value;
    }

    const type = this.type || (target.design && target.design.type);
    if (!type) {
      throw new AgentFrameworkError('UnknownInjectType');
    }

    const domain = GetDomainFromInvocation(target, params, receiver);
    if (!domain) {
      throw new AgentFrameworkError('DomainNotFound: ' + type.name);
    }

    value = domain.getAgent(type);
    if (typeof value === 'undefined') {
      throw new AgentFrameworkError('InjectInstanceNotExists: ' + type.name);
    }

    return target.invoke([value], receiver);
  }
}
