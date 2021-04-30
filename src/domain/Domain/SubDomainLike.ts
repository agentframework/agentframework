import { DomainLike } from './DomainLike';
import { Agent, AgentReference, AnyClass } from './Class';

export interface SubDomainLike extends DomainLike {
  /**
   * domain
   */
  readonly parent: DomainLike;

  /**
   * get own type
   */
  getOwnType<T extends AnyClass>(type: T): T | undefined;

  /**
   * get own agent
   */
  getOwnAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined;
}
