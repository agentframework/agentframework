import { KeyAttribute } from '../KeyAttribute';
import { decorateMember } from '@agentframework/agent';

export function Key() {
  return decorateMember(new KeyAttribute());
}
