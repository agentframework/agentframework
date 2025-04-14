import { ConversationAttribute } from '../ConversationAttribute';
import { decorateClass } from '@agentframework/agent';

export function Conversation(path?: string) {
  return decorateClass(new ConversationAttribute(path));
}
