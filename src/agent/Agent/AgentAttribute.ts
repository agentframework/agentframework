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
import { CONSTRUCTOR } from './WellKnown';
import { CreateAgentConfiguration } from './CreateAgentConfiguration';

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
    const [state]: [CreateAgentConfiguration] = params as any;

    const classDesign = (state.type = target.design.prototype);
    const classConstructor = (state.property = classDesign.property(CONSTRUCTOR));
    state.version += classDesign.version + classConstructor.version;

    return target.invoke<Function>(params, receiver);
  }

  /**
   * Constructor hook (called when user construct the class and got any interceptor)
   *
   * @param type do not touch
   * @param params do not touch
   * @param receiver do not touch
   * @param proxy allow to touch
   * @param cache allow to touch
   */
  construct<T extends Function>(state: CreateAgentConfiguration, type: T, params: Arguments, receiver: T, proxy: T, cache: T): any {

    // build agent type
    const design: TypeInfo = state.type;

    // build properties
    const typeVersion = design.version;
    if (typeVersion) {
      let state = ClassMembers.v1.get(type);
      if (!state || state.version !== typeVersion) {
        state = {
          version: typeVersion,
          members: state?.members || new Map<string | symbol, number>(),
          properties: design.findOwnProperties((p) => p.intercepted),
        };
        ClassMembers.v1.set(type, state);
      }
      if (state.properties.length) {
        UpgradeAgentProperties(state.members, type.prototype, proxy.prototype, state.properties, cache.prototype);
      }
    }

    // generate new class instance
    const property: PropertyInfo = state.property;
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
