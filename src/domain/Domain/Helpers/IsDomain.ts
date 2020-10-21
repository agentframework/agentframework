import { DomainKnowledge } from '../DomainKnowledge';
import { Domain } from '../Domain';

/**
 * `true` if target object is a domain
 *
 * @param target
 */
export function IsDomain(target: any): target is Domain {
  return target && DomainKnowledge.GetDomain(target) === target;
}
