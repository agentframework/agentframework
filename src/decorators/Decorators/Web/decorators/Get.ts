import { MethodAttribute } from '../MethodAttribute';
import { decorateMember } from '@agentframework/agent';

export function Get(path?: string) {
  return decorateMember(new MethodAttribute('GET', path));
}
