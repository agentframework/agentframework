import { Domain } from '../Domain';
import { Arguments, ClassInvocation } from '../../../dependencies/core';

/**
 *
 */
export class RegisterDomainAgentAttribute {
  constructor(readonly domain: Domain) {}

  get interceptor() {
    return this;
  }

  intercept(target: ClassInvocation, params: Arguments, receiver: Function) {
    const agent = target.invoke(params, receiver);
    this.domain.addAgent(receiver, agent);
    // console.log('same domain', domain, this.domain, '=====', this.domain === domain);
    return agent;
  }
}
