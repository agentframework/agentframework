import { decorateMember } from '@agentframework/agent';
import { PropertyAttribute } from '../PropertyAttribute';

export function Property() {
  return decorateMember(new PropertyAttribute());
}
