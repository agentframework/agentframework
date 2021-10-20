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
  constructor(readonly type?: Function) {}

  get interceptor(): ClassInterceptor {
    return this;
  }

  /**
   * Create type hook (called after javascript loaded)
   */
  intercept(target: TypeInvocation, params: any, receiver: Function): Function {
    const [, type, state] = params;

    let newReceiver = (state.target = Reflect.construct(type, [receiver, state]));
    RememberType(newReceiver, receiver);

    newReceiver = state.receiver = target.invoke<Function>(params, newReceiver);

    // console.log('newReceiver 1', newReceiver)
    // newReceiver = Reflect.construct(compiler, [newReceiver, state]);
    // RememberType(newReceiver, target.design.declaringType);
    // console.log('newReceiver 2', newReceiver)

    // console.log('newReceiver 1', state.target);
    // console.log('newReceiver 2', state.receiver);

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

    // console.log('this.a', this.receiver === target);
    // console.log('target', target.name, '--->', this.receiver);

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

    // this.target !== target
    // this.target.prototype === target.prototype
    // GetType(this.target) === target
    let invocation: TypeInvocation | undefined = ClassInvocations.v1.get(this.target);
    // console.log('☀️ ☀️ ☀️', target.name, receiver.name);

    if (invocation) {
      if (invocation.design.version + InvocationFactory.class.version !== invocation.version) {
        // console.log('test', invocation.design.version, '+', InvocationFactory.class.version, '=', invocation.version);
        // invalidate cache
        invocation = undefined;
      }
    }

    // analysis this object
    if (!invocation) {
      // find interceptors from design attributes and create chain for them
      invocation = InvocationFactory.createClassInvocation(target);

      ClassInvocations.v1.set(this.target, invocation);

      // upgrade properties
      const properties = invocation.design.findOwnProperties((p) => p.hasInterceptor());

      // don't generate property interceptor if no extended class
      if (properties.length) {
        const found = FindExtendedClass(this.receiver, receiver);
        // console.log('target', this.receiver, receiver.toString());
        // console.log('found', found);
        // quick check, ignore if keys are been declared
        // ownKeys() >= 1 because constructor is one key always have
        UpgradeAgentProperties(target.prototype, this.receiver.prototype, properties, found[0] && found[0].prototype);
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
