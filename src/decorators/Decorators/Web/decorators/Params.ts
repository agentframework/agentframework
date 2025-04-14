import { ParamsAttribute } from '../ParamsAttribute';
import { decorateMember } from '@agentframework/agent';

export function Params(name: string) {
  return decorateMember(new ParamsAttribute(name));
}
