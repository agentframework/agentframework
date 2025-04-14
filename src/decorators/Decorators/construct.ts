import { Arguments, CreateAgent } from '@agentframework/agent';

export function construct(type: Function, params: Arguments): any {
  return Reflect.construct(CreateAgent(type), params);
}
