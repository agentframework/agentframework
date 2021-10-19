import { Knowledge } from '../Knowledge';

export function GetKnowledge(): Map<string, any> {
  return Knowledge.get(Knowledge);
}

export function GetOwnKnowledge(target: object | Function): object | undefined {
  return Knowledge.get(target);
}
