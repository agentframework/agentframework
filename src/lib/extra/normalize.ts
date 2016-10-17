import { IAttribute, IInterceptor, IInvocation, decorateClassMember } from '../core';

/**
 * Normalize the result { ok: 1, result: '', message: '' }
 * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
 */
export function normalize() {
  return decorateClassMember(new NormalizeAttribute());
}

class NormalizeAttribute implements IAttribute, IInterceptor {

  constructor() {
  }

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    try {
      const value = invocation.invoke(parameters);
      if (Array.isArray(value)) {
        return { ok: 1, results: value };
      }
      else {
        return { ok: 1, result: value };
      }
    }
    catch (err) {
      return { ok: 0, message: err.message };
    }
  }

}
