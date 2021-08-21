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
import { OnDemandClassCompiler } from './OnDemandClassCompiler';
import { FindExtendedClass } from '../Helpers/FindExtendedClass';
import { Reflector } from '../Reflection/Reflector';
import { Invocations } from '../Knowledge';
import { AgentFrameworkError } from '../AgentFrameworkError';
import { PropertyInfo } from '../Interfaces/PropertyInfo';
import { ChainFactory } from './ChainFactory';
import { Wisdom } from '../Wisdom/Wisdom';
import { RememberType } from '../Helpers/AgentHelper';

/**
 * This attribute is for upgrade class to agent
 */
export class AgentAttribute implements ClassAttribute, ClassInterceptor {
  constructor(readonly hasAgentInterceptor: boolean = false) {}
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
    const agentMeta = Wisdom.get(receiver);
    let newReceiver = receiver;

    const hasAgentAttributes = agentMeta && Reflect.ownKeys(agentMeta).some((key) => key !== 'constructor');

    const [, attribute, compiler] = params;
    newReceiver = Reflect.construct(compiler, [newReceiver, attribute]);
    RememberType(newReceiver, target.design.declaringType);

    newReceiver = target.invoke<Function>(params, newReceiver);

    if (hasAgentAttributes) {
      const design = target.design;
      const declaringType = design.declaringType;

      const interceptors = design.findOwnProperties((p) => p.hasInterceptor());
      const properties = new Map<PropertyKey, PropertyInfo>();

      // note: not all attribute has interceptor
      if (interceptors.length) {
        for (const property of interceptors) {
          properties.set(property.key, property);
        }
      }

      if (properties.size) {
        // 2. find the proxy class
        const found = FindExtendedClass(declaringType, newReceiver);
        const agent = found[0];
        OnDemandClassCompiler.upgrade(agent, properties, found[1]);
      }
    }

    return newReceiver;
  }

  /**
   * Constructor hook (called when user construct the class)
   */
  construct<T extends Function>(target: T, params: Arguments, receiver: T): any {
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
      const interceptors = design.findProperties((p) => p.hasInterceptor());
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

      if (interceptors.size) {
        for (const type of interceptors.values()) {
          for (const property of type) {
            properties.set(property.key, property);
          }
        }
      }

      // don't generate property interceptor if no extended class
      if (properties.size) {
        const found = FindExtendedClass(target, receiver);
        const agent = found[0].prototype;
        // quick check, ignore if keys are been declared
        // ownKeys() >= 1 because constructor is one key always have
        OnDemandClassCompiler.upgrade(agent, properties, found[1] && found[1].prototype);
      }
    }

    const agent = invocation.invoke(params, receiver);
    // raise error if possible
    if (null === agent || 'object' !== typeof agent) {
      throw new AgentFrameworkError('ConstructorReturnNonObject');
    }
    return agent;
  }
}
