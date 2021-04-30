import { AnyClass } from '../Class';
import { Domain } from '../Domain';
import { DomainAgents } from '../DomainKnowledge';

export function RememberDomainAgent(domain: Domain, type: AnyClass, agent: AnyClass): void {
  let domains = DomainAgents.v1.get(type);
  if (!domains) {
    domains = new Map();
    DomainAgents.v1.set(type, domains);
  }
  domains.set(domain, agent);
}
