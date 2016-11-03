import { Agent } from './agent';

/**
 * Domain interface
 */
export interface IDomain<T> {
  inform(message: any): void;
  request<T>(goals: any): Promise<T>;
}

/**
 * Domain
 */
export class Domain<T> implements IDomain<T> {


  public add(agent: Agent): void {

  }

  public inform(message: any): void {

  }

  public request<T>(goals: any): Promise<T> {
    return null;
  }

}
