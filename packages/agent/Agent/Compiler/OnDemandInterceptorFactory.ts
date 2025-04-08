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

import { Invocation } from '../Invocation';
import { Attribute } from '../Attribute';
import { OnDemandInterceptorInvocation } from './Invocation/OnDemandInterceptorInvocation';
import { MemberInfo } from '../Reflection/MemberInfo';

/**
 * @ignore
 * @hidden
 */
export class OnDemandInterceptorFactory {
  static addInterceptors<T extends MemberInfo>(
    target: Invocation<T>,
    attributes: ReadonlyArray<Attribute> | undefined
  ): Invocation<T> {
    // make invocation chain of interceptors
    if (attributes) {
      for (const attribute of attributes) {
        target = new OnDemandInterceptorInvocation(target, attribute);
      }
    }
    return target;
  }

  static addInterceptor<T extends MemberInfo>(target: Invocation<T>, attribute: Attribute): Invocation<T> {
    return new OnDemandInterceptorInvocation<T>(target, attribute);
  }
}
