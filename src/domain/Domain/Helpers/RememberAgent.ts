import { Agents } from '../DomainKnowledge';

export function RememberAgent<T extends Function>(type: T, agent: T): void {
  Agents.v1.set(type, agent);
}
