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
  AgentFrameworkError,
  Arguments,
  PropertyAttribute,
  PropertyInterceptor,
  PropertyInvocation,
} from '@agentframework/agent';

import { GetDomainFromIntercept } from './GetDomainFromIntercept';
import { GetSystemDomain } from '../../../../packages/domain';

export class TransitAttribute implements PropertyAttribute, PropertyInterceptor {
  constructor(readonly type?: Function) {}

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
    const type = this.type || (target.design && target.design.type);
    if (!type) {
      throw new AgentFrameworkError('UnknownTransitType');
    }
    const domain = GetDomainFromIntercept(target, params, receiver) || GetSystemDomain();
    if (!domain) {
      // console.log('singleton', type, 'receiver', receiver);
      throw new AgentFrameworkError('NoDomainFoundForTransitInjection');
    }

    const newValue = domain.resolve(type, params, true);

    return target.invoke([newValue], receiver);
  }
}

