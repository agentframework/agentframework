import { AgentReference } from './Agent';
import { Domain } from './Domain';

export class InMemory {
  private readonly types = new Map<Function, any>(); // type-type mapping
  private readonly agentTypes = new Map<Function, any>(); // type-AgentType mapping
  private readonly agents = new Map<AgentReference, any>(); // type-instance mapping
  private readonly incomingAgents = new Map<AgentReference, Promise<any>>(); // type-instance mapping (Promise)
  private static readonly domains = new WeakMap<object, InMemory>();
  
  private static domain(domain: Domain): InMemory {
    let value = this.domains.get(domain);
    if (!value) {
      value = new InMemory();
      this.domains.set(domain, value);
    }
    return value;
  }

  // type-agent mapping
  static types(domain: Domain): Map<Function, any> {
    return this.domain(domain).types;
  }

  // type-instance mapping
  static agents(domain: Domain): Map<AgentReference, any> {
    return this.domain(domain).agents;
  }

  static agentTypes(domain: Domain): Map<Function, any> {
    return this.domain(domain).agentTypes;
  }

  static incomingAgents(domain: Domain): Map<AgentReference, Promise<any>> {
    return this.domain(domain).incomingAgents;
  }
}
