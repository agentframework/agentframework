import { Agent, AgentAttribute } from './agent';
import { EventEmitter } from 'events';
import { Reflection } from './core/reflection';

export const DOMAIN = Symbol('agent.framework.domain');

/**
 * Domain interface
 */
export interface IDomain<T> {
  addAgent(identifier: string, agent: any): void;
  getAgent(agentType: string): any;
  inform(message: any): void;
  request<T>(goals: any): Promise<T>;
}

/**
 * Domain
 */
export class Domain<T> extends EventEmitter implements IDomain<T> {

  private _types: Map<string, Agent> = new Map<string, Agent>();
  private _agents: Map<string, Object> = new Map<string, Object>();

  public createAgent(agentType: Agent, ...parameters: Array<any>): any {
    const instance = Reflect.construct(agentType, [this, ...parameters]);

    Reflection.getAttributes(agentType)
      .filter(a => a instanceof AgentAttribute)
      .map(a => (a as AgentAttribute).identifier)
      .filter(a => a != null)
      .forEach(identifier => {
        if (this._agents.has(identifier)) {
          throw new TypeError(`Duplicated agent identifier ${identifier} is not allowed`);
        }
        else {
          console.log(`Agent type ${agentType.name} registered as ${identifier}`);
          this._agents.set(identifier, instance);
        }
      });

    return instance;
  }

  public registerAgent(agentType: Agent) {
    Reflection.getAttributes(agentType)
      .filter(a => a instanceof AgentAttribute)
      .map(a => (a as AgentAttribute).identifier)
      .filter(a => a != null)
      .forEach(identifier => {
        if (this._types.has(identifier)) {
          throw new TypeError(`Duplicated agent identifier ${identifier} is not allowed`);
        }
        else {
          console.log(`Agent type ${agentType.name} registered as ${identifier}`);
          this._types.set(identifier, agentType);
        }
      });
  }

  public addAgent(identifier: string, agent: any): void {
    this._agents.set(identifier, agent);
  }

  public hasAgent(identifier: string): boolean {
    return this._agents.has(identifier);
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

}

export let LocalDomain = new Domain();
