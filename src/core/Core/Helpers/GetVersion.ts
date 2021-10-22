import { Annotation } from '../Annotation/Annotation';
import { Knowledge } from '../Knowledge';

export function GetVersion(target: Function | object): Annotation {
  const knowledge = Knowledge.add(target);
  return Knowledge.get(knowledge);
}
