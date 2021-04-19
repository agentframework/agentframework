import { Domain } from '../Domain';
import { Domains } from '../DomainKnowledge';

export function RememberDomain(key: object | Function, domain: Domain): void {
  Domains.v1.set(key, domain);
}
