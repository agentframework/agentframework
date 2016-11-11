import { Agent } from './agent';
import { EventEmitter } from 'events';

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

  private _agents: Map<string, Object> = new Map<string, Object>();

  public hasAgent(identifier: string): boolean {
    return this._agents.has(identifier);
  }

  public createAgent(agentType: Agent, ...parameters: Array<any>): any {
    const instance = Reflect.construct(agentType, [this, ...parameters]);

  }

  public addAgent(identifier: string, agent: any): void {
    this._agents.set(identifier, agent);
  }

  public getAgent(identifier: string): any {
    return this._agents.get(identifier);
  }

  public inform(message: any): void {

  }

  public request<T>(goals: any): Promise<T> {
    return null;
  }

}
