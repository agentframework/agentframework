import { DomainKnowledge } from '../DomainKnowledge';

export function GetAgent<T extends Function>(type: T): T | undefined {
  return DomainKnowledge.agents.get(type) as T | undefined;
}
