import { ModelAttribute } from '../ModelAttribute';
import { decorateClass } from '@agentframework/agent';

export function Model(collection: string) {
  return decorateClass(new ModelAttribute(collection));
}
