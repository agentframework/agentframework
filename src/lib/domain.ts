import { Agent, AgentAttribute } from './agent';
import { EventEmitter } from 'events';
import { Reflection } from './core/reflection';

/**
 * Domain interface
 */
export interface IDomain<T> {
  getAgent(agentType: string): Object | null;
}

/**
 * Domain
 */
export class Domain<T> extends EventEmitter implements IDomain<T> {

  private _types: Map<string, Agent> = new Map<string, Agent>();
  private _agents: Map<string, Object> = new Map<string, Object>();

  public registerAgentType(agentAttribute: AgentAttribute, agentType: Agent) {
    if (!agentAttribute.identifier) {
      return;
    }
    else if (this._types.has(agentAttribute.identifier)) {
      throw new TypeError(`Duplicated agent type identifier ${agentAttribute.identifier} is not allowed`);
    }
    else {
      // console.log(`Agent type ${agentType.name} registered as ${agentAttribute.identifier}`);
      this._types.set(agentAttribute.identifier, agentType);
    }
  }

  public registerAgent(agentAttribute: AgentAttribute, agent: Object) {
    if (!agentAttribute.identifier) {
      return;
    }
    else if (this._agents.has(agentAttribute.identifier)) {
      throw new TypeError(`Duplicated agent identifier ${agentAttribute.identifier} is not allowed`);
    }
    else {
      // console.log(`Agent ${agentType.name} registered as ${identifier}`);
      this._agents.set(agentAttribute.identifier, agent);
    }
  }

  public createAgent(agentType: Agent, ...parameters: Array<any>): any {
    const identifiers = this.extractIdentifiers(agentType);
    identifiers.forEach(identifier => {
      if (this._agents.has(identifier)) {
        throw new TypeError(`Can not create agent. Duplicated agent identifier ${identifier} is not allowed`);
      }
    });
    return Reflect.construct(agentType, [this, ...parameters]);
  }

  public getAgent(typeOrIdentifier: Agent | string): Object {
    if (typeof typeOrIdentifier === 'string') {
      if (this._agents.has(typeOrIdentifier)) {
        return this._agents.get(typeOrIdentifier);
      }
      else if (this._types.has(typeOrIdentifier)) {
        const agentType = this._types.get(typeOrIdentifier);
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

  private extractIdentifiers(agentType: Agent) {
    return Reflection.getAttributes(agentType)
      .filter(a => a instanceof AgentAttribute)
      .map(a => (a as AgentAttribute).identifier)
      .filter(a => a != null);
  }

}

export let LocalDomain = new Domain();
