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

import { ClassAttribute } from './TypeAttributes';
import { TypeInvocation } from './TypeInvocations';
import { ClassInterceptor } from './TypeInterceptors';
import { UpgradeAgentProperties } from './Compiler/OnDemandClassCompiler';
import { FindExtendedClass } from './FindExtendedClass';
import { AgentFrameworkError } from './AgentFrameworkError';
import { InvocationFactory } from './Compiler/InvocationFactory';
import { ClassInvocations } from './Knowledges/ClassInvocations';
import { RememberType } from './Knowledges/Types';
import { Arguments } from './Arguments';

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
  intercept(target: TypeInvocation, params: any, receiver: Function): Function {
    const [, attribute, compiler] = params;

    const state = Object.create(attribute);
    let newReceiver = Reflect.construct(compiler, [receiver, state]);
    RememberType(newReceiver, target.design.declaringType);

    newReceiver = state.receiver = target.invoke<Function>(params, newReceiver);

    // for static decorators
    // const agentMeta = Wisdom.get(receiver);
    // console.log('agentMeta', agentMeta);
    // const hasAgentAttributes = agentMeta && Reflect.ownKeys(agentMeta).some((key) => key !== 'constructor');
    // if (hasAgentAttributes) {
    //   const design = target.design;
    //   const declaringType = design.declaringType;
    //
    //   const interceptors = design.findOwnProperties((p) => p.hasInterceptor());
    //   const properties = new Map<PropertyKey, PropertyInfo>();
    //
    //   // note: not all attribute has interceptor
    //   if (interceptors.length) {
    //     for (const property of interceptors) {
    //       properties.set(property.key, property);
    //     }
    //   }
    //
    //   if (properties.size) {
    //     // 2. find the proxy class
    //     const found = FindExtendedClass(declaringType, newReceiver);
    //     const agent = found[0];
    //     OnDemandClassCompiler.emit(agent, properties, found[1]);
    //   }
    // }

    return newReceiver;
  }

  /**
   * Constructor hook (called when user construct the class)
   */
  construct<T extends Function>(this: any, target: T, params: Arguments, receiver: T): any {
    // GEN 1: this.design.type = origin type
    // GEN 2: this.receiver = intercepted type
    //        target === receiver
    // GEN 3: newTarget = Proxy

    // cache the constructor invocation
    // so do not support change annotation after first time created the type

    // console.log('this.a', this.agent === target);
    // console.log('target', target.name, '--->', this.agent.name);

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

    let invocation: TypeInvocation | undefined = ClassInvocations.v1.get(this.receiver);
    // console.log('☀️ ☀️ ☀️ 1', target.name, receiver.name);
    let classes;

    if (invocation) {
      if (invocation.design.version + InvocationFactory.class.version !== invocation.version) {
        // invalidate cache
        invocation = undefined;
        // clear prototype
        classes = FindExtendedClass(target, receiver);
        if (classes[1]) {
          const found = classes[1].prototype;
          for (const k of Reflect.ownKeys(found)) {
            if (k !== 'constructor') {
              Reflect.deleteProperty(found, k);
            }
          }
        }
      }
    }

    // analysis this object
    if (!invocation) {
      // find interceptors from design attributes and create chain for them
      invocation = InvocationFactory.createClassInvocation(target);

      ClassInvocations.v1.set(this.receiver, invocation);

      // upgrade properties
      const properties = invocation.design.findOwnProperties((p) => p.hasOwnInterceptor());

      // don't generate property interceptor if no extended class
      if (properties.length) {
        const found = classes || FindExtendedClass(target, receiver);
        const agent = found[0].prototype;
        // quick check, ignore if keys are been declared
        // ownKeys() >= 1 because constructor is one key always have
        UpgradeAgentProperties(agent, properties, found[1] && found[1].prototype);
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
