import { CreateAgent } from '../Compiler/CreateAgent';
import { Arguments } from '../Interfaces/Arguments';

export function construct(type: Function, params: Arguments): any {
  return Reflect.construct(CreateAgent(type), params);
}
