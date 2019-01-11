import { InterceptorFactory } from '../InterceptorFactory';
import { Constructor } from '../../Core/Constructor';
import { Arguments } from '../../Core/Arguments';
import { IInvocation } from '../../Core/IInvocation';
import { Parameters } from '../Internal/Cache';
import { IAttribute } from '../../Core/IAttribute';


/**
 * Build a class which lazy cached constructor
 */
export class LazyClassInitializer {
  private static InterceptedConstructors = new WeakMap<any, IInvocation>();

  public static construct<T>(
    newTarget: Constructor<T>,
    params: Arguments,
    args: ArrayLike<any>,
    options: IAttribute
  ): T {
    // find target
    const target = Object.getPrototypeOf(newTarget.prototype).constructor;
    // check cache
    let ctor = LazyClassInitializer.InterceptedConstructors.get(target);
    // compile only if not cached
    if (!ctor) {
      // create a interceptor chain from the found attributes
      ctor = InterceptorFactory.createConstructor(target, newTarget, options, params, args);
      // cache the interceptor
      // use symbol here to allow reset cache when needed
      LazyClassInitializer.InterceptedConstructors.set(target, ctor);
    }
    return ctor.invoke(args);
  }

  public static intercept(args: ArrayLike<any>) {
    return Parameters.get(args) || args;
  }
}
