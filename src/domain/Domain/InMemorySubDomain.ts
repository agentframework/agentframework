import { InMemoryDomain } from './InMemoryDomain';
import { GetDomain } from './Helpers/GetDomain';
import { AnyClass, Agent, AgentReference } from './Class';
import { getter } from './Helpers/Prototype';
import { SubDomainLike } from './SubDomainLike';
import { DomainLike } from './DomainLike';
import { GetSystemDomain } from './Helpers/GetSystemDomain';

export class InMemorySubDomain extends InMemoryDomain implements SubDomainLike {
  get parent(): DomainLike {
    // GetDomain(this) will return this. So must use GetDomain(this.constructor)
    return getter(this, 'parent', GetDomain(this.constructor) || GetSystemDomain());
  }

  getOwnType<T extends AnyClass>(type: T): T | undefined {
    return super.getType<T>(type);
  }

  getType<T extends AnyClass>(type: T): T | undefined {
    return super.getType<T>(type) || this.parent.getType<T>(type);
  }

  getOwnAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined {
    return super.getAgent<T>(identifier);
  }

  getAgent<T extends AgentReference>(identifier: T): Agent<T> | undefined {
    return super.getAgent<T>(identifier) || this.parent.getAgent<T>(identifier);
  }
}
