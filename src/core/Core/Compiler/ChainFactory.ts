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

import { Invocation } from '../Interfaces/Invocation';
import { Attribute } from '../Interfaces/Attribute';
import { OnDemandInterceptorInvocation } from './Invocation/OnDemandInterceptorInvocation';
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { OnDemandParameterInterceptor } from './Interceptor/OnDemandParameterInterceptor';
import { PropertyInfo } from '../Interfaces/PropertyInfo';
import { MemberInfo } from '../Interfaces/MemberInfo';

/**
 * @ignore
 * @hidden
 */
export class ChainFactory {
  static chainInterceptors<T extends MemberInfo>(target: Invocation<T>, interceptors: ReadonlyArray<Attribute>) {
    // make invocation chain of interceptors
    if (interceptors.length) {
      for (const interceptor of interceptors) {
        target = new OnDemandInterceptorInvocation(target, interceptor);
      }
    }
    return target;
  }

  static chainInterceptor<T extends MemberInfo>(target: Invocation<T>, attribute: Attribute) {
    return new OnDemandInterceptorInvocation<T>(target, attribute);
  }

  static chainParameterInterceptor<T extends PropertyInfo>(target: Invocation<T>) {
    return new InterceptorInvocation<T>(target, new OnDemandParameterInterceptor(target.design));
  }
}
