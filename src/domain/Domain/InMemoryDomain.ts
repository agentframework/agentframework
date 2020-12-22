import { AgentFrameworkError, CreateAgent } from '../../dependencies/core';
import { Disposable } from './Helpers/Disposable';
import { Agent, AgentIdentifier, AgentParameters, AnyClass, Class } from './ClassConstructor';
import { Domain } from './Domain';
import { IsPromise } from './Helpers/IsPromise';
import { IsObservable } from './Helpers/IsObservable';
import { GetDomain } from './Helpers/GetDomain';
import { DomainAgentAttribute } from './Attributes/DomainAgentAttribute';
import { RememberDomain } from './Helpers/RememberDomain';

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
  private readonly _agents = new Map<any, any>(); // type-agent mapping
  private readonly _instances = new Map<any, any>(); // type-instance mapping
  private readonly _futureInstances = new Map<any, Promise<any>>();

  /**
   * Check if have agent
   */
  hasInstance<T extends AgentIdentifier>(type: T): boolean {
    return this._instances.has(type);
  }

  /**
   * Get agent of giving type, return undefined if don't have
   */
  getInstance<T extends AgentIdentifier>(type: T): Agent<T> | undefined {
    return this._instances.has(type) ? this._instances.get(type) : undefined;
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

  /**
   * Get agent
   */
  getAgent<T extends AnyClass>(type: T): T | undefined {
    return <T | undefined>this._agents.get(type);
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
  getType<T extends AnyClass>(type: T): T | undefined {
    return this._types.has(type) ? <T>this._types.get(type) : undefined;
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

  //region Factory
  /**
   * Create agent
   */
  createAgent<T extends AgentIdentifier>(type: T): T {
    // check owner domain
    const owner = GetDomain(type);
    if (owner && this !== owner) {
      throw new AgentFrameworkError('NotSupportCreateAgentForOtherDomain');
    }

    // 1. get original type if giving type is an agent type
    // const origin = Knowledge.GetType(type);
    // if (origin) {
    //   // target is an agent already
    //   // set the target to origin type to recreate this
    //   // so create another proxy from this origin class
    //   console.log('exists domain type', type);
    //   type = origin;
    // }

    // if (typeof domain.constructor.name === 'function') {
    //   debugger;
    //   console.log('<< CREATE >>', domain.constructor.name, '====>', type.name);
    // }

    // upgrade to Agent only if interceptor or initializer found
    const newCreatedAgent = CreateAgent(type, new DomainAgentAttribute(this));
    // console.log('found', domain, type, newType)
    // const name = Reflector(type).name;
    // const factory = Function(name, [`return`, `class`, `${name}$`, `extends`, name, '{}'].join(' '));
    // const newType = factory(type);
    // Knowledge.RememberType(domainAgent, type);
    // DomainKnowledge.RememberDomainAgent(domain, type, domainAgent);
    RememberDomain(newCreatedAgent, this);
    this._agents.set(type, newCreatedAgent);
    this._agents.set(newCreatedAgent, newCreatedAgent);
    return <any>newCreatedAgent;
  }

  /**
   * Create and initial an agent
   */
  construct<T extends AgentIdentifier>(target: T, params?: AgentParameters<T>, transit?: boolean): Agent<T> {
    if (!transit) {
      const exists = this.getInstance(target);
      if (exists !== undefined) {
        return exists;
      }
    }

    // find extended type
    const type = this.getType<T>(target) || target;

    // find agent
    const agent = this.getAgent(type) || this.createAgent(type);

    // console.log('construct', target.name, 'from', type.name);
    // initialize agent class
    const instance = Reflect.construct(agent, params || []);

    // console.log('AGENT ====>', agent.constructor.name);

    // note: to prevent human mistake
    // do not allow construct promise or observable using constructor
    if (IsPromise(instance)) {
      // drop agent
      throw new AgentFrameworkError('NotAllowConstructPromiseObject');
    }

    if (IsObservable(instance)) {
      throw new AgentFrameworkError('NotAllowConstructObservableObject');
    }

    // no need register instance with domain
    // DomainCore.SetDomain(agent, this);

    if (!transit) {
      // register agent to domain only if not transit
      this.addInstance(type, instance);
    }

    // InitializeDomainAgent(type, agent);

    return instance;
  }

  /**
   * Create and initial an agent asynchronously
   */
  resolve<T extends AgentIdentifier>(target: T, params?: AgentParameters<T>, transit?: boolean): Promise<Agent<T>> {
    try {
      if (!transit) {
        const exists = this.getInstance(target);
        if (exists !== undefined) {
          return Promise.resolve(exists);
        }
        const pending = this._futureInstances.get(target);
        if (pending) {
          return <Promise<Agent<T>>>pending;
        }
      }

      // find extended type
      const type = this.getType<T>(target) || target;

      // find agent
      const agent = this.getAgent(type) || this.createAgent(type);

      // initialize agent class
      const newCreated: Promise<Agent<T>> = Reflect.construct(agent, params || []);

      if (IsPromise(newCreated)) {
        if (!transit) {
          this._futureInstances.set(type, newCreated);
        }
        return newCreated.then(
          instance => {
            // no need register instance with domain
            // DomainCore.SetDomain(newCreatedAgent, this);
            if (!transit) {
              this.addInstance(type, instance);
              this._futureInstances.delete(type);
            }
            // InitializeDomainAgent(type, newCreatedAgent);
            return instance;
          },
          err => {
            if (!transit) {
              this._futureInstances.delete(type);
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
        if (!transit) this.addInstance(type, newCreated);
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
  addInstance<T extends AgentIdentifier>(type: T, agent: Agent<T>, explicit?: boolean): void {
    if (!this._instances.has(type)) {
      this._instances.set(type, agent);
    }

    if (explicit) return;

    let base: object = type.prototype;
    while (base && base.constructor !== Object) {
      const ctor = base.constructor;
      if (!this._instances.has(ctor)) {
        this._instances.set(ctor, agent);
      }
      base = Reflect.getPrototypeOf(base);
    }
  }

  /**
   * Set agent instance
   */
  setInstance<T extends AgentIdentifier>(type: T, agent: Agent<T>): void {
    this._instances.set(type, agent);
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
  removeInstance<T extends AgentIdentifier>(type: T, agent: Agent<T>): boolean {
    if (this._instances.has(type) && this._instances.get(type) === agent) {
      this._instances.delete(type);
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
    for (const instance of this._instances.values()) {
      if (typeof instance === 'object' && instance != null && typeof instance.dispose === 'function') {
        //  only dispose the agent of current domain
        instance.dispose();
      }
    }
    for (const promise of this._futureInstances.values()) {
      promise.then(instance => {
        if (typeof instance === 'object' && instance != null && typeof instance.dispose === 'function') {
          // only dispose the agent of current domain
          instance.dispose();
        }
      });
    }
    this._futureInstances.clear();
    this._instances.clear();
    this._agents.clear();
    this._types.clear();
    this.disposed = true;
  }
}
