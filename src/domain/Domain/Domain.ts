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
import { Agent, AgentReference, Params } from './Agent';
import { RememberDomain } from './Knowledges/Domains/Domains';

/**
 * Domain is a container of types and agents
 *
 * 1. use to manage the agents
 * 2. use to do type mapping
 * 3. use to inject
 */
export abstract class Domain implements DomainLike {
  /**
   *
   */
  static construct<T extends Function>(target: T, params: Params<T>): Agent<T> {
    return Reflect.construct(target, params);
  }

  constructor() {
    RememberDomain(this, this);
  }

  /**
   * Get domain name
   */
  abstract readonly name: string;

  /**
   * Get instance of the specified type, return undefined if not exists
   */
  abstract getAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined;

  /**
   * Get agent constructor for the specified type, return undefined if not exists
   */
  abstract getAgentType<T extends Function>(type: T): T | undefined;

  /**
   * Get constructor for the specified type, return undefined if not exists
   */
  abstract getType<T extends Function>(type: T): T | undefined;

  /**
   * compile domain agent
   */
  abstract compile<T extends Function>(target: T): void;

  /**
   * Inject an agent
   */
  abstract construct<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Agent<T>;

  /**
   * Resolve and inject an agent using factory method
   */
  abstract resolve<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Promise<Agent<T>>;

  /**
   * Register a new type, without rewrite any existing types
   */
  abstract addType(type: Function): void;

  /**
   * Replace type
   */
  abstract setType(type: Function, replacement: Function): void;

  /**
   * Delete type mapping for giving type
   */
  abstract removeType(type: Function): void;

  /**
   * Add an agent
   */
  abstract addAgent<T extends AgentReference>(agent: Agent<T>): void;

  /**
   * Set agent instance
   */
  abstract setAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void;

  /**
   * Delete agent. do nothing if identifier not exits
   */
  abstract removeAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): boolean;
}
