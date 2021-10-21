import { Knowledge } from './Knowledge';

export function GetKnowledge(): Map<string, any> {
  return Knowledge.get(Knowledge);
}
