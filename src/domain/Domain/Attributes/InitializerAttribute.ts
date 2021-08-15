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

import { Arguments, ClassInterceptor, ClassInvocation } from '../../../dependencies/core';
import { FindInitializers } from '../Helpers/FindInitializers';

export class InitializerAttribute implements ClassInterceptor {
  get interceptor() {
    return this;
  }

  intercept(target: ClassInvocation, params: Arguments, receiver: any) {
    const declaringType = target.design.declaringType;

    // after create instance, call custom Initializer
    const results = FindInitializers(declaringType);

    const instance = target.invoke(params, receiver);

    // no need check length here because length here always >= 1
    // call sequence: root -> base -> child
    for (const [initializer] of results) {
      Reflect.apply(initializer, instance, params);
    }

    return instance;
  }
}
