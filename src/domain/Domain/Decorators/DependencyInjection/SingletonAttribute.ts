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
  Arguments,
  PropertyInvocation,
  PropertyInterceptor,
  PropertyAttribute,
  AgentFrameworkError,
} from '../../../../dependencies/agent';
import { GetDomainFromInvocation } from '../../Helpers/GetDomainFromInvocation';

// import { GetDomain } from '../Helpers/GetDomain';

export class SingletonAttribute implements PropertyAttribute, PropertyInterceptor {
  private readonly type?: Function;

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

    // console.log('singleton', type, 'receiver', receiver);
    // if this object created by domain, the last argument is domain itself
    // console.log('find domain for type', receiver)
    const domain = GetDomainFromInvocation(target, params, receiver);
    if (!domain) {
      throw new AgentFrameworkError('NoDomainFoundForSingletonInjection');
    }

    const value =
      (customType && domain.getAgent(customType)) ||
      (designType && domain.getAgent(designType)) ||
      domain.construct(type, params);

    return target.invoke([value], receiver);
  }
}
