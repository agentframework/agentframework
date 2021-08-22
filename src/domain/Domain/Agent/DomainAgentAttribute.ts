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

import { AgentAttribute, Arguments, ClassInterceptor, TypeInvocation } from '../../../dependencies/core';
import { RememberSingletonAgent } from '../Helpers/RememberSingletonAgent';
import { GetSingletonAgent } from '../Helpers/GetSingletonAgent';
// import { RememberAgentType } from '../../../core/Core/Helpers/AgentHelper';
// import { DomainLike } from '../DomainLike';
// import { IsDomainType } from '../Helpers/IsDomain';
// import { HasPrototype } from '../Helpers/HasPrototype';
// import { Domain } from '../Domain';
// import { OnDemandClassConstructor } from './DomainAgentConstructor';

export class DomainAgentAttribute extends AgentAttribute implements ClassInterceptor {
  // constructor(private readonly domain: DomainLike) {
  //   super();
  // }

  // get name() {
  //   // the name must be a valid class name.
  //   const name = this.domain.constructor.name;
  //   const fdx = name.lastIndexOf('__');
  //   if (fdx > 0) {
  //     return name.slice(fdx + 2);
  //   }
  //   return name;
  // }

  // target: the origin type
  // receiver: intercepted type
  intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
    // console.log('====== BEFORE ======', params);
    // create a new function
    // const value = params[1];

    // NOTE: check level 1 cache, the agent class which can share across domain
    let agent = GetSingletonAgent(receiver);
    if (!agent) {
      // do not create agent if no attributes applied
      // if (
      //   target.design.hasInitializerOrInterceptor() || // fast
      //   target.design.hasParameterInvocation() || // slow
      //   target.design.hasPropertyInvocation() // slowest, check all properties in prototype chain
      // ) {
      agent = super.intercept(target, params, receiver);
      // make cache proxy, invocation will be cached globally
      // type = new Function(name, `return class ${name}$ extends ${name} {}`)(type);
      // } else {
      //   type = target.target;
      // }
      // const newName = `${this.domainName}__${type.name}`;
      //
      // // make special constructor for domain only agents
      // type = new Function(name, `return class ${newName}$ extends ${name} {}`)(type);

      //Knowledge.RememberType(agent, receiver);
      RememberSingletonAgent(receiver, agent);
    }

    // console.log('====== AFTER ======', typeof receiver, receiver, HasPrototype(receiver.prototype, Domain.prototype));

    // NOTE: create a domain specified class which can register in current domain
    // console.log('c', this.domain.constructor.name);

    // let domainAgentName: string;
    // if (IsDomainType(receiver)) {
    //   // do not modify domain type name
    //   domainAgentName = agent.name;
    // } else {
    //   // add domain name as prefix for agent name
    //   domainAgentName = `${this.domain.constructor.name}__${agent.name}`;
    // }

    // console.log('new Name', this.domainName, newName);

    // console.log('====== AFTER ======', type);

    // use extend class to hide sensitive information
    // make domain specified proxy
    // make sure name is not same with newName

    // Create another Proxy here impact performance too much
    // const newTarget = new Proxy(agent, new OnDemandClassConstructor());

    // return class extends newAgent {};
    const domainAgent = target.invoke<any>(params, agent);

    // RememberAgentType(domainAgent, target.design.declaringType);

    // console.log('****domainAgent', domainAgent, domainAgent.toString());
    // debugger;
    return domainAgent;
  }
}
