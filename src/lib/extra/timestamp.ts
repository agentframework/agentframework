import { IAttribute, IInterceptor, IInvocation, decorateClassMember } from '../core';

/**
 * Normalize the result { ok: 1, result: '', message: '' }
 * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
 */
export function timestamp() {
  return decorateClassMember(new TimestampAttribute());
}

class TimestampAttribute implements IAttribute, IInterceptor {
  
  constructor() {
  }
  
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
  
  getInterceptor(): IInterceptor {
    return this;
  }
  
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    const value = invocation.invoke(parameters);
    // update timestamp field with current datetime
    Reflect.set(invocation.target, 'timestamp', Date.now());
    return value;
  }
  
}
