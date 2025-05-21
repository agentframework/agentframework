import { Knowledge } from './Knowledge';
import { Type } from './Annotation/Type.ts';

/**
 * @internal
 */
export function GetAnnotation(target: object | Function): Type | undefined {
  return Knowledge.get(target);
}
