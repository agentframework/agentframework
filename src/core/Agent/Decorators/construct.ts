import { CreateAgent } from '../CreateAgent';
import { Arguments } from '../../Core/WellKnown';

export function construct(type: Function, params: Arguments): any {
  return Reflect.construct(CreateAgent(type), params);
}
