import { Knowledge } from './Knowledge';

export function GetOwnAnnotation(target: object | Function): object | undefined {
  return Knowledge.get(target);
}
