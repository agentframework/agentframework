/* Copyright 2024 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { InMemoryDomain } from './InMemoryDomain';
import { Domains } from './Knowledges/Domains/Domains';
import { DomainLike } from './DomainLike';

/**
 * Get global domain. The domain for all domains.
 */
export function GetGlobalDomain(): DomainLike {
  const domain = Domains.v1;
  const existDomain = domain.get(domain);
  if (existDomain) {
    return existDomain;
  }

  const newDomain = Reflect.construct(InMemoryDomain, []);
  Reflect.defineProperty(newDomain, 'name', {
    value: '.',
  });
  domain.set(domain, newDomain);
  return newDomain;
}
