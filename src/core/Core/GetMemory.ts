import { Knowledge } from './Knowledge';

export function GetMemory(): Map<string, any> {
  return Knowledge.get(Knowledge);
}
