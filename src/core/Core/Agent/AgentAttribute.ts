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
import { ConstructorInvocation } from '../Compiler/Invocation/ConstructorInvocation';
import { OnDemandClassCompiler } from '../Compiler/OnDemandClassCompiler';
import { FindExtendedClass } from '../Helpers/FindExtendedClass';
import { RememberAgentType } from '../Helpers/AgentHelper';
import { Reflector } from '../Reflector';
import { Invocations } from '../Knowledge';
import { AgentFrameworkError } from '../Error/AgentFrameworkError';

/**
 * This attribute is for upgrade class to agent
 */
export class AgentAttribute implements ClassAttribute, ClassInterceptor {
  /**
   *
   */
  get interceptor(): ClassInterceptor {
    return this;
  }

  /**
   * Create type hook (called after script loaded)
   */
  intercept(target: ClassInvocation, [compiler, name, proxy]: any, receiver: Function): Function {
    // receiver is target
    // generate a new class proxy for target
    // this proxy class will
    //    1. as a factory to create new agent
    //    2. as a base class to extend
    // const name = receiver.name;

    // minimal code to generate a class
    // this class will add on top of the Proxy class
    const code = `return class ${name}$ extends ${name}`;

    // using proxy to make better constructor
    // use different constructor for different configuration
    const newTarget = new Proxy(receiver, proxy);
    // newTarget['id'] = 1;
    // console.log('nnnnnn', newTarget, receiver)

    // this is the only way to detect the proxy
    RememberAgentType(newTarget, receiver);

    // create the class
    const agent = target.invoke<Function>([Function, name, code, 'agent code'], newTarget);

    // this is the only way to detect the proxy
    RememberAgentType(agent, receiver);

    return agent;
  }

  /**
   * Constructor hook (called when user construct the class)
   */
  construct<T extends Function>(target: T, params: Arguments, newTarget: T): any {
    // GEN 1: this.design.type = origin type
    // GEN 2: this.receiver = intercepted type
    //        target === receiver
    // GEN 3: newTarget = Proxied

    // Note: static constructor support

    // cache the constructor invocation
    // so do not support change annotation after first time created the type
    let invocation = Invocations.v1.get(target);
    // console.log('☀️ ☀️ ☀️ 1', target.name, newTarget.name, !!constructor);

    // analysis this object
    if (!invocation) {
      // upgrade properties
      const design = Reflector(target);
      const result = design.findProperties(p => p.hasInterceptor());
      const properties = [];

      // NOTE: Static Constructor support, deep first
      // for (const ctor of FindStaticConstructors(target.prot1otype)) {
      //   console.log('ctor', ctor, ctor.name);
      //   // mark before call to make sure the constructor never call again
      //   Core.MarkStaticConstructor(ctor);
      //
      //   // skip system type
      //   if (Core.IsSystemType(ctor)) {
      //     break;
      //   }
      //
      //   // check if have static constructor
      //   const descriptor = Reflect.getOwnPropertyDescriptor(ctor, ctor.name);
      //   if (descriptor && typeof descriptor.value == 'function') {
      //     Reflect.apply(descriptor.value, ctor, []);
      //   }
      // }
      if (result.size) {
        for (const array of result.values()) {
          properties.push(...array);
        }
      }

      // don't generate property interceptor if no extended class
      if (properties.length) {
        // 1. find all possible fields from design
        // todo: call make dynamic constructor
        // console.log('=========================== A     ===========================');
        // console.log('===========================  G    ===========================');
        // console.log('===========================   E   ===========================');
        // console.log('===========================    N  ===========================');
        // console.log('===========================     T ===========================');
        // console.log('proxies', proxies);

        // result is map<key,array>
        // console.log('found', this.design.name, result, properties);

        /* istanbul ignore next */
        if (target === newTarget) {
          // not allowed to modify user class
          throw new AgentFrameworkError('InvalidTarget');
        }

        // 2. find the proxy class (at least 1 proxy)
        const proxies = FindExtendedClass(target, newTarget);

        // quick check, ignore if keys are been declared
        // ownKeys() >= 1 because constructor is one key always have
        OnDemandClassCompiler.upgrade(proxies[0].prototype, properties, proxies[0], proxies[1]);
      }

      // TODO: add interceptor for static properties

      // build invocation chain
      const origin = new ConstructorInvocation(target, design);

      // find interceptors from design attributes and create chain for them
      invocation = OnDemandClassCompiler.createConstructorInterceptor(origin);

      Invocations.v1.set(target, invocation);
    }

    // console.log('construct', newTarget, parameters);
    return invocation.invoke(params, newTarget);
    // return new Proxy(invocation.invoke(params, newTarget), {
    //   getPrototypeOf<T extends Function>(target: T): object | null {
    //     return {};
    //   },
    // });
  }
}
