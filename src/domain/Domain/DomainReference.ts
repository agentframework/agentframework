import { AgentIdentifier, Agent, AnyClass } from './ClassConstructor';

/**
 * A remote domain reference
 */
export interface DomainReference {
  /**
   * Check if have agent
   */
  hasInstance<T extends AgentIdentifier>(type: T): boolean;

  /**
   * Get instance of giving type, return undefined if don't have
   */
  getInstance<T extends AgentIdentifier>(type: T): Agent<T> | undefined;

  // /**
  //  * Get agent of giving type, throw an error if don't have
  //  */
  // getInstanceOrThrow<T extends AgentIdentifier>(type: T): Agent<T>;

  /**
   * Get agent type
   */
  getAgent<T extends AnyClass>(type: T): T | undefined;

  /**
   * Check if have type registered
   */
  hasType<T extends AnyClass>(type: T): boolean;

  /**
   * Get constructor for current type, return undefined if don't have
   */
  getType<T extends AnyClass>(type: T): T | undefined;

  // /**
  //  * Get constructor for current type, throw an error if don't have
  //  */
  // getTypeOrThrow<T extends AnyClass, P extends T>(type: T): P;
}
