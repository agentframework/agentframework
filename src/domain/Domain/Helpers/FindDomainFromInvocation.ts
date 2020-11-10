import { Arguments } from '../../../dependencies/core';
import { IsDomain } from './IsDomain';
import { FindDomain } from './FindDomain';
import { DomainKnowledge } from '../DomainKnowledge';
import { Domain } from '../Domain';

/**
 * Find domain from invocation or parameters
 *
 * DomainReference don't have construct or resolve, so it will never create new instance
 */
export function FindDomainFromInvocation(params: Arguments, receiver: Function | object): Domain | undefined {
  // console.log('find domain', typeof receiver, receiver, 'params', params);

  if (typeof receiver === 'function') {
    // console.log('find', receiver);
    // check: receiver is domain scope type
    const found = FindDomain(receiver);
    if (found) {
      // console.log('🍎 🍎 🍎 🍎 🍎 receiver type registered by a Domain', receiver);
      return found;
    }
  } else if (typeof receiver === 'object' && receiver != null) {
    // check: receiver is a domain
    const domain = DomainKnowledge.GetDomain(receiver);
    if (domain) {
      // console.log('👏 👏 👏 👏  receiver is a Domain', receiver.constructor.name);
      return domain;
    }
    // console.log('find', receiver, domain);
    // check: receiver is an object (search the prototype chain)
    const found = FindDomain(receiver.constructor);
    if (found) {
      return found;
    }
  }

  // 4. if there have a domain instance in the parameter
  for (let idx = 0; idx < params.length; idx++) {
    const parameter = params[idx];
    if (IsDomain(parameter)) {
      return parameter;
    }

  }



  return;
}
