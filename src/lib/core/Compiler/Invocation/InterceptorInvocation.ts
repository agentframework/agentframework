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
import { Interceptor } from '../../Interfaces/Interceptor';
import { Arguments } from '../../Interfaces/Arguments';
import { Design } from '../../Interfaces/Design';

/**
 * invocation wrapper for interceptor
 *
 * @ignore
 * @hidden
 */
export class InterceptorInvocation implements Invocation {
  constructor(private readonly _next: Invocation, private readonly _interceptor: Interceptor) {}

  get design(): Design {
    return this._next.design;
  }

  invoke(params: Arguments, receiver: any): any {
    return this._interceptor.intercept(this._next, params, receiver);
  }
}
