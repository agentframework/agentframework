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
 * Domain is a container for managing types and agents.
 *
 * Responsibilities:
 * 1. Manage agents within the domain.
 * 2. Handle type mappings for dependency resolution.
 * 3. Provide injection mechanisms for agent construction and retrieval.
 */
export abstract class Domain implements DomainLike {
  /**
   * Constructs a new agent instance using the given target and parameters.
   *
   * @param target - The constructor function of the agent.
   * @param params - The parameters required for instantiating the agent.
   * @returns A new agent instance of the given type.
   */
  static construct<T extends Function>(target: T, params: Params<T>): Agent<T> {
    return Reflect.construct(target, params);
  }

  /**
   * Default constructor that registers the domain instance.
   */
  constructor() {
    RememberDomain(this, this);
  }

  /**
   * Gets the domain name.
   */
  abstract readonly name: string;

  /**
   * Retrieves an agent of the specified type.
   *
   * @param identifier - The reference to the agent type.
   * @returns The agent instance if found, otherwise undefined.
   */
  abstract getAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined;

  /**
   * Retrieves the constructor function for the given agent type.
   *
   * @param type - The agent type to look up.
   * @returns The constructor function if found, otherwise undefined.
   */
  abstract getAgentClass<T extends Function>(type: T): T | undefined;

  /**
   * Retrieves the constructor function for the given type.
   *
   * @param type - The type to look up.
   * @returns The constructor function if found, otherwise undefined.
   */
  abstract getType<T extends Function>(type: T): T | undefined;

  /**
   * Compiles the given target as a domain agent.
   *
   * @param target - The function or class to compile.
   */
  abstract compile<T extends Function>(target: T): void;

  /**
   * Constructs and injects an agent instance.
   *
   * @param target - The constructor function of the agent.
   * @param params - Optional parameters for agent construction.
   * @param transit - Whether to allow transient injection.
   * @returns The constructed agent instance.
   */
  abstract resolve<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Agent<T>;

  /**
   * Resolves and injects an agent using an asynchronous factory method.
   *
   * @param target - The constructor function of the agent.
   * @param params - Optional parameters for agent resolution.
   * @param transit - Whether to allow transient injection.
   * @returns A promise resolving to the constructed agent instance.
   */
  abstract resolveAsync<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Promise<Agent<T>>;

  /**
   * Registers a new type if it does not already exist.
   *
   * @param type - The type to register.
   */
  abstract addType(type: Function): void;

  /**
   * Replaces an existing type with a new implementation.
   *
   * @param type - The original type to replace.
   * @param replacement - The new type implementation.
   */
  abstract setType(type: Function, replacement: Function): void;

  /**
   * Removes the type mapping for a given type.
   *
   * @param type - The type to remove from the registry.
   */
  abstract removeType(type: Function): void;

  ///**
  // * Set agent type
  // */
  //abstract setAgentType(type: Function, replacement: Function): void;

  /**
   * Registers a new agent instance.
   *
   * @param identifier - The reference identifier for the agent.
   * @param agent - The agent instance to register.
   */
  abstract addAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void;

  /**
   * Updates or overrides an existing agent instance.
   *
   * @param identifier - The reference identifier for the agent.
   * @param agent - The new agent instance to set.
   */
  abstract setAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void;

  /**
   * Removes an agent if it matches the given identifier.
   *
   * @param identifier - The reference identifier for the agent.
   * @param agent - The agent instance to remove.
   * @returns True if the agent was successfully removed, otherwise false.
   */
  abstract removeAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): boolean;
}
