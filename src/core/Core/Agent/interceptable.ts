import { decorateAgent } from '../Decorator/decorateAgent';
import { InterceptorAttribute } from './InterceptorAttribute';

/**
 * Enable interceptor for static member
 */
export function interceptable() {
  return decorateAgent(new InterceptorAttribute());
}
