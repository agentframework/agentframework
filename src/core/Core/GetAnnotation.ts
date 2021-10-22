import { Knowledge } from './Knowledge';
import { Type } from './Type';

export function GetOwnAnnotation(target: object | Function): Type | undefined {
  return Knowledge.get(target);
}
