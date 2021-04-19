import { AbstractConstructor } from '../../../dependencies/core';
import { Domain } from '../Domain';
import { DomainAgents } from '../DomainKnowledge';

export function RememberDomainAgent<T extends AbstractConstructor<any>>(domain: Domain, type: T, agent: T): void {
  let domains = DomainAgents.v1.get(type);
  if (!domains) {
    domains = new Map();
    DomainAgents.v1.set(type, domains);
  }
  domains.set(domain, agent);
}
