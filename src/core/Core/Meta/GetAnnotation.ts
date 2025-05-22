import { Knowledge } from './Knowledge.ts';
import { Type } from './Type.ts';

/**
 * @internal
 */
export function GetAnnotation(target: object | Function): Type | undefined {
  return Knowledge.get(target);
}
