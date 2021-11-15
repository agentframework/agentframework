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

import { AgentFrameworkError, Class } from '../../dependencies/agent';
import { Disposable } from './Helpers/Disposable';
import { Agent, AgentReference, Params } from './Agent';
import { Domain } from './Domain';
import { IsPromise } from './Helpers/IsPromise';
import { IsObservable } from './Helpers/IsObservable';
import { CompileDomainAgent, CreateDomainAgent } from './DomainAgent/CreateDomainAgent';
import { GetDomainAgent } from './DomainAgent/GetDomainAgent';
import { InMemory } from './InMemory';

// import { DomainKnowledge } from './DomainKnowledge';

/**
 * In memory domain
 */
export class InMemoryDomain extends Domain implements Disposable {
  /**
   * Return true if this domain disposed
   */
  disposed?: boolean;

  /**
   * Return true if this domain disposing
   */
  disposing?: boolean;

  /**
   * Domain name
   */
  get name(): string {
    return this.constructor.name;
  }

  // /**
  //  * Check if have agent
  //  */
  // hasInstance<T extends AgentIdentifier>(type: T): boolean {
  //   return this._singletons.has(type);
  // }

  /**
   * Get agent of giving type, return undefined if don't have
   */
  getAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined {
    return InMemory.agents(this).get(identifier);
  }

  // /**
  //  * Get agent of giving type, throw an error if don't have
  //  */
  // getInstanceOrThrow<T extends AgentIdentifier>(type: T): Agent<T> {
  //   const agent = this.getInstance(type);
  //   if (!agent) {
  //     throw new AgentNotFoundError(type);
  //   }
  //   return agent;
  // }

  // /**
  //  * Check if have type registered
  //  */
  // hasType<T extends AnyClass>(type: T): boolean {
  //   return this._types.has(type);
  // }

  getAgentType<T extends Function>(type: T): T | undefined {
    return InMemory.agentTypes(this).get(type);
  }

  /**
   * Get constructor for current type, return undefined if don't have
   */
  getType<T extends Function>(type: T): T | undefined {
    return InMemory.types(this).get(type);
  }

  // /**
  //  * Get constructor for current type, throw an error if don't have
  //  */
  // getTypeOrThrow<T extends AnyClass, P extends T>(type: T): P {
  //   const resolvedType = this.getType(type);
  //   if (!resolvedType) {
  //     throw new TypeNotFoundError(type);
  //   }
  //   return <P>resolvedType;
  // }
  // /**
  //  * Get agent
  //  */
  // getDomainAgent<T extends AnyClass>(type: T): T | undefined {
  //   return this._agents.get(type);
  // }

  //region Factory

  compile<T extends Function>(target: T): void {
    CompileDomainAgent(this, this.getType<T>(target) || target);
  }

  /**
   * Create and initial an agent
   */
  construct<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Agent<T> {
    const register = !transit;
    if (register) {
      const exists = this.getAgent(target);
      if (exists !== undefined) {
        return exists;
      }
    }

    // find extended type
    const type = this.getType<T>(target) || target;

    // find domainAgent
    const domainAgent = GetDomainAgent(this, type) || CreateDomainAgent(this, type);

    // console.log('construct', target.name, 'from', type.name);
    // initialize agent class
    const agent = Reflect.construct(domainAgent, params || []);

    // console.log('AGENT ====>', agent.constructor.name);

    // note: to prevent human mistake
    // do not allow construct promise or observable using constructor
    if (IsPromise(agent)) {
      // drop agent
      throw new AgentFrameworkError('NotAllowConstructPromiseObject');
    }

    if (IsObservable(agent)) {
      throw new AgentFrameworkError('NotAllowConstructObservableObject');
    }

    // no need register instance with domain
    // if (agent === target) {
    //   RememberDomain(instance, this);
    // }

    if (register) {
      // register agent to domain only if not transit
      this.addAgent(type, agent);
    }

    // InitializeDomainAgent(type, agent);

    return agent;
  }

  /**
   * Create and initial an agent asynchronously
   */
  resolve<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Promise<Agent<T>> {
    try {
      const _incomingAgents = InMemory.incomingAgents(this);
      const register = !transit;
      if (register) {
        const exists = this.getAgent(target);
        if (exists !== undefined) {
          return Promise.resolve(exists);
        }
        const pending = _incomingAgents.get(target);
        if (pending) {
          return <Promise<Agent<T>>>pending;
        }
      }

      // find extended type
      const type = this.getType<T>(target) || target;

      // find domainAgent
      const domainAgent = GetDomainAgent(this, type) || CreateDomainAgent(this, type);

      // initialize agent class
      const newCreated = Reflect.construct(domainAgent, params || []);

      if (IsPromise<Agent<T>>(newCreated)) {
        if (register) {
          _incomingAgents.set(type, newCreated);
        }
        return newCreated.then(
          (agent) => {
            // no need register instance with domain
            // if (agent === target) {
            //   RememberDomain(instance, this);
            // }
            if (register) {
              this.addAgent(type, agent);
              _incomingAgents.delete(type);
            }
            // InitializeDomainAgent(type, newCreatedAgent);
            return agent;
          },
          (err) => {
            if (!transit) {
              _incomingAgents.delete(type);
            }
            throw err;
          }
        );
      } else if (IsObservable(newCreated)) {
        // TODO: add observable support later version
        throw new AgentFrameworkError('NotSupportResolveObservableObject');
      } else {
        // no need register instance with domain
        // DomainCore.SetDomain(newCreated, this);
        if (!transit) this.addAgent(type, newCreated);
        // InitializeDomainAgent(type, newCreated);
        return Promise.resolve(newCreated);
      }
    } catch (e: any) {
      return Promise.reject(e);
    }
  }
  //endregion

  //region Manage Type / Instance in this Domain
  /**
   * Register type
   */
  addType<T extends object>(type: Class<T>): void {
    let ctor: Function | null | undefined = type;
    const types = InMemory.types(this);
    while (ctor && !types.has(ctor) && Function.prototype !== ctor) {
      types.set(ctor, type);
      ctor = Reflect.getPrototypeOf(ctor) as Function;
    }
  }

  /**
   * Add an agent
   */
  addAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void {
    const _agents = InMemory.agents(this);
    if (typeof identifier === 'function') {
      let ctor: Function | null | undefined = identifier;
      // console.log('add agent 1', identifier, agent)
      while (ctor && !_agents.has(ctor) && Function.prototype !== ctor) {
        // console.log('add agent 2', ctor, agent)
        _agents.set(ctor, agent);
        ctor = Reflect.getPrototypeOf(ctor) as Function;
      }
    } else {
      _agents.set(identifier, agent);
    }
  }

  /**
   * Replace type
   */
  setType<T extends object>(type: Class<T>, replacement: Class<T>): void {
    // this._types.add(replacement);
    InMemory.types(this).set(type, replacement);
  }

  setAgentType<T extends object>(type: Class<T>, replacement: Class<T>): void {
    InMemory.agentTypes(this).set(type, replacement);
  }

  // /**
  //  * Get all registered types in this domain
  //  */
  // getTypes(): Array<Class> {
  //   const types: Array<Class> = [];
  //   const uniqueTypes = new Set(types);
  //   for (const type of this._types.values()) {
  //     if (!uniqueTypes.has(type)) {
  //       uniqueTypes.add(type);
  //       types.push(type);
  //     }
  //   }
  //   return types;
  // }

  /**
   * Set agent instance
   */
  setAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void {
    InMemory.agents(this).set(identifier, agent);
  }

  // /**
  //  * Replace agent, throw error if origin agent not match
  //  */
  // replaceAgent<T extends AgentIdentifier>(type: T, origin: Agent<T>, replace: Agent<T>): void {
  //   if (!this._agents.has(type)) {
  //     throw new Error('OriginAgentNotFound');
  //   }
  //   if (this._agents.get(type) !== origin) {
  //     throw new Error('OriginAgentNotMatch');
  //   }
  //   this._agents.set(type, replace);
  // }

  /**
   * Delete type mapping for giving type
   */
  removeType<T extends object>(type: Class<T>): void {
    InMemory.types(this).delete(type);
  }

  /**
   * Delete agent. do nothing if agent not match
   */
  removeAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): boolean {
    const _agents = InMemory.agents(this);
    if (_agents.has(identifier) && _agents.get(identifier) === agent) {
      _agents.delete(identifier);
      // do not dispose because this agent may used by others
      return true;
    }
    return false;
  }
  //endregion

  // public beforeDecorate(attribute: IAttribute, target: Function): boolean {
  //   return true;
  // }

  // /**
  //  * Get all registered agents in this domain
  //  */
  // getAgents(): Iterable<any> {
  //   return this._agents.values();
  // }

  /**
   * Dispose this domain and all created agents
   */
  dispose(): void {
    if (this.disposed) {
      return;
    }
    const _incomingAgents = InMemory.incomingAgents(this);
    const _agents = InMemory.agents(this);
    this.disposing = true;
    for (const promise of _incomingAgents.values()) {
      promise.then((agent) => {
        if (typeof agent === 'object' && agent != null && typeof agent.dispose === 'function') {
          // TODO: only dispose the agent of current domain
          agent.dispose();
        }
      });
    }
    for (const agent of _agents.values()) {
      if (typeof agent === 'object' && agent != null && typeof agent.dispose === 'function') {
        //  TODO: only dispose the agent of current domain
        agent.dispose();
      }
    }
    _incomingAgents.clear();
    _agents.clear();
    InMemory.types(this).clear();
    this.disposed = true;
  }
}
