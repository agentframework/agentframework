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
import { OnDemandClassCompiler } from '../Compiler/OnDemandClassCompiler';
import { FindExtendedClass } from '../Helpers/FindExtendedClass';
import { RememberAgentType } from '../Helpers/AgentHelper';
import { Reflector } from '../Reflection/Reflector';
import { Invocations } from '../Knowledge';
import { AgentFrameworkError } from '../Error/AgentFrameworkError';
import { PropertyInfo } from '../Interfaces/PropertyInfo';
import { ChainFactory } from '../Compiler/ChainFactory';
import { Wisdom } from '../Wisdom/Wisdom';

/**
 * This attribute is for upgrade class to agent
 */
export class AgentAttribute implements ClassAttribute, ClassInterceptor {
  constructor(readonly callCustomCompiler: boolean = false) {}
  /**
   *
   */
  get interceptor(): ClassInterceptor {
    return this;
  }

  /**
   * Create type hook (called after script loaded)
   */
  intercept(target: ClassInvocation, params: any, receiver: Function): Function {
    const staticMeta = Wisdom.get(receiver);
    const meta = Wisdom.get(receiver.prototype);
    const [, attribute, compiler] = params;

    if (staticMeta) {
      // console.log('Agent Static', receiver);
      // console.log(Wisdom.get(receiver));
      // const design = target.design;
      // const oldTarget = design.declaringType;
      // // create agent type
      // const newTarget: Function = target.invoke(params, receiver);
      //
      // /* istanbul ignore next */
      // if (oldTarget === newTarget) {
      //   // not allow modify user class prototype
      //   return newTarget;
      // }
      //
      // const result = design.findProperties((p) => p.hasInterceptor());
      // const properties = new Map<PropertyKey, PropertyInfo>();
      //
      // if (result.size) {
      //   for (const infos of result.values()) {
      //     for (const info of infos) {
      //       properties.set(info.key, info);
      //     }
      //   }
      // }
      //
      // if (properties.size) {
      //   // 2. find the proxy class
      //   const found = FindExtendedClass(oldTarget, newTarget);
      //
      //   // don't generate property interceptor if no extended class
      //   // quick check, ignore if keys are been declared
      //   // ownKeys() >= 1 because constructor is one key always have
      //   OnDemandClassCompiler.upgrade(found[0], properties, found[0], found[1]);
      // }
    }

    if (meta || (staticMeta && staticMeta['constructor'])) {
      // receiver is target
      // generate a new class proxy for target
      // this proxy class will
      //    1. as a factory to create new agent
      //    2. as a base class to extend
      // const name = receiver.name;

      // minimal code to generate a class
      // this class will add on top of the Proxy class
      // const code = `return class ${name}$ extends ${name}`;

      // using proxy to make better constructor
      // use different constructor for different configuration
      const newReceiver = Reflect.construct(compiler, [receiver, attribute]);
      RememberAgentType(newReceiver, target.design.declaringType);

      // create the class
      const newAgent = target.invoke<Function>(params, newReceiver);

      // console.log('new name', name);
      // console.log('===>', agent, agent.toString());

      // this is the only way to detect the proxy
      // RememberAgentType(newAgent, target.design.declaringType);
      return newAgent;
    } else if (this.callCustomCompiler) {
      const newReceiver = Reflect.construct(compiler, [receiver, attribute]);
      RememberAgentType(newReceiver, target.design.declaringType);
      return newReceiver;
    } else {
      return receiver;
    }
  }

  /**
   * Constructor hook (called when user construct the class)
   */
  construct<T extends Function>(target: T, params: Arguments, newTarget: T): any {
    // GEN 1: this.design.type = origin type
    // GEN 2: this.receiver = intercepted type
    //        target === receiver
    // GEN 3: newTarget = Proxy

    // cache the constructor invocation
    // so do not support change annotation after first time created the type
    let invocation = Invocations.v1.get(target);
    // console.log('☀️ ☀️ ☀️ 1', target.name, newTarget.name, !!constructor);

    // analysis this object
    if (!invocation) {
      const design = Reflector(target);

      // find interceptors from design attributes and create chain for them
      invocation = ChainFactory.createConstructorInterceptor(target, design);

      Invocations.v1.set(target, invocation);
      // upgrade properties

      const result = design.findProperties((p) => p.hasInterceptor());
      const properties = new Map<PropertyKey, PropertyInfo>();

      // NOTE: Static Constructor support, deep first
      // for (const ctor of FindStaticConstructors(target.prototype)) {
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
        for (const infos of result.values()) {
          for (const info of infos) {
            properties.set(info.key, info);
          }
        }
      }

      // don't generate property interceptor if no extended class
      if (properties.size) {
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

        // 2. find the proxy class (at least 1 proxy)
        const found = FindExtendedClass(target, newTarget);

        // quick check, ignore if keys are been declared
        // ownKeys() >= 1 because constructor is one key always have
        OnDemandClassCompiler.upgrade(found[0].prototype, properties, found[0], found[1]);
      }
    }

    const instance = invocation.invoke(params, newTarget);
    // raise error before construct proxy
    if (null === instance || 'object' !== typeof instance) {
      throw new AgentFrameworkError('ConstructorReturnNonObject');
    }
    return instance;
    // return new Proxy(invocation.invoke(params, newTarget), {
    //   getPrototypeOf<T extends Function>(target: T): object | null {
    //     return {};
    //   },
    // });
  }
}
