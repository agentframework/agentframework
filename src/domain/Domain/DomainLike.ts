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

import { Agent, AgentReference, Params } from './Agent';

/**
 * A remote domain reference
 */
export interface DomainLike {
  /**
   * Get domain name
   */
  readonly name: string;

  /**
   * Get instance of the specified type, return undefined if not exists
   */
  getAgent<T extends AgentReference>(type: T): Agent<T> | undefined;

  /**
   * Get agent constructor for the specified type, return undefined if not exists
   */
  getAgentType<T extends Function>(type: T): T | undefined;

  /**
   * Get constructor for the specified type, return undefined if not exists
   */
  getType<T extends Function>(type: T): T | undefined;

  /**
   * Compile domain agent
   */
  compile<T extends Function>(target: T): void;

  /**
   * Inject an agent
   */
  construct<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Agent<T>;

  /**
   * Resolve and inject an agent using factory method
   */
  resolve<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Promise<Agent<T>>;

  /**
   * Register a new type, without rewrite any existing types
   */
  addType(type: Function): void;

  /**
   * Replace type
   */
  setType(type: Function, replacement: Function): void;

  /**
   * Delete type mapping for giving type
   */
  removeType(type: Function): void;

  /**
   * Add an agent
   */
  addAgent<T extends AgentReference>(agent: Agent<T>): void;

  /**
   * Set agent instance
   */
  setAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void;

  /**
   * Delete agent. do nothing if identifier not exits
   */
  removeAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): boolean;
}
