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

import { InMemoryDomain } from '../InMemoryDomain';
import { Domain } from '../Domain';
import { Domains } from '../DomainKnowledge';

/**
 * Get global domain. The domain for all domains.
 */
export function GetGlobalDomain(): Domain {
  const domains = Domains.v1;
  const existDomain = domains.get(domains);
  if (existDomain) {
    return existDomain;
  }
  const newDomain = Reflect.construct(InMemoryDomain, []);
  Reflect.defineProperty(newDomain, 'name', {
    value: 'GlobalDomain',
  });
  domains.set(domains, newDomain);
  return newDomain;
}
