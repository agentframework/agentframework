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

import { Invocation } from '../../Interfaces/Invocation';
import { Arguments } from '../../Interfaces/Arguments';
import { Design } from '../../Interfaces/Design';
import { Attribute } from '../../Interfaces/Attribute';
import { GetInterceptor } from '../../Helpers/CustomInterceptor';
import { define } from '../../Helpers/Prototype';
import { INVOKE } from '../../WellKnown';
import { once } from '../../Decorators/Once/once';

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

  @once()
  get interceptor() {
    return GetInterceptor(this.attribute);
  }

  invoke(params: Arguments, receiver: any): any {
    const interceptor = this.interceptor;
    if (interceptor) {
      return interceptor.intercept(this.next, params, receiver);
    }
    const result = this.next.invoke(params, receiver);
    // need after next.invoke()
    // remove this invocation from chain
    if (this.next.constructor === this.constructor) {
      const desc = Reflect.getOwnPropertyDescriptor(this.next, INVOKE);
      const value = desc ? desc.value : this.next.invoke.bind(this.next);
      define(this, INVOKE, { value });
    }
    return result;
  }
}
