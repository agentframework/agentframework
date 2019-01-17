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

import { DirectMethodInvocation, InterceptedMethodInvocation } from './Invocation/MethodInvocations';
import { IInvocation } from '../Core/IInvocation';
import { IAttribute } from '../Core/IAttribute';
import { Method } from '../Reflection/Method';
import { Property } from '../Reflection/Property';
import { InterceptorChainFactory } from './InterceptorChainFactory';

/**
 * @ignore
 * @hidden
 */
export class InterceptorFunctionFactory {
  static createFunction(
    attributes: Array<IAttribute>,
    target: Function,
    method: Function,
    design: Method<Property>,
    params?: Map<number, [IInvocation, IInvocation]>
  ): Function {
    let origin: IInvocation;
    let factory: Function;
    if (params && params.size) {
      origin = new InterceptedMethodInvocation(target, method, design, params);
      factory = new Function('c', 'o', `return function ${method.name}$(){return o.agent=this,c.invoke(arguments)}`);
    } else {
      origin = new DirectMethodInvocation(target, method, design);
      factory = new Function('c', 'o', `return function(){return o.agent=this,c.invoke(arguments)}`);
    }
    const chain = InterceptorChainFactory.chainInterceptorAttributes(origin, attributes);
    if (chain instanceof DirectMethodInvocation) {
      // do nothing
      return method;
    } else {
      return factory(chain, origin);
    }
  }
}
