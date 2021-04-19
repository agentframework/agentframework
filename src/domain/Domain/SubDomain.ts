import { DomainLike } from './DomainLike';

export interface SubDomain extends DomainLike {
  readonly parent: DomainLike;
}
