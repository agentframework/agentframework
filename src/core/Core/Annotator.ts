import { Knowledge } from './Knowledge';

export function Annotator(key: Function | object): any {
  return Knowledge.add(key);
}
