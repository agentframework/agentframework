import { Domain } from '../Domain';
import { DomainKnowledge } from '../DomainKnowledge';

export function GetLocalDomain(domainType: Function): Domain {
  if (DomainKnowledge.domain) {
    return DomainKnowledge.domain;
  }
  return (DomainKnowledge.domain = Reflect.construct(domainType, []));
}
