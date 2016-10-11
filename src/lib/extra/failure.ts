import { IAttribute, IInterceptor, IInvocation, decorateClassMembers } from '../core';

/**
 * Return pre-defined value when catch an exception
 * @param replaced
 * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
 */
export function failure(replaced: any) {
  return decorateClassMembers(new FailureAttribute(replaced));
}

/**
 * PrerequisiteAttribute
 */
class FailureAttribute implements IAttribute, IInterceptor {

  
  static type: string = 'agent.framework.failure';
  
  constructor(private _value: any) {
  }

  get value(): boolean {
    return this._value
  }
  
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
  
  getType(): string {
    return FailureAttribute.type
  }
  
  getInterceptor(): IInterceptor {
    return this;
  }
  
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    try {
      return invocation.invoke(parameters);
    }
    catch(err) {
      return this.value;
    }
  }
}
