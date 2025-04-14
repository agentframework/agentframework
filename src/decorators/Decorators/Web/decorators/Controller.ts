import { ControllerAttribute } from '../ControllerAttribute';
import { decorateClass } from '@agentframework/agent';

export function Controller(path?: string) {
  return decorateClass(new ControllerAttribute(path));
}
