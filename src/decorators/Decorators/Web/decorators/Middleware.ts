import { MiddlewareAttribute } from '../MiddlewareAttribute';
import { WebContext } from '../WebContext';
import { decorateMember } from '@agentframework/agent';

export namespace Middleware {
  export interface Context extends WebContext {}

  export interface Next {
    (): Promise<any>;
  }
}

export function Middleware() {
  return decorateMember(new MiddlewareAttribute());
}
