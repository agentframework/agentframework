import { DirectConstructInvocation, InterceptedConstructInvocation } from './Invocation/ConstructInvocation';
import { Arguments } from './Arguments';
import { Reflector } from '../Reflection/Reflector';
import { InterceptorChainFactory } from './InterceptorChainFactory';

/**
 * @ignore
 * @hidden
 */
export class InterceptorConstructorFactory {
  static createConstructor<C extends Function>(newTarget: C, args: ArrayLike<any>, target: C, params: Arguments) {
    // search all attributes on this class constructor
    const design = Reflector(target);
    let invocation;
    if (design.hasAnnotatedParameters()) {
      invocation = new InterceptedConstructInvocation(newTarget, args, target, params, design);
    } else {
      invocation = new DirectConstructInvocation(newTarget, args, target, params, design);
    }
    const interceptors = design.getInterceptors();
    return InterceptorChainFactory.chainInterceptorAttributes(invocation, interceptors);
  }
}
