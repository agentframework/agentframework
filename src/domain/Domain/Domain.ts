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

import { Class } from '../../dependencies/agent';
import { DomainLike } from './DomainLike';
import { Agent, AgentReference, Params } from './Agent';
import { RememberDomain } from './Helpers/RememberDomain';

/**
 * Domain is a container of types and agents
 */
export abstract class Domain implements DomainLike {
  /**
   * Get domain name
   */
  abstract readonly name: string;

  /**
   * default constructor
   */
  constructor() {
    RememberDomain(this, this);
  }

  /**
   * Construct a new instance
   */
  static construct<T extends Function>(target: T, params: Params<T>): Agent<T> {
    return Reflect.construct(target, params);
  }

  /**
   * Get agent of giving type, return undefined if don't have
   */
  abstract getAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined;

  /**
   * Get constructor for current type, return undefined if don't have
   */
  abstract getAgentType<T extends Function>(type: T): T | undefined;

  /**
   * Get constructor for current type, return undefined if don't have
   */
  abstract getType<T extends Function>(type: T): T | undefined;

  //region Factory
  abstract compile<T extends Function>(target: T): void;

  /**
   * Inject an agent
   */
  abstract construct<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Agent<T>;

  /**
   * Resolve and inject an agent using factory method
   */
  abstract resolve<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Promise<Agent<T>>;

  //endregion

  /**
   * Register a new type, without rewrite any existing types
   */
  abstract addType<T extends object>(type: Class<T>): void;

  /**
   * Replace type
   */
  abstract setType<T extends object>(type: Class<T>, replacement: Class<T>): void;

  /**
   * Delete type mapping for giving type
   */
  abstract removeType<T extends object>(type: Class<T>): void;

  abstract setAgentType<T extends object>(type: Class<T>, replacement: Class<T>): void;

  // /**
  //  * Get all registered types in this domain
  //  */
  // abstract getTypes(): Array<Class>;

  /**
   * Add an agent
   */
  abstract addAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void;

  /**
   * Set agent instance
   */
  abstract setAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void;

  /**
   * Delete agent. do nothing if agent not match
   */
  abstract removeAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): boolean;

  // /**
  //  * Replace agent, throw error if origin agent not match
  //  */
  // abstract replaceAgent<T extends AgentIdentifier>(identifier: T, origin: Agent<T>, replace: Agent<T>): void;

  // /**
  //  * Get all registered agents in this domain
  //  */
  // abstract getAgents(): Iterable<any>;
}
