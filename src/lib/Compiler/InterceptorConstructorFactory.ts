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

import { DirectConstructInvocation, InterceptedConstructInvocation } from './Invocation/ConstructInvocation';
import { Arguments } from './Arguments';
import { Reflector } from '../Reflection/Reflector';
import { InterceptorChainFactory } from './InterceptorChainFactory';

/**
 * @ignore
 * @hidden
 */
export class InterceptorConstructorFactory {
  static createConstructor<C extends Function>(newTarget: C, args: ArrayLike<any>, target: C, params: Arguments) {
    // search all attributes on this class constructor
    const design = Reflector(target);
    let invocation;
    if (design.hasParameters()) {
      invocation = new InterceptedConstructInvocation(newTarget, args, target, params, design);
    } else {
      invocation = new DirectConstructInvocation(newTarget, args, target, params, design);
    }
    const interceptors = design.getInterceptors();
    return InterceptorChainFactory.chainInterceptorAttributes(invocation, interceptors);
  }
}
