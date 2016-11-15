import { Agent, AgentAttribute } from './agent';
import { EventEmitter } from 'events';
import { Reflection } from './core/reflection';

/**
 * Domain interface
 */
export interface IDomain<T> {
  /**
   * Add an agent to domain
   * @param agentType
   */
  addAgent(agentType: Agent): void;

  /**
   * Create an agent and added to domain
   * @param agentType
   * @param parameters
   */
  createAgent(agentType: Agent, ...parameters: Array<any>): Object;

  /**
   * Get the agent from domain or create previous added agent. Throw error if identifier not found.
   * @param typeOrIdentifier
   */
  getAgent(typeOrIdentifier: Agent | string): Object;

}

/**
 * Domain
 */
export class Domain<T> extends EventEmitter implements IDomain<T> {

  protected types: Map<string, Agent> = new Map<string, Agent>();
  protected agents: Map<string, Object> = new Map<string, Object>();

  registerAgentType(agentAttribute: AgentAttribute, agentType: Agent) {
    if (!agentAttribute.identifier) {
      return;
    }
    else if (this.types.has(agentAttribute.identifier)) {
      throw new TypeError(`Duplicated agent type identifier ${agentAttribute.identifier} is not allowed`);
    }
    else {
      // console.log(`Agent type ${agentType.name} registered as ${agentAttribute.identifier}`);
      this.types.set(agentAttribute.identifier, agentType);
    }
  }

  registerAgent(agentAttribute: AgentAttribute, agent: Object) {
    if (!agentAttribute.identifier) {
      return;
    }
    else if (this.agents.has(agentAttribute.identifier)) {
      throw new TypeError(`Duplicated agent identifier ${agentAttribute.identifier} is not allowed`);
    }
    else {
      // console.log(`Agent ${agentType.name} registered as ${identifier}`);
      this.agents.set(agentAttribute.identifier, agent);
    }
  }

  public addAgent(agentType: Agent): void {
    const attributes = this.extractAgentAttributes(agentType);
    attributes.forEach(attribute => {
      if (this.agents.has(attribute.identifier)) {
        throw new TypeError(`Can not add agent type. Duplicated agent type identifier ${attribute.identifier} is not allowed`);
      }
    });
    attributes.forEach(attribute => {
      this.registerAgentType(attribute, agentType);
    });
  }

  public createAgent(agentType: Agent, ...parameters: Array<any>): any {
    const identifiers = this.extractIdentifiers(agentType);
    identifiers.forEach(identifier => {
      if (this.agents.has(identifier)) {
        throw new TypeError(`Can not create agent. Duplicated agent identifier ${identifier} is not allowed`);
      }
    });
    return Reflect.construct(agentType, [this, ...parameters]);
  }

  public getAgent(typeOrIdentifier: Agent | string): Object {
    if (typeof typeOrIdentifier === 'string') {
      if (this.agents.has(typeOrIdentifier)) {
        return this.agents.get(typeOrIdentifier);
      }
      else if (this.types.has(typeOrIdentifier)) {
        const agentType = this.types.get(typeOrIdentifier);
        return this.createAgent(agentType);
      }
      else {
        throw new TypeError(`Agent ${typeOrIdentifier} not found`);
      }
    }
    else {
      return this.createAgent(typeOrIdentifier);
    }
  }

  private extractAgentAttributes(agentType: Agent): Array<AgentAttribute> {
    return Reflection.getAttributes(agentType)
      .filter(a => a instanceof AgentAttribute) as Array<AgentAttribute>;
  }

  private extractIdentifiers(agentType: Agent) {
    return this.extractAgentAttributes(agentType)
      .map(a => (a as AgentAttribute).identifier)
      .filter(a => a != null);
  }

}

export let LocalDomain = new Domain();
