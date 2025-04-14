import { MethodAttribute } from '../MethodAttribute';
import { decorateMember } from '@agentframework/agent';

export function Head(path?: string) {
  return decorateMember(new MethodAttribute('HEAD', path));
}
