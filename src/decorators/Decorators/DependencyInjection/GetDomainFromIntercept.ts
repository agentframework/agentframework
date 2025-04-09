import { Arguments, Invocation } from '@agentframework/agent';
import { DomainLike, GetDomain } from '@agentframework/domain';

/**
 * Find domain from invocation or parameters
 *
 * DomainReference don't have construct or resolve, so it will never create new instance
 */
export function GetDomainFromIntercept(
  target: Invocation,
  params: Arguments,
  receiver: Function | object
): DomainLike | undefined {
  // console.log('find domain', typeof receiver, receiver, 'params', params);
  const found = GetDomain(receiver) || (receiver && GetDomain(receiver.constructor));
  if (found) {
    return found;
  }
  return;
}
