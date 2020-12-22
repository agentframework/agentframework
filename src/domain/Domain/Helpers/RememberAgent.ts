import { DomainKnowledge } from '../DomainKnowledge';

export function RememberAgent<T extends Function>(type: T, agent: T): void {
  DomainKnowledge.agents.set(type, agent);
}
