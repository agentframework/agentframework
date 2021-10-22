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
import { ClassInvocation } from './TypeInvocations';
import { ClassInterceptor } from './TypeInterceptors';
import { UpgradeAgentProperties } from './Compiler/OnDemandCompiler';
import { FindExtendedClass } from './FindExtendedClass';
import { AgentFrameworkError } from './AgentFrameworkError';
import { OnDemandInvocationFactory } from './Compiler/OnDemandInvocationFactory';
import { ClassConstructors, ClassConstructorState, ClassMembers } from './Knowledges/ClassInvocations';
import { RememberType } from './Knowledges/Types';
import { Arguments } from './Arguments';
import { CONSTRUCTOR } from './WellKnown';
import { PropertyInfo } from './Reflection/PropertyInfo';

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
  intercept(target: ClassInvocation, params: any, receiver: Function): Function {
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
    // NOTE: new created agent will apply the latest annotations

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
    const key = this.target;

    // check if can reuse constructor invocation
    let invocation: ClassInvocation | undefined;
    const ctor: ClassConstructorState | undefined = ClassConstructors.v1.get(key);
    if (ctor) {
      const foundInvocation = ctor.invocation;
      if (ctor.version === foundInvocation.design.property(CONSTRUCTOR).version) {
        invocation = foundInvocation;
      }
    }

    // create new constructor invocation
    if (!invocation) {
      // find interceptors from design attributes and create chain for them
      invocation = OnDemandInvocationFactory.createConstructorInvocation(target);
      ClassConstructors.v1.set(key, { invocation, version: invocation.design.property(CONSTRUCTOR).version });
    }

    let properties: ReadonlyArray<PropertyInfo> | undefined;

    const prop = ClassMembers.v1.get(key);
    let members: Map<string | symbol, number> | undefined;
    if (prop) {
      if (prop.version !== invocation.design.version) {
        properties = invocation.design.findOwnProperties((p) => p.hasInterceptor());
        const m = (members = prop.members);
        if (m.size) {
          properties = properties.filter((property) => !(m.get(property.key) === property.version));
        }
      }
    } else {
      properties = invocation.design.findOwnProperties((p) => p.hasInterceptor());
    }

    // check if need upgrade properties
    if (properties) {
      if (properties.length) {
        // don't generate property interceptor if no extended class
        const found = FindExtendedClass(this.receiver, receiver);
        // console.log('target', this.receiver, receiver.toString());
        // console.log('found', found);
        // quick check, ignore if keys are been declared
        // ownKeys() >= 1 because constructor is one key always have
        UpgradeAgentProperties(target.prototype, this.receiver.prototype, properties, found[0] && found[0].prototype);
        members = properties.reduce((map, property) => {
          map.set(property.key, property.version);
          return map;
        }, members || new Map());
      }
      ClassMembers.v1.set(key, { version: invocation.design.version, members: members || new Map() });
    }

    const agent = invocation.invoke(params, receiver);

    // raise error if possible
    if (null === agent || 'object' !== typeof agent) {
      throw new AgentFrameworkError('ConstructorReturnNonObject');
    }

    return agent;
  }
}
