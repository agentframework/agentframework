import { CreateAgent } from '../../agent/Agent/CreateAgent.ts';
import { Arguments } from '../../core/Core/Interception/Arguments.ts';

export function construct(type: Function, params: Arguments): any {
  return Reflect.construct(CreateAgent(type), params);
}
