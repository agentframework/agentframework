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

import { Arguments } from '../../core/Core/Interception/Arguments.ts';
import { TypeAttribute } from '../../core/Core/Interception/TypeAttributes.ts';
import { TypeInvocation } from '../../core/Core/Interception/TypeInvocations.ts';
import { TypeInterceptor } from '../../core/Core/Interception/TypeInterceptors.ts';
import { UpgradeAgentProperties } from './Compiler/OnDemandAgentCompiler';
import { FindExtendedClass } from './FindExtendedClass';
import { AgentFrameworkError } from './AgentFrameworkError';
import { OnDemandInvocationFactory } from './Compiler/OnDemandInvocationFactory';
import { ClassConstructors } from './Knowledges/ClassConstructors';
import { ClassMembers } from './Knowledges/ClassMembers';
import { RememberType } from './Knowledges/Types';
import { TypeInfo } from '../../core/Core/Reflection/TypeInfo';
import { PropertyInfo } from '../../core/Core/Reflection/PropertyInfo';

/**
 * This attribute is for upgrade class to agent
 */
export class AgentAttribute implements TypeAttribute, TypeInterceptor {
  /**
   * get interceptor
   */
  get interceptor(): TypeInterceptor {
    return this;
  }

  /**
   * Create type hook (called after javascript loaded)
   */
  intercept(target: TypeInvocation, params: Arguments, receiver: Function): Function {
    const [, type, state]: any = params;
    if (state.version) {
      // WARNING: assume other interceptor is return Function object
      const agent = (state.target = <Function>Reflect.construct(type, [receiver, state]));
      RememberType(agent, receiver);
      return (state.receiver = target.invoke<Function>(params, agent));
    }
    return (state.receiver = target.invoke<Function>(params, receiver));
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
    const type: TypeInfo = this.type;
    const typeVersion = type.version;
    if (typeVersion) {
      const state = ClassMembers.v1.get(key);
      if (!state || state.version !== typeVersion) {
        const members = (state && state.members) || new Map<string | symbol, number>();

        // check if got any property with interceptors
        const properties = members.size
          ? type.findOwnProperties((p) => p.intercepted && members.get(p.key) !== p.version)
          : type.findOwnProperties((p) => p.intercepted);

        if (properties.length) {
          // don't generate property interceptor if no extended class
          const found = FindExtendedClass(this.receiver, receiver);
          UpgradeAgentProperties(
            members,
            target.prototype,
            this.receiver.prototype,
            properties,
            found[0] && found[0].prototype
          );
        }
        ClassMembers.v1.set(key, { version: typeVersion, members });
      }
    }

    // generate new class instance
    const property: PropertyInfo = this.property;
    const propertyVersion = property.version;
    if (propertyVersion) {
      let invocation: TypeInvocation | undefined;

      // check if can reuse constructor invocation
      let ctor = ClassConstructors.v1.get(key);
      if (ctor && ctor.version === propertyVersion) {
        // can reuse
        invocation = ctor.invocation;
      } else {
        // create new constructor invocation
        // find interceptors from design attributes and create chain for them
        ctor = OnDemandInvocationFactory.createConstructorInvocation(target, this.type, property);
        ClassConstructors.v1.set(key, ctor);
        invocation = ctor.invocation;
      }

      const agent = invocation.invoke(params, receiver);

      // raise error if possible
      if (null === agent || 'object' !== typeof agent) {
        throw new AgentFrameworkError('ConstructorReturnNonObject');
      }

      return agent;
    }

    return Reflect.construct(target, params, receiver);
  }
}
