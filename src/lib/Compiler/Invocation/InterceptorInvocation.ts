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

import { IInvocation } from '../../Core/IInvocation';
import { IInterceptor } from '../../Core/IInterceptor';

/**
 * @ignore
 * @hidden
 */
export class InterceptorInvocation implements IInvocation {
  constructor(private _invocation: IInvocation, private _interceptor: IInterceptor) {}

  get design(): any {
    return this._invocation.design;
  }

  get target(): Function {
    return this._invocation.target;
  }
  
  get agent(): object | undefined {
    return this._invocation.agent;
  }
  
  invoke(parameters: ArrayLike<any>): any {
    return this._interceptor.intercept(this._invocation, parameters);
  }
}
