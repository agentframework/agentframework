import { Arguments, PropertyInvocation, PropertyInterceptor, PropertyAttribute } from '../../../dependencies/core';

export class OnceAttribute<T extends object> implements PropertyAttribute, PropertyInterceptor {
  get interceptor() {
    return this;
  }

  intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
    const value = target.invoke(params, receiver);
    const descriptor = target.design.descriptor;
    if (descriptor && descriptor.get && !descriptor.set) {
      Reflect.defineProperty(receiver, target.design.key, {
        get() {
          return value;
        },
        enumerable: true,
        configurable: true,
      });
    } else {
      throw new Error('OnceOnlyAvailableOnGetter');
    }
    return value;
  }
}
