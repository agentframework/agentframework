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

import { DomainLike } from './DomainLike';
import { Agent, AgentReference } from './Agent';

export interface SubDomainLike extends DomainLike {
  /**
   * the parent domain
   */
  readonly parent: DomainLike;

  /**
   * get own type
   */
  getOwnType<T extends Function>(type: T): T | undefined;

  /**
   * get own agent
   */
  getOwnAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined;
}
