import { Domains } from '../DomainKnowledge';
import { Domain } from '../Domain';

/**
 * `true` if target object is a domain
 */
export function IsDomain(target: object): target is Domain {
  return target && Domains.v1.get(target) === target;
}
