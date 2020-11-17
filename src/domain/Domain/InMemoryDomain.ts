import { Disposable } from './Helpers/Disposable';
import { Agent, AgentIdentifier, AgentParameters, AnyClass, Class } from './ClassConstructor';
import { ConstructDomainAgent } from './Factory/ConstructDomainAgent';
import { TypeNotFoundError } from './Errors/TypeNotFoundError';
import { AgentNotFoundError } from './Errors/AgentNotFoundError';
// import { InitializeDomainAgent } from './Factory/InitializeDomainAgent';
import { Domain } from './Domain';
import { IsPromise } from './Helpers/IsPromise';
import { IsObservable } from './Helpers/IsObservable';
import { AgentFrameworkError } from '../../dependencies/core';

/**
 * In memory domain
 */
export class InMemoryDomain extends Domain implements Disposable {
  /**
   * Default constructor for this domain
   */
  constructor() {
    super();
  }

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
  private readonly _types = new Map<AnyClass, Class>(); // type-type mapping
  private readonly _agents = new Map<any, any>(); // type-instance mapping
  private readonly _pendingAgents = new Map<any, Promise<any>>();

  /**
   * Check if have agent
   */
  hasAgent<T extends AgentIdentifier>(type: T): boolean {
    return this._agents.has(type);
  }

  /**
   * Get agent of giving type, return undefined if don't have
   */
  getAgent<T extends AgentIdentifier>(type: T): Agent<T> | undefined {
    return this._agents.has(type) ? this._agents.get(type) : undefined;
  }

  /**
   * Get agent of giving type, throw an error if don't have
   */
  getAgentOrThrow<T extends AgentIdentifier>(type: T): Agent<T> {
    const agent = this.getAgent(type);
    if (!agent) {
      throw new AgentNotFoundError(type);
    }
    return agent;
  }

  /**
   * Check if have type registered
   */
  hasType<T extends AnyClass>(type: T): boolean {
    return this._types.has(type);
  }

  /**
   * Get constructor for current type, return undefined if don't have
   */
  getType<T extends AnyClass, P extends T>(type: T): P | undefined {
    return this._types.has(type) ? <P>this._types.get(type) : undefined;
  }

  /**
   * Get constructor for current type, throw an error if don't have
   */
  getTypeOrThrow<T extends AnyClass, P extends T>(type: T): P {
    const resolvedType = this.getType(type);
    if (!resolvedType) {
      throw new TypeNotFoundError(type);
    }
    return <P>resolvedType;
  }

  //region Factory
  /**
   * Inject an agent
   */
  construct<T extends AgentIdentifier>(target: T, params?: AgentParameters<T>, transit?: boolean): Agent<T> {
    if (!transit) {
      const exists = this.getAgent(target);
      if (exists !== undefined) {
        return exists;
      }
    }

    // find extended type
    const type: AnyClass<T> = this.getType<T, any>(target) || target;

    // console.log('construct', target.name, 'from', type.name);
    const agent = ConstructDomainAgent<T>(this, type, params || []);

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
    // DomainCore.SetDomain(agent, this);

    if (!transit) {
      // register agent to domain only if not transit
      this.addAgent(type, agent);
    }

    // InitializeDomainAgent(type, agent);

    return agent;
  }

  /**
   * Resolve and inject an agent using factory method
   */
  resolve<T extends AgentIdentifier>(target: T, params?: AgentParameters<T>, transit?: boolean): Promise<Agent<T>> {
    try {
      if (!transit) {
        const exists = this.getAgent(target);
        if (exists !== undefined) {
          return Promise.resolve(exists);
        }
        const pending = this._pendingAgents.get(target);
        if (IsPromise<Agent<T>>(pending)) {
          return <Promise<Agent<T>>>pending;
        }
      }

      // find extended type
      const type: AnyClass<T> = this.getType<T, any>(target) || target;

      const newCreated = ConstructDomainAgent(this, type, params || []);

      if (IsPromise(newCreated)) {
        if (!transit) {
          this._pendingAgents.set(type, newCreated);
        }
        return newCreated.then(
          (newCreatedAgent) => {
            // no need register instance with domain
            // DomainCore.SetDomain(newCreatedAgent, this);
            if (!transit) {
              this.addAgent(type, newCreatedAgent);
              this._pendingAgents.delete(type);
            }
            // InitializeDomainAgent(type, newCreatedAgent);
            return newCreatedAgent;
          },
          (err) => {
            if (!transit) {
              this._pendingAgents.delete(type);
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

  //region Manage Types in this Domain
  /**
   * Register type
   */
  addType<T extends object>(type: Class<T>): void {
    let base: object = type.prototype;
    // this._types.add(<ClassConstructor<T>>type);
    while (base && base.constructor !== Object) {
      const ctor = base.constructor;
      if (!this._types.has(ctor)) {
        this._types.set(ctor, type);
      }
      base = Reflect.getPrototypeOf(base);
    }
  }

  /**
   * Replace type
   */
  setType<T extends object>(type: AnyClass<T>, replacement: Class<T>): void {
    // this._types.add(replacement);
    this._types.set(type, replacement);
  }

  /**
   * Delete type mapping for giving type
   */
  removeType<T extends object>(type: Class<T>): void {
    this._types.delete(type);
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
   * Add an agent
   */
  addAgent<T extends AgentIdentifier>(type: T, agent: Agent<T>, explicit?: boolean): void {
    if (!this._agents.has(type)) {
      this._agents.set(type, agent);
    }

    if (explicit) return;

    let base: object = type.prototype;
    while (base && base.constructor !== Object) {
      const ctor = base.constructor;
      if (!this._agents.has(ctor)) {
        this._agents.set(ctor, agent);
      }
      base = Reflect.getPrototypeOf(base);
    }
  }

  /**
   * Set agent instance
   */
  setAgent<T extends AgentIdentifier>(type: T, agent: Agent<T>): void {
    this._agents.set(type, agent);
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
   * Delete agent. do nothing if agent not match
   */
  removeAgent<T extends AgentIdentifier>(type: T, agent: Agent<T>): boolean {
    if (this._agents.has(type) && this._agents.get(type) === agent) {
      this._agents.delete(type);
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
    const disposables = new Set<any>();
    for (const agent of this._agents.values()) {
      disposables.add(agent);
    }
    for (const agent of disposables.keys()) {
      if (typeof agent === 'object' && agent != null && typeof agent.dispose === 'function') {
        //  only dispose the agent of current domain
        agent.dispose();
      }
    }
    for (const promise of this._pendingAgents.values()) {
      promise.then((agent) => {
        if (typeof agent === 'object' && agent != null && typeof agent.dispose === 'function') {
          // only dispose the agent of current domain
          agent.dispose();
        }
      });
    }
    disposables.clear();
    this._pendingAgents.clear();
    this._agents.clear();
    this._types.clear();
    this.disposed = true;
  }
}
