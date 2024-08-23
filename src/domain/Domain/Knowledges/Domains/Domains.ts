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

import { DomainLike } from '../../DomainLike';
import { Remember } from '../../../../dependencies/agent';

/**
 * @private
 * Get domain of giving instance or type
 */
export class Domains {
  // key: Agent Type,             value: Domain instance
  // key: Agent Type Prototype,   value: Domain instance
  // key: Domain instance,        value: Domain instance
  // key: Domain Type Prototype,  value: Domain Type Prototype
  static get v1() {
    return Remember('Domains', this, 'v1', () => new WeakMap<Function | object, DomainLike | undefined>());
  }
}

/**
 *
 */
export function RememberDomain(key: object | Function, domain: DomainLike): void {
  Domains.v1.set(key, domain);
}

/**
 * `true` if target object is a domain
 */
export function IsDomain(target: object): target is DomainLike {
  return target && Domains.v1.get(target) === target;
}

/**
 * Get parent domain for current object
 */
export function GetDomain(key: Function | object): DomainLike | undefined {
  return Domains.v1.get(key);
}
