import { DomainLike } from './DomainLike';
import { Agent, AgentReference, AnyClass, Class, Params } from './Class';
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
  protected constructor() {
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
  abstract getType<T extends AnyClass>(type: T): T | undefined;

  //region Factory
  /**
   * Inject an agent
   */
  abstract construct<T extends AnyClass>(target: T, params?: Params<T>, transit?: boolean): Agent<T>;

  /**
   * Resolve and inject an agent using factory method
   */
  abstract resolve<T extends AnyClass>(target: T, params?: Params<T>, transit?: boolean): Promise<Agent<T>>;

  //endregion

  /**
   * Register a new type, without rewrite any existing types
   */
  abstract addType<T extends object>(type: Class<T>): void;

  /**
   * Replace type
   */
  abstract setType<T extends object>(type: AnyClass<T>, replacement: Class<T>): void;

  /**
   * Delete type mapping for giving type
   */
  abstract removeType<T extends object>(type: AnyClass<T>): void;

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
