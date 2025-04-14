import { MethodAttribute } from '../MethodAttribute';
import { decorateMember } from '@agentframework/agent';

export function Method(method: string, path?: string) {
  return decorateMember(new MethodAttribute(method.toUpperCase(), path));
}
