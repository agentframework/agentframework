import { Domain } from '../Domain';
import { Domains } from '../DomainKnowledge';

export function GetDomain(key: Function | object): Domain | undefined {
  return Domains.v1.get(key);
}
