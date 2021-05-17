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
  PropertyInvocation,
  PropertyInterceptor,
  PropertyAttribute,
  Arguments,
  AgentFrameworkError
} from '../../../dependencies/core';
import { GetDomainFromInvocation } from '../Helpers/GetDomainFromInvocation';
import { Domain } from '../Domain';

export class TransitAttribute implements PropertyAttribute, PropertyInterceptor {
  private readonly type?: Function;

  constructor(type?: Function) {
    this.type = type;
  }

  get interceptor() {
    return this;
  }

  intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
    const type = this.type || (target.design && target.design.type);
    if (!type) {
      throw new AgentFrameworkError('UnknownTransitType');
    }

    // if this object created by domain, the last argument is domain itself
    const domain = GetDomainFromInvocation(target, params, receiver);
    let value;
    if (domain) {
      // console.log('get type', typeof receiver, type.name)
      value = domain.construct(type, params, true);
    } else {
      value = Domain.construct(type, params);
    }
    return target.invoke([value], receiver);
  }
}
