import { Soul } from './Soul';
import { Wisdom } from '../Wisdom';

export function FindSoul(target: object | Function): Soul {
  return Wisdom.add(target);
}
