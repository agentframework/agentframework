import { Knowledge } from '../Knowledge';
import { Domain } from '../Domain';

/**
 * `true` if target object is a domain
 *
 * @param target
 */
export function IsDomain(target: any): target is Domain {
  return target && Knowledge.GetDomain(target) === target;
}
