import { AgentReference } from './Agent';
import { DomainLike } from './DomainLike';

export class InMemory {
  private readonly agents = new Map<AgentReference, any>(); // type-instance mapping
  private readonly incomingAgents = new Map<AgentReference, Promise<any>>(); // type-instance mapping (Promise)

  private static readonly domains = new WeakMap<object, InMemory>();

  private static domain(domain: DomainLike): InMemory {
    let value = this.domains.get(domain);
    if (!value) {
      value = new InMemory();
      this.domains.set(domain, value);
    }
    return value;
  }

  // type-instance mapping
  static agents(domain: DomainLike): Map<AgentReference, any> {
    return this.domain(domain).agents;
  }

  // type-promise<instance> mapping
  static incomingAgents(domain: DomainLike): Map<AgentReference, Promise<any>> {
    return this.domain(domain).incomingAgents;
  }
}
