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

import { ClassAttribute } from '../Interfaces/TypeAttributes';
import { ClassInvocation } from '../Interfaces/TypeInvocations';
import { ClassInterceptor } from '../Interfaces/TypeInterceptors';
import { Arguments } from '../Interfaces/Arguments';
import { OnDemandClassConstructor } from '../Compiler/OnDemandClassConstructor';
import { Wisdom } from '../Wisdom';

/**
 * This attribute is for upgrade class to agent
 */
export class AgentAttribute implements ClassAttribute, ClassInterceptor {
  get interceptor(): ClassInterceptor {
    return this;
  }

  //generate a new proxy constructor from the target
  intercept(target: ClassInvocation, params: Arguments, receiver: Function): Function {
    // receiver is target
    // generate a new class proxy for target
    // this proxy class will
    //    1. as a factory to create new agent
    //    2. as a base class to extend
    const name = receiver.name;
    if (!name) {
      throw new TypeError('InvalidConstructor');
    }

    // minimal code to generate a class
    // this class will add on top of the Proxy class
    const code = `return class ${name}$ extends ${name}`;

    // using proxy to make better constructor
    // use different constructor for different configuration
    const newTarget = new Proxy(receiver, new OnDemandClassConstructor());
    // newTarget['id'] = 1;
    // console.log('nnnnnn', newTarget, receiver)

    // this is the only way to detect the proxy
    Wisdom.RememberType(newTarget, receiver);

    // create the class
    const agent = target.invoke<Function>([Function, name, code, 'agent code'], newTarget);

    // this is the only way to detect the proxy
    Wisdom.RememberType(agent, receiver);

    return agent;
  }
}
