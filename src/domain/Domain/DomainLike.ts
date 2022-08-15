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

import { Agent, AgentReference } from './Agent';

/**
 * A remote domain reference
 */
export interface DomainLike {

  /**
   * Get constructor for the specified type, return undefined if not exists
   */
  getType<T extends Function>(type: T): T | undefined;

  /**
   * Get agent constructor for the specified type, return undefined if not exists
   */
  getAgentType<T extends Function>(type: T): T | undefined;

  /**
   * Get domain agent constructor for the specified type, return undefined if not exists
   */
  getDomainAgentType<T extends Function>(type: T): T | undefined;

  /**
   * Get instance of the specified type, return undefined if not exists
   */
  getAgent<T extends AgentReference>(type: T): Agent<T> | undefined;
  //
  // /**
  //  * Add an agent
  //  */
  // addAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void;
  //
}
