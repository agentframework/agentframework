/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { Arguments, Invocation } from '../../../dependencies/agent';
// import { IsDomain } from './IsDomain';
import { DomainLike } from '../DomainLike';
import { GetDomain } from '../Knowledges/Domains/Domains';

/**
 * Find domain from invocation or parameters
 *
 * DomainReference don't have construct or resolve, so it will never create new instance
 */
export function GetDomainFromInvocation(
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
  // console.log('receiver', typeof receiver, receiver);

  // if (typeof receiver === 'function') {
  //   // console.log('find', receiver);
  //   // check: receiver is domain scope type
  //   const found = FindDomain(receiver);
  //   if (found) {
  //     // console.log('🍎 🍎 🍎 🍎 🍎 receiver type registered by a Domain', receiver);
  //     return found;
  //   }
  // } else if (typeof receiver === 'object' && receiver != null) {
  //   // check: receiver is a domain
  //   const domain = GetDomain(receiver);
  //   if (domain) {
  //     // console.log('👏 👏 👏 👏  receiver is a Domain', receiver.constructor.name);
  //     return domain;
  //   }
  //   // console.log('find', receiver, domain);
  //   // check: receiver is an object (search the prototype chain)
  //   const found = FindDomain(receiver.constructor);
  //   if (found) {
  //     return found;
  //   }
  // }

  // 4. if there have a domain instance in the parameter
  // for (let idx = 0; idx < params.length; idx++) {
  //   const parameter = params[idx];
  //   if (IsDomain(parameter)) {
  //     return parameter;
  //   }
  // }
}
