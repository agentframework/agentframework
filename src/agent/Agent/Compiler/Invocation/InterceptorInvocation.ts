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
import { Interceptor } from '../../Interceptor';
import { Design } from '../../Design';
import { Arguments } from '../../Arguments';

/**
 * invocation wrapper for interceptor
 *
 * @ignore
 * @hidden
 */
export class InterceptorInvocation<T extends Design> implements Invocation<T> {
  constructor(readonly next: Invocation<T>, readonly interceptor: Interceptor<T>) {}

  get version(): number {
    return this.next.version;
  }

  get design(): T {
    return this.next.design;
  }

  invoke(params: Arguments, receiver: any): any {
    return this.interceptor.intercept(this.next, params, receiver);
  }
}
