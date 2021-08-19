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
import { InterceptorInvocation } from './Invocation/InterceptorInvocation';
import { GetInterceptor, HasInterceptor } from '../Helpers/CustomInterceptor';
import { Attribute } from '../Interfaces/Attribute';
import { ParameterInterceptor } from './Invocation/ParameterInterceptor';
import { AgentInvocation } from './Invocation/AgentInvocation';
import { TypeInfo } from '../Interfaces/TypeInfo';
import { ConstructorInvocation } from './Invocation/ConstructorInvocation';
import { CanDecorate } from '../Decorator/CanDecorate';
import { AgentFrameworkError } from '../Error/AgentFrameworkError';

/**
 *
 */
export class ChainFactory {
  /**
   * @ignore
   * @hidden
   */
  static chainInterceptorAttributes(current: Invocation, attributes: Array<Attribute>): Invocation {
    // make invocation chain of interceptors
    if (attributes.length) {
      for (const attribute of attributes) {
        const interceptor = GetInterceptor(attribute);
        if (interceptor) {
          current = new InterceptorInvocation(current, interceptor);
        }
      }
    }
    return current;
  }

  /**
   * @ignore
   * @hidden
   */
  static chainInterceptorAttribute(current: Invocation, attribute: Attribute): Invocation {
    const interceptor = GetInterceptor(attribute);
    if (interceptor) {
      current = new InterceptorInvocation(current, interceptor);
    }
    return current;
  }

  /**
   * Create constructor interceptor
   *
   * @ignore
   * @hidden
   */
  static createConstructorInterceptor(target: Function, design: TypeInfo): Invocation {
    // console.log('createMethodInterceptor', origin.target.name, origin.design.name);

    // build invocation chain
    const origin = new ConstructorInvocation(design, target);

    // find all attribute from prototype
    // const interceptors = property.findOwnAttributes(HasInterceptor);
    const interceptorArrays: Array<Array<Attribute>> = design
      .findTypes()
      .map((type) => type.findOwnAttributes(HasInterceptor));
    const emptyArray: Array<Attribute> = [];
    const interceptors: Array<Attribute> = emptyArray.concat(...interceptorArrays);

    // create interceptor
    const intercepted = ChainFactory.chainInterceptorAttributes(origin, interceptors);

    // create parameter invocation if have

    // return this.chainInterceptorAttribute(intercepted, new ParameterInterceptor(design));
    return new InterceptorInvocation(intercepted, new ParameterInterceptor(design));
  }

  /**
   *
   *
   * @ignore
   * @hidden
   */
  static createAgentInterceptor(target: Function, attribute: Attribute): Invocation {
    //
    const invocation = new AgentInvocation(target);

    const design = invocation.design;

    // todo: cache the chain for this target
    let chain: Invocation = invocation;
    // chain user defined class attribute
    if (design.hasOwnInterceptor()) {
      const interceptors = design.findOwnAttributes(HasInterceptor);
      //.concat(property.value.findOwnAttributes(HasInterceptor));
      chain = ChainFactory.chainInterceptorAttributes(chain, interceptors);
    }

    if (!CanDecorate(attribute, target)) {
      throw new AgentFrameworkError('NoPermissionToCreateAgent');
    }
    return ChainFactory.chainInterceptorAttribute(chain, attribute);
  }
}
