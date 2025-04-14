import { DialogAttribute } from '../DialogAttribute';
import { decorateMember } from '@agentframework/agent';

export function Dialog(name: string) {
  return decorateMember(new DialogAttribute(name));
}
