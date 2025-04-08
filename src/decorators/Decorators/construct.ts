import { CreateAgent } from '../../../packages/agent/Agent/CreateAgent';
import { Arguments } from '../../../packages/agent/Agent/Arguments';

export function construct(type: Function, params: Arguments): any {
  return Reflect.construct(CreateAgent(type), params);
}
