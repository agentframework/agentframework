import { InMemoryDomain } from './InMemoryDomain';
import { Domain } from './Domain';
import { FindDomain } from './Helpers/FindDomain';
import { AnyClass, Agent, AgentIdentifier } from './ClassConstructor';
import { getter } from './Helpers/Prototype';

export class InMemorySubDomain extends InMemoryDomain {
  protected get parent(): Domain | undefined {
    return getter(this, 'parent', FindDomain(this.constructor));
  }

  getType<T extends AnyClass>(type: T): T | undefined {
    return super.getType<T>(type) || (this.parent && this.parent.getType<T>(type));
  }

  getInstance<T extends AgentIdentifier>(type: T): Agent<T> | undefined {
    return super.getInstance<T>(type) || (this.parent && this.parent.getInstance<T>(type));
  }
}
