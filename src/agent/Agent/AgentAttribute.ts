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

import { Arguments } from './Arguments';
import { TypeAttribute } from './TypeAttributes';
import { TypeInvocation } from './TypeInvocations';
import { TypeInterceptor } from './TypeInterceptors';
import { UpgradeAgentProperties } from './Compiler/OnDemandAgentCompiler';
import { AgentFrameworkError } from './AgentFrameworkError';
import { OnDemandInvocationFactory } from './Compiler/OnDemandInvocationFactory';
import { ClassConstructors } from './Knowledges/ClassConstructors';
import { ClassMembers } from './Knowledges/ClassMembers';
import { PropertyInfo } from './Reflection/PropertyInfo';
import { TypeInfo } from './Reflection/TypeInfo';
import { RememberType } from './Knowledges/Types';
import { CONSTRUCTOR } from './WellKnown';

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
    const [state, , agent] = params;

    const classDesign = (state.type = target.design.prototype);
    const classConstructor = (state.property = classDesign.property(CONSTRUCTOR));

    state.version += classDesign.version + classConstructor.version;

    if (state.version) {
      // WARNING: assume other interceptor is return Function object
      // const Proxy = Function(state.name, `return class ${state.name}$ extends ${state.name} { /* [proxy code] */ };`);
      const newReceiver = (state.target = Reflect.construct(agent, [receiver, {}]) as Function);
      RememberType(newReceiver, receiver);
      return (state.receiver = target.invoke<Function>(params, newReceiver));
    }

    return (state.receiver = target.invoke<Function>(params, receiver));
  }

  /**
   * Constructor hook (called when user construct the class and got any interceptor)
   */
  construct<T extends Function>(this: any, type: T, params: Arguments, receiver: T, proxy: T, cache: T): any {

    // build agent type
    const design: TypeInfo = this.type;

    const typeVersion = design.version;
    if (typeVersion) {
      const state = ClassMembers.v1.get(type);
      if (!state || state.version !== typeVersion) {
        const members = (state && state.members) || new Map<string | symbol, number>();

        // check if got any property with interceptors
        const properties = members.size
          ? design.findOwnProperties((p) => p.intercepted && members.get(p.key) !== p.version)
          : design.findOwnProperties((p) => p.intercepted);

        if (properties.length) {
          // don't generate property interceptor if no extended class
          UpgradeAgentProperties(members, type.prototype, proxy.prototype, properties, cache.prototype);
        }
        ClassMembers.v1.set(type, { version: typeVersion, members });
      }
    }

    // generate new class instance
    const property: PropertyInfo = this.property;
    const propertyVersion = property.version;
    if (propertyVersion) {
      let invocation: TypeInvocation | undefined;

      // check if can reuse constructor invocation
      let ctor = ClassConstructors.v1.get(type);
      if (ctor && ctor.version === propertyVersion) {
        // can reuse
        invocation = ctor.invocation;
      } else {
        // create new constructor invocation
        // find interceptors from design attributes and create chain for them
        ctor = OnDemandInvocationFactory.createConstructorInvocation(type, design, property);
        ClassConstructors.v1.set(type, ctor);
        invocation = ctor.invocation;
      }

      const agent = invocation.invoke(params, receiver);

      // raise error if possible
      if (null === agent || 'object' !== typeof agent) {
        throw new AgentFrameworkError('ConstructorReturnNonObject');
      }

      return agent;
    }

    return Reflect.construct(type, params, receiver);
  }
}
