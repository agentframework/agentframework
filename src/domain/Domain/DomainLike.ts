import { AgentReference, Agent, AnyClass, Params, Class } from './ClassConstructor';

/**
 * A remote domain reference
 */
export interface DomainLike {
  /**
   * Name of the domain
   */
  name: string;

  // /**
  //  * Check if have agent
  //  */
  // hasAgent<T extends AgentIdentifier>(type: T): boolean;

  /**
   * Get instance of giving type, return undefined if don't have
   */
  getAgent<T extends AgentReference>(type: T): Agent<T> | undefined;

  // /**
  //  * Get agent of giving type, throw an error if don't have
  //  */
  // getInstanceOrThrow<T extends AgentIdentifier>(type: T): Agent<T>;

  // /**
  //  * Get agent type
  //  */
  // getAgent<T extends AnyClass>(type: T): T | undefined;

  // /**
  //  * Check if have type registered
  //  */
  // hasType<T extends AnyClass>(type: T): boolean;

  /**
   * Get constructor for current type, return undefined if don't have
   */
  getType<T extends AnyClass>(type: T): T | undefined;

  // /**
  //  * Get constructor for current type, throw an error if don't have
  //  */
  // getTypeOrThrow<T extends AnyClass, P extends T>(type: T): P;

  /**
   * Inject an agent
   */
  construct<T extends AnyClass>(target: T, params?: Params<T>, transit?: boolean): Agent<T>;

  /**
   * Resolve and inject an agent using factory method
   */
  resolve<T extends AnyClass>(target: T, params?: Params<T>, transit?: boolean): Promise<Agent<T>>;

  /**
   * Register a new type, without rewrite any existing types
   */
  addType<T extends object>(type: Class<T>): void;

  /**
   * Replace type
   */
  setType<T extends object>(type: AnyClass<T>, replacement: Class<T>): void;

  /**
   * Delete type mapping for giving type
   */
  removeType<T extends object>(type: AnyClass<T>): void;

  /**
   * Add an agent
   */
  addAgent<T extends AgentReference>(type: T, agent: Agent<T>): void;

  /**
   * Set agent instance
   */
  setAgent<T extends AgentReference>(type: T, agent: Agent<T>): void;

  /**
   * Delete agent. do nothing if agent not match
   */
  removeAgent<T extends AgentReference>(type: T, agent: Agent<T>): boolean;
}
