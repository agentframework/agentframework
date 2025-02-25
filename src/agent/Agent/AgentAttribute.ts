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
// import { RememberType } from './Knowledges/Types';
import { TypeInfo } from './Reflection/TypeInfo';
import { PropertyInfo } from './Reflection/PropertyInfo';
import { RememberType } from './Knowledges/Types';
// import { FindExtendedClass } from "./FindExtendedClass";

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
    const [state, , type] = params;
    if (state.version && false) {
      // WARNING: assume other interceptor is return Function object
      // const agenty = Function(id, `return class ${id}$ extends ${id} {}`);
      //
      const agent = (state.target = Reflect.construct(type, [receiver, state]) as Function);
      RememberType(agent, receiver);
      return (state.receiver = target.invoke<Function>(params, agent));
    }
    return (state.receiver = target.invoke<Function>(params, receiver));
  }

  upgrade(target: Function, proxy: Function, cache: Function, type: TypeInfo) {
    // console.log('upgrade target', target)
    // console.log('upgrade proxy', target)
    // console.log('upgrade cache', target)

    const typeVersion = type.version;
    // console.log('upgrade 0', typeVersion, '=', target, proxy, cache, type);
    // console.log('upgrade 1', type);
    // console.log('upgrade 21', Reflector(target));
    // console.log('upgrade 22', Reflector(proxy));
    // console.log('upgrade 23', Reflector(cache));
    if (typeVersion) {
      const state = ClassMembers.v1.get(target);
      if (!state || state.version !== typeVersion) {
        const members = (state && state.members) || new Map<string | symbol, number>();

        // check if got any property with interceptors
        const properties = members.size
          ? type.findOwnProperties((p) => p.intercepted && members.get(p.key) !== p.version)
          : type.findOwnProperties((p) => p.intercepted);

        if (properties.length) {
          // don't generate property interceptor if no extended class
          UpgradeAgentProperties(members, target.prototype, proxy.prototype, properties, cache.prototype);
        }
        ClassMembers.v1.set(target, { version: typeVersion, members });
      }
    }
  }

  /**
   * Constructor hook (called when user construct the class and got any interceptor)
   */
  construct<T extends Function>(this: any, target: T, params: Arguments, receiver: T): any {

    const key = target;

    // generate new class instance
    const property: PropertyInfo = this.property;

    console.log('property key', key, property)

    const propertyVersion = property.version;
    if (true || propertyVersion) {
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

      console.log('need upgrade', target, receiver);

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
