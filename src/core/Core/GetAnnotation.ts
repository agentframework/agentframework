import { Knowledge } from './Knowledge';
import { Type } from './Type';

export function GetAnnotation(target: object | Function): Type | undefined {
  return Knowledge.get(target);
}
