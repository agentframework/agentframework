import { AgentAttribute, Arguments, ClassInterceptor, ClassInvocation } from '../../../dependencies/core';
import { Knowledge } from '../Knowledge';
import { Domain } from '../Domain';
// import { OnDemandClassConstructor } from './DomainAgentConstructor';

export class DomainAgentAttribute extends AgentAttribute implements ClassInterceptor {
  constructor(private readonly domain: Domain) {
    super();
  }

  get domainName() {
    const name = this.domain.constructor.name;
    const fdx = name.lastIndexOf('__');
    if (fdx > 0) {
      return name.slice(fdx + 2);
    }
    return name;
  }

  // target: the origin type
  // receiver: intercepted type
  intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
    const agentName = receiver.name;

    // console.log('====== BEFORE ======', name);
    // create a new function

    // NOTE: check level 1 cache, the agent class which can share across domain
    let agent = Knowledge.GetAgent(receiver);
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
      Knowledge.RememberAgent(receiver, agent);
    }

    // console.log('====== AFTER ======', type.name);

    // NOTE: create a domain specified class which can register in current domain
    // console.log('c', this.domain.constructor.name);
    //
    const domainAgentName = `${this.domainName}__${agent.name}`;

    // console.log('new Name', this.domainName, newName);

    // console.log('====== AFTER ======', type);

    // use extend class to hide sensitive information
    // make domain specified proxy
    // make sure name is not same with newName

    const code = `return class ${domainAgentName} extends ${agentName}`;
    // console.log('****type', type, type.toString());

    // Create another Proxy here impact performance too much
    // const newTarget = new Proxy(agent, new OnDemandClassConstructor());

    const domainAgent = target.invoke<any>([Function, agentName, code, 'domain agent code'], agent);

    // console.log('****domainAgent', domainAgent, domainAgent.toString());

    // debugger;
    return domainAgent;
  }
}
