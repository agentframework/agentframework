import { decorateMember } from '@agentframework/agent';
import { MandatoryAttribute } from './MandatoryAttribute';

export function Mandatory() {
  return decorateMember(new MandatoryAttribute());
}
