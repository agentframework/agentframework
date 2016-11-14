import { Agent, AgentAttribute } from './agent';
import { EventEmitter } from 'events';
import { Reflection } from './core/reflection';

export const DOMAIN = Symbol('agent.framework.domain');

/**
 * Domain interface
 */
export interface IDomain<T> {
  getAgent(agentType: string): any;
  inform(message: any): void;
  request<T>(goals: any): Promise<T>;
}

/**
 * Domain
 */
export class Domain<T> extends EventEmitter implements IDomain<T> {
  
  private _identifiers: Set<string> = new Set<string>();
  private _types: Map<string, Agent> = new Map<string, Agent>();
  private _agents: Map<string, Object> = new Map<string, Object>();
  
  public registerAgent(agentType: Agent) {
    this.extractIdentifiers(agentType)
      .forEach(identifier => {
        if (this._types.has(identifier)) {
          throw new TypeError(`Duplicated agent identifier ${identifier} is not allowed`);
        }
        else {
          // console.log(`Agent type ${agentType.name} registered as ${identifier}`);
          this._types.set(identifier, agentType);
        }
      });
  }
  
  public createAgent(agentType: Agent, ...parameters: Array<any>): any {
    
    const identifiers = this.extractIdentifiers(agentType);
    identifiers.forEach(identifier => {
      if (this._identifiers.has(identifier)) {
        throw new TypeError(`Duplicated agent identifier ${identifier} is not allowed`);
      }
      else {
        // console.log(`Agent type ${agentType.name} registered as ${identifier}`);
        this._identifiers.add(identifier);
      }
    });
    
    return Reflect.construct(agentType, [this, ...parameters]);
  }
  
  public hasAgent(identifier: string): boolean {
    return this._agents.has(identifier) || this._identifiers.has(identifier);
  }
  
  public addAgent(identifier: string, instance: any) {
    if (this._agents.has(identifier)) {
      throw new TypeError(`Duplicated agent identifier ${identifier} is not allowed`);
    }
    this._agents.set(identifier, instance);
  }
  
  public getAgent(identifier: string): any {
    if (this._agents.has(identifier)) {
      return this._agents.get(identifier);
    }
    else if (this._types.has(identifier)) {
      const agentType = this._types.get(identifier);
      return this.createAgent(agentType);
    }
    else {
      return null;
    }
  }
  
  public inform(message: any): void {
    
  }
  
  public request<T>(goals: any): Promise<T> {
    return null;
  }
  
  private extractIdentifiers(agentType: Agent) {
    return Reflection.getAttributes(agentType)
      .filter(a => a instanceof AgentAttribute)
      .map(a => (a as AgentAttribute).identifier)
      .filter(a => a != null);
  }
  
}

export let LocalDomain = new Domain();

