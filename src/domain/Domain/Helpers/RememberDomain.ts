import { Domain } from '../Domain';
import { DomainKnowledge } from '../DomainKnowledge';

export function RememberDomain(key: object | Function, domain: Domain): void {
  DomainKnowledge.domains.set(key, domain);
}
