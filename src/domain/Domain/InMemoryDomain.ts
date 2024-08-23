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
import { CreateDomainAgent } from './DomainAgent/CreateDomainAgent';
import { InMemory } from './Knowledges/InMemory';
import { RememberDomainType } from './Knowledges/DomainTypes/RememberDomainType';
import { GetDomainType } from './Knowledges/DomainTypes/GetDomainType';
import { GetDomainDomainAgentType } from './Knowledges/DomainDomainAgentTypes/GetDomainDomainAgentType';
import { ForgetDomainType } from './Knowledges/DomainTypes/ForgetDomainType';
import { GetDomainAgentType } from './Knowledges/DomainDomainAgentTypes/GetDomainAgentType';
import { CompileDomainAgent } from './DomainAgent/CompileDomainAgent';
import {
  DisposeDomainAgents,
  ForgetDomainAgent,
  GetDomainAgent,
  RememberDomainAgent,
  SetDomainAgent,
} from './Knowledges/DomainAgents/GetDomainAgent';

/**
 * In memory domain
 */
export class InMemoryDomain extends Domain implements Disposable {
  /**
   * Return true if this domain disposed
   */
  disposed?: boolean;

  /**
   * Domain name
   */
  get name(): string {
    return this.constructor.name;
  }

  getAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined {
    // const agent = InMemory.agents(this).get(identifier);
    // console.log('getAgent', InMemory.agents(this), '<----', identifier, '<----', agent);
    return GetDomainAgent(this, identifier);
  }

  getAgentType<T extends Function>(type: T): T | undefined {
    return GetDomainAgentType(this, type);
  }

  getType<T extends Function>(type: T): T | undefined {
    return GetDomainType(this, type);
  }

  //region Factory

  /**
   * compile agent. the compiled agent will reduce time to construct the same agent in this domain or sub-domains
   */
  compile<T extends Function>(target: T): void {
    CompileDomainAgent(this, this.getType<T>(target) || target);
  }

  /**
   * Create and initial an agent
   */
  construct<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Agent<T> {
    // find the mapped type if exists
    const type = this.getType<T>(target) || target;
    const register = !transit;

    if (register) {
      const exists = this.getAgent(type);
      if (exists !== undefined) {
        return exists;
      }
    }

    // find or create DomainAgent
    const agentType = GetDomainDomainAgentType(this, type) || CreateDomainAgent(this, type);

    // console.log('construct', target.name, 'from', type.name);
    // initialize agent class
    const agent = Reflect.construct(agentType, params || []);

    // console.log('AGENT ====>', agent.constructor.name);

    // note: to prevent human mistake
    // do not allow construct promise or observable using constructor
    if (IsPromise(agent)) {
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
      this.addAgent(agent);
      this.setAgent(type, agent);
    }

    // InitializeDomainAgent(type, agent);
    return agent;
  }

  /**
   * Create and initial an agent asynchronously
   */
  async resolve<T extends Function>(target: T, params?: Params<T>, transit?: boolean): Promise<Agent<T>> {
    // domain cache for promise type
    const register = !transit;
    const _incomingAgents = InMemory.incomingAgents(this);
    const type = this.getType<T>(target) || target;

    if (register) {
      const exists = this.getAgent(type);
      if (exists !== undefined) {
        return Promise.resolve(exists);
      }
      const pending = _incomingAgents.get(type);
      if (pending) {
        return <Promise<Agent<T>>>pending;
      }
    }

    // find domainAgent
    const domainAgent = GetDomainDomainAgentType(this, type) || CreateDomainAgent(this, type);

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
            this.addAgent(agent);
            this.setAgent(type, agent);
            _incomingAgents.delete(type);
          }
          // InitializeDomainAgent(type, newCreatedAgent);
          return agent;
        },
        (err) => {
          if (register) {
            _incomingAgents.delete(type);
          }
          return Promise.reject(err);
        }
      );
    } else if (IsObservable(newCreated)) {
      // TODO: add observable support later version
      return Promise.reject(new AgentFrameworkError('NotSupportResolveObservableObject'));
    } else {
      // no need register instance with domain
      // DomainCore.SetDomain(newCreated, this);
      if (!transit) this.addAgent(newCreated);
      // InitializeDomainAgent(type, newCreated);
      return Promise.resolve(newCreated);
    }
  }

  //endregion

  //region Manage Type / Instance in this Domain
  /**
   * Register type
   */
  addType<T extends object>(type: Class<T>): void {
    let ctor: Function | null | undefined = type;
    while (ctor && Function.prototype !== ctor) {
      RememberDomainType(this, ctor, type);
      ctor = Reflect.getPrototypeOf(ctor) as Function;
    }
  }

  /**
   * Add an agent
   */
  addAgent<T extends AgentReference>(agent: Agent<T>): void {
    RememberDomainAgent(this, agent);
  }

  /**
   * Set agent instance
   */
  setAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void {
    SetDomainAgent(this, identifier, agent);
  }

  /**
   * Replace type
   */
  setType<T extends object>(type: Class<T>, replacement: Class<T>): void {
    // this._types.add(replacement);
    RememberDomainType(this, type, replacement, true);
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
    ForgetDomainType(this, type);
  }

  /**
   * Delete agent. do nothing if agent not match
   */
  removeAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): boolean {
    return ForgetDomainAgent(this, identifier, agent);
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
    this.disposed = true;
    const _incomingAgents = InMemory.incomingAgents(this);
    for (const promise of _incomingAgents.values()) {
      promise.then((agent) => {
        if (typeof agent === 'object' && agent != null && typeof agent['dispose'] === 'function') {
          // TODO: only dispose the agent of current domain
          agent.dispose();
        }
      });
    }

    DisposeDomainAgents(this);
  }
}
