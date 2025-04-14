import { MethodAttribute } from '../MethodAttribute';
import { decorateMember } from '@agentframework/agent';

export function Put(path?: string) {
  return decorateMember(new MethodAttribute('PUT', path));
}
