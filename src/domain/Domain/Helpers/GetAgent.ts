import { Agents } from '../DomainKnowledge';

export function GetAgent<T extends Function>(type: T): T | undefined {
  return Agents.v1.get(type) as T | undefined;
}
