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

import { AgentReference, Agent, Params } from './Agent';

/**
 * A remote domain reference
 */
export interface DomainLike {
  /**
   * Name of the domain
   */
  readonly name: string;

  /**
   * compile agent
   */
  compile<T extends Function>(target: T): void;

  // /**
  //  * Check if have agent
  //  */
  // hasAgent<T extends AgentIdentifier>(type: T): boolean;

  /**
   * Get instance of giving type, return undefined if don't have
   */
  getAgent<T extends AgentReference>(type: T): Agent<T> | undefined;

  // /**
  //  * Get agent of giving type, throw an error if don't have
  //  */
  // getInstanceOrThrow<T extends AgentIdentifier>(type: T): Agent<T>;

  // /**
  //  * Get agent type
  //  */
  // getAgent<T extends AnyClass>(type: T): T | undefined;

  // /**
  //  * Check if have type registered
  //  */
  // hasType<T extends AnyClass>(type: T): boolean;
  /**
   * Get constructor for current type, return undefined if don't have
   */
  getAgentType<T extends Function>(type: T): T | undefined;

  /**
   * Get constructor for current type, return undefined if don't have
   */
  getType<T extends Function>(type: T): T | undefined;

  // /**
  //  * Get constructor for current type, throw an error if don't have
  //  */
  // getTypeOrThrow<T extends AnyClass, P extends T>(type: T): P;

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
   * Replace type
   */
  setAgentType(type: Function, replacement: Function): void;

  /**
   * Add an agent
   */
  addAgent<T extends AgentReference>(type: T, agent: Agent<T>): void;

  /**
   * Set agent instance
   */
  setAgent<T extends AgentReference>(type: T, agent: Agent<T>): void;

  /**
   * Delete agent. do nothing if agent not match
   */
  removeAgent<T extends AgentReference>(type: T, agent: Agent<T>): boolean;
}
