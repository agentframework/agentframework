import { CreateAgent } from '../CreateAgent';
import { Arguments } from '../Arguments';

export function construct(type: Function, params: Arguments): any {
  return Reflect.construct(CreateAgent(type), params);
}
