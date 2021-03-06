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
  AgentFrameworkError
} from '../../../dependencies/core';
import { GetDomainFromInvocation } from '../Helpers/GetDomainFromInvocation';

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

    // if (target.design instanceof ParameterInfo) {
    //   console.log('parameter info', parameters);
    // } else {
    //   console.log('property info', parameters);
    // }

    // console.log('inject parameter', parameters);
    // console.log('inject type', type.name);
    // const dom = DomainCore.GetDomain(receiver);
    // console.log('inject domain', typeof dom);
    // if (!dom) {
    //   console.log('inject receiver', typeof receiver, receiver);
    // }

    // console.log('is same', target.design.declaringType === target.target);
    // if (target.design.declaringType !== target.target) {
    //   console.log('target', target.target.name);
    //   console.log('design target', target.design.name,  target.design.declaringType.name);
    // }

    // if this object created by domain, the last argument is domain itself
    // console.log('find domain for type', receiver)
    const domain = GetDomainFromInvocation(target, params, receiver);
    if (!domain) {
      throw new AgentFrameworkError('NoDomainFoundForSingletonInjection');
    }

    // console.log('find singleton', type.name, 'from', domain.name);

    // console.log('receiver', receiver)
    // console.log('domain', domain.constructor);
    // console.log('get domain', GetDomain(receiver.constructor)?.constructor);
    //
    // console.log('Custom Type', customType);
    // if (customType) {
    //   console.log('Custom Instance', domain.getInstance(customType));
    // }
    //
    // console.log('Design Type', designType);
    // if (designType) {
    //   console.log('Design Instance', domain.getInstance(designType));
    // }
    // console.log('found domain', domain?.constructor, 'from', receiver.constructor, 'for singleton', type);

    const value =
      (customType && domain.getAgent(customType)) ||
      (designType && domain.getAgent(designType)) ||
      domain.construct(type, params);
    // domain.construct(type) // do not include the parameters

    return target.invoke([value], receiver);
    //
    // console.log('found', found);
    //
    // return found;
  }
}
