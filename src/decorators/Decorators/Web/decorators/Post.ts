import { MethodAttribute } from '../MethodAttribute';
import { decorateMember } from '@agentframework/agent';

export function Post(path?: string) {
  return decorateMember(new MethodAttribute('POST', path));
}
