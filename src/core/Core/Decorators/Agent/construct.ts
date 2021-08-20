import { CreateAgentClass } from '../../Agent/CreateAgentClass';
import { Arguments } from '../../Interfaces/Arguments';
import { Agents } from '../../Knowledge';

export function construct(type: Function, params: Arguments): any {
  const AgentClass = CreateAgentClass(type);
  const agent = Reflect.construct(AgentClass, params);
  Agents.v1.set(type, agent);
  Agents.v1.set(AgentClass, agent);
  return agent;
}
