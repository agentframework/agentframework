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

import { Arguments, Invocation } from '../../../../packages/dependencies/agent';
import { DomainLike } from '../DomainLike';
import { GetDomain } from '../Knowledges/Domains/Domains';

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
