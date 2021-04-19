import { AgentFrameworkError } from '../../dependencies/core';
import { Disposable } from './Helpers/Disposable';
import { Agent, AgentReference, Params, AnyClass, Class } from './ClassConstructor';
import { Domain } from './Domain';
import { IsPromise } from './Helpers/IsPromise';
import { IsObservable } from './Helpers/IsObservable';
import { CreateDomainAgent } from './Helpers/CreateDomainAgent';
import { GetDomainAgent } from './Helpers/GetDomainAgent';
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

  // privates
  /**
   * Unique types in this domain
   */
  private readonly _types = new Map<any, any>(); // type-type mapping
  private readonly _singletons = new Map<any, any>(); // type-instance mapping
  private readonly _futureSingletons = new Map<any, Promise<any>>();

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
    return this._singletons.get(identifier);
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

  /**
   * Get constructor for current type, return undefined if don't have
   */
  getType<T extends AnyClass>(type: T): T | undefined {
    return this._types.get(type);
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

  /**
   * Create and initial an agent
   */
  construct<T extends AnyClass>(target: T, params?: Params<T>, transit?: boolean): Agent<T> {
    const singleton = !transit;
    if (singleton) {
      const exists = this.getAgent(target);
      if (exists !== undefined) {
        return exists;
      }
    }

    // find extended type
    const type = this.getType<T>(target) || target;

    // find agent
    const proxy = GetDomainAgent(this, type) || CreateDomainAgent(this, type);

    // console.log('construct', target.name, 'from', type.name);
    // initialize agent class
    const agent = Reflect.construct(proxy, params || []);

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

    if (singleton) {
      // register agent to domain only if not transit
      this.addAgent(type, agent);
    }

    // InitializeDomainAgent(type, agent);

    return agent;
  }

  /**
   * Create and initial an agent asynchronously
   */
  resolve<T extends AnyClass>(target: T, params?: Params<T>, transit?: boolean): Promise<Agent<T>> {
    try {
      const singleton = !transit;
      if (singleton) {
        const exists = this.getAgent(target);
        if (exists !== undefined) {
          return Promise.resolve(exists);
        }
        const pending = this._futureSingletons.get(target);
        if (pending) {
          return <Promise<Agent<T>>>pending;
        }
      }

      // find extended type
      const type = this.getType<T>(target) || target;

      // find agent
      const proxy = GetDomainAgent(this, type) || CreateDomainAgent(this, type);

      // initialize agent class
      const newCreated: Promise<Agent<T>> = Reflect.construct(proxy, params || []);

      if (IsPromise(newCreated)) {
        if (singleton) {
          this._futureSingletons.set(type, newCreated);
        }
        return newCreated.then(
          agent => {
            // no need register instance with domain
            // if (agent === target) {
            //   RememberDomain(instance, this);
            // }
            if (singleton) {
              this.addAgent(type, agent);
              this._futureSingletons.delete(type);
            }
            // InitializeDomainAgent(type, newCreatedAgent);
            return agent;
          },
          err => {
            if (!transit) {
              this._futureSingletons.delete(type);
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
    } catch (err) {
      return Promise.reject(err);
    }
  }
  //endregion

  //region Manage Type / Instance in this Domain
  /**
   * Register type
   */
  addType<T extends object>(type: Class<T>): void {
    let ctor: object | null | undefined = type;
    while (ctor && !this._types.has(ctor) && Function.prototype !== ctor) {
      this._types.set(ctor, type);
      ctor = Reflect.getPrototypeOf(ctor);
    }
  }

  /**
   * Add an agent
   */
  addAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): void {
    if (typeof identifier === 'function') {
      let ctor: object | null | undefined = identifier;
      while (ctor && !this._singletons.has(ctor) && Function.prototype !== ctor) {
        this._singletons.set(ctor, agent);
        ctor = Reflect.getPrototypeOf(ctor);
      }
    } else {
      this._singletons.set(identifier, agent);
    }
  }

  /**
   * Replace type
   */
  setType<T extends object>(type: AnyClass<T>, replacement: Class<T>): void {
    // this._types.add(replacement);
    this._types.set(type, replacement);
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
    this._singletons.set(identifier, agent);
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
  removeType<T extends object>(type: AnyClass<T>): void {
    this._types.delete(type);
  }

  /**
   * Delete agent. do nothing if agent not match
   */
  removeAgent<T extends AgentReference>(identifier: T, agent: Agent<T>): boolean {
    if (this._singletons.has(identifier) && this._singletons.get(identifier) === agent) {
      this._singletons.delete(identifier);
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
    this.disposing = true;
    for (const promise of this._futureSingletons.values()) {
      promise.then(agent => {
        if (typeof agent === 'object' && agent != null && typeof agent.dispose === 'function') {
          // only dispose the agent of current domain
          agent.dispose();
        }
      });
    }
    for (const agent of this._singletons.values()) {
      if (typeof agent === 'object' && agent != null && typeof agent.dispose === 'function') {
        //  only dispose the agent of current domain
        agent.dispose();
      }
    }
    this._futureSingletons.clear();
    this._singletons.clear();
    // this._agents.clear();
    this._types.clear();
    this.disposed = true;
  }
}
