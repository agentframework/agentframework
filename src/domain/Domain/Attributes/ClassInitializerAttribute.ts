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

import { AgentFrameworkError, Arguments, ClassInterceptor, ClassInvocation } from '../../../dependencies/core';
import { ClassInitializer } from '../Symbols';
import { GetDomainFromInvocation } from '../Helpers/GetDomainFromInvocation';
import { Domain } from '../Domain';

export interface ClassInitializerHandler {
  (domain: Domain, target: ClassInvocation, params: Arguments, receiver: any): any;
}

export class ClassInitializerAttribute implements ClassInterceptor {
  get interceptor() {
    return this;
  }

  intercept(target: ClassInvocation, params: Arguments, receiver: any) {
    const declaringType = target.design.declaringType;

    // create instance
    const classInitializer: ClassInitializerHandler = Reflect.get(declaringType, ClassInitializer, receiver);
    // in case of human mistake, check prototype if no static initializer function found
    if (typeof classInitializer !== 'function') {
      throw new AgentFrameworkError('ClassInitializerIsNotFunction');
    }

    const domain = GetDomainFromInvocation(target, params, receiver);
    // found class initializer function
    // create instance using initializer function
    return Reflect.apply(classInitializer, declaringType, [domain, target, params, receiver]);
  }
}
