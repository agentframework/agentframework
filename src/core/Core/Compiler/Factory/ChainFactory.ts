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
// import { IInitializerAttribute } from '../../Interfaces/IInitializerAttribute';
import { Interceptable } from '../../Interfaces/Interceptable';
// import { InitializerInvocation } from '../Invocation/InitializerInvocation';
import { InterceptorInvocation } from '../Invocation/InterceptorInvocation';
import { GetInterceptor } from '../../Helpers/Interceptor';

/**
 *
 */
export class ChainFactory {
  // /**
  //  * @ignore
  //  * @hidden
  //  */
  // static chainInitializerAttributes(origin: IInvocation, attributes: Array<IInitializerAttribute>): IInvocation {
  //   // make invocation chain of interceptors
  //   for (const attribute of attributes) {
  //     const initializer = attribute.initializer;
  //     // skip if initializer return false
  //     if (initializer && 'function' === typeof initializer.initialize) {
  //       origin = new InitializerInvocation(origin, initializer);
  //     }
  //   }
  //   return origin;
  // }

  /**
   * @ignore
   * @hidden
   */
  static chainInterceptorAttributes(origin: Invocation, interceptors: Array<Interceptable>): Invocation {
    // make invocation chain of interceptors
    if (interceptors.length) {
      for (const attribute of interceptors) {
        const interceptor = GetInterceptor(attribute);
        if (interceptor) {
          origin = new InterceptorInvocation(origin, interceptor);
        }
      }
    }
    return origin;
  }
}
