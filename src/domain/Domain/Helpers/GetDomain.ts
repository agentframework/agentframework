import { Domain } from '../Domain';
import { DomainKnowledge } from '../DomainKnowledge';

export function GetDomain(key: any): Domain | undefined {
  return DomainKnowledge.domains.get(key);
}
