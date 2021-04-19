import { ClassInvocation } from '../Interfaces/TypeInvocations';
import { Arguments } from '../Interfaces/Arguments';
import { FindExtendedClass } from '../Helpers/FindExtendedClass';
import { OnDemandClassCompiler } from '../Compiler/OnDemandClassCompiler';

export class InterceptorAttribute {
  get interceptor() {
    return this;
  }

  intercept(target: ClassInvocation, params: Arguments, receiver: any) {
    const oldTarget = target.design.declaringType;
    // create agent type
    const newTarget: Function = target.invoke(params, receiver);

    /* istanbul ignore next */
    if (oldTarget === newTarget) {
      // not allow modify user class prototype
      return newTarget;
    }

    // NOTE: Static Constructor support, deep first
    const result = target.design.findProperties(p => p.hasOwnInterceptor());

    const properties = [];
    if (result.size) {
      for (const array of result.values()) {
        properties.push(...array);
      }
    }

    // if (!properties.length) {
    //   return newTarget;
    // }

    // 2. find the proxy class
    const proxies = FindExtendedClass(oldTarget, newTarget);

    // don't generate property interceptor if no extended class
    // quick check, ignore if keys are been declared
    // ownKeys() >= 1 because constructor is one key always have
    OnDemandClassCompiler.upgrade(proxies[0], properties, proxies[0], proxies[1]);

    return newTarget;
  }
}
