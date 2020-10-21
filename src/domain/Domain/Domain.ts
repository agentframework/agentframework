import { DomainReference } from './DomainReference';
import { Agent, AgentIdentifier, AgentParameters, AnyClass, Class } from './ClassConstructor';
import { DomainKnowledge } from './DomainKnowledge';

/**
 * Domain is a container of types and agents
 */
export abstract class Domain implements DomainReference {
  /**
   * Construct a new instance
   */
  static construct<T extends Function>(target: T, params: AgentParameters<T>): Agent<T> {
    return Reflect.construct(target, params);
  }

  protected constructor() {
    DomainKnowledge.RememberDomain(this, this);
  }

  /**
   * Domain name
   */
  get name(): string {
    return this.constructor.name;
  }

  /**
   * Check if have agent
   */
  abstract hasAgent<T extends AgentIdentifier>(type: T): boolean;

  /**
   * Get agent of giving type, return undefined if don't have
   */
  abstract getAgent<T extends AgentIdentifier>(type: T): Agent<T> | undefined;

  /**
   * Get agent of giving type, throw an error if don't have
   */
  abstract getAgentOrThrow<T extends AgentIdentifier>(type: T): Agent<T>;

  /**
   * Check if have type registered
   */
  abstract hasType<T extends AnyClass>(type: T): boolean;

  /**
   * Get constructor for current type, return undefined if don't have
   */
  abstract getType<T extends AnyClass, P extends T>(type: T): P | undefined;

  /**
   * Get constructor for current type, throw an error if don't have
   */
  abstract getTypeOrThrow<T extends AnyClass, P extends T>(type: T): P;

  //region Factory
  /**
   * Inject an agent
   */
  abstract construct<T extends AgentIdentifier>(target: T, params?: AgentParameters<T>, transit?: boolean): Agent<T>;

  /**
   * Resolve and inject an agent using factory method
   */
  abstract resolve<T extends AgentIdentifier>(
    target: T,
    params?: AgentParameters<T>,
    transit?: boolean
  ): Promise<Agent<T>>;
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
  abstract removeType<T extends object>(type: Class<T>): void;

  // /**
  //  * Get all registered types in this domain
  //  */
  // abstract getTypes(): Array<Class>;

  /**
   * Add an agent
   */
  abstract addAgent<T extends AgentIdentifier>(type: T, agent: Agent<T>, explicit?: boolean): void;

  /**
   * Set agent instance
   */
  abstract setAgent<T extends AgentIdentifier>(type: T, agent: Agent<T>): void;

  // /**
  //  * Replace agent, throw error if origin agent not match
  //  */
  // abstract replaceAgent<T extends AgentIdentifier>(type: T, origin: Agent<T>, replace: Agent<T>): void;

  /**
   * Delete agent. do nothing if agent not match
   */
  abstract removeAgent<T extends AgentIdentifier>(type: T, agent: Agent<T>): boolean;

  // /**
  //  * Get all registered agents in this domain
  //  */
  // abstract getAgents(): Iterable<any>;
}
