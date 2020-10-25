import { decorateAgent } from './Decorator/decorateAgent';
import { InterceptorAttribute } from './InterceptorAttribute';

export function interceptable() {
  return decorateAgent(new InterceptorAttribute());
}
