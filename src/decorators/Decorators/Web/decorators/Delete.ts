import { MethodAttribute } from '../MethodAttribute';
import { decorateMember } from '@agentframework/agent';

export function Delete(path?: string) {
  return decorateMember(new MethodAttribute('DELETE', path));
}
