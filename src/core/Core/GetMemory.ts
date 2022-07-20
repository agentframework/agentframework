import { Knowledge } from './Knowledge';

/**
 * @internal
 */
export function GetMemory(): Map<string, any> {
  return Knowledge.get(Knowledge);
}
