import { IAttribute, IInterceptor, IInvocation, decorateClassMember } from '../core';

/**
 * Define a prerequisite
 * @param key
 * @param value
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor)=>undefined}
 */
export function success(key: string, value: any) {
  return decorateClassMember(new SuccessAttribute(key, value));
}

/**
 * PrerequisiteAttribute
 */
class SuccessAttribute implements IAttribute, IInterceptor {

  constructor(private _key: string, private _value: any) {
  }

  get key(): string {
    return this._key
  }
  
  get value(): boolean {
    return this._value
  }
  
  beforeDecorate(target: Object|Function, targetKey?: string|symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
  
  getInterceptor(): IInterceptor {
    return this;
  }
  
  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    const result = invocation.invoke(parameters);
    // debug(`SuccessAttribute updating target value ${this.key}='${this.value}'`);
    Reflect.set(invocation.target, this.key, this.value);
    return result;
  }
}
