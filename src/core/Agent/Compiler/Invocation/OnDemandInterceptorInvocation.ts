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

import { Invocation } from '../../Invocation';
import { Design } from '../../Design';
import { Attribute } from '../../Attribute';
import { GetInterceptor } from '../../CustomInterceptor';
import { Once } from '../../Decorators/Once/Once';
import { INVOKE } from '../../WellKnown';
import { Arguments } from '../../Arguments';
import { alter } from '../../../Core/Helpers/alter';

/**
 * invocation wrapper for interceptor
 *
 * @ignore
 * @hidden
 */
export class OnDemandInterceptorInvocation<T extends Design = Design> implements Invocation<T> {
  constructor(readonly next: Invocation<T>, readonly attribute: Attribute) {}

  get design(): T {
    return this.next.design;
  }

  get interceptor() {
    return Once(this, 'interceptor', GetInterceptor(this.attribute));
  }

  invoke(params: Arguments, receiver: any): any {
    const interceptor = this.interceptor;
    if (interceptor) {
      return interceptor.intercept(this.next, params, receiver);
    }
    const result = this.next.invoke(params, receiver);
    // below code improve chain invocation performance by reduce one function call
    // need after next.invoke()
    // remove this invocation from chain
    if (this.next.constructor === this.constructor) {
      const desc = Reflect.getOwnPropertyDescriptor(this.next, INVOKE);
      const value = desc ? desc.value : this.next.invoke.bind(this.next);
      alter(this, INVOKE, { value });
    }
    return result;
  }
}
