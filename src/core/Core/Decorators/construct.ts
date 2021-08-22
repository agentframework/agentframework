import { CreateAgent } from '../Agent/CreateAgent';
import { Arguments } from '../Interfaces/Arguments';

export function construct(type: Function, params: Arguments): any {
  return Reflect.construct(CreateAgent(type), params);
}
