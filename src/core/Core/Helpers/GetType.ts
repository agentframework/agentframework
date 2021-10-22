import { Type } from '../Annotation/Type';
import { Knowledge } from '../Knowledge';

export function GetType(target: Function | object): Type {
  return Knowledge.add(target);
}
