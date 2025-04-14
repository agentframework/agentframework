import { decorateMember } from '@agentframework/agent';
import { OptionalAttribute } from './OptionalAttribute';

export function Optional() {
  return decorateMember(new OptionalAttribute());
}
