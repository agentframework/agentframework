import { IAttribute, IInterceptor, IInvocation, decorateClassMember } from '../core';
import { IsEqual } from '../core/utils';

/**
 * Define a conditional
 * @param key
 * @param value
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor)=>undefined}
 */
export function conditional(key: string, value: any) {
  return decorateClassMember(new ConditionalAttribute(key, value));
}

/**
 * PrerequisiteAttribute
 */
export class ConditionalAttribute implements IAttribute, IInterceptor {

  constructor(private _key: string, private _value: any) {
  }

  get key(): string {
    return this._key
  }

  get value(): boolean {
    return this._value
  }

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {

    const actualValue = Reflect.get(invocation.target, this.key);

    // console.log(`actual: ${actualValue}  expect: ${this.value}`);
    if (IsEqual(actualValue, this.value)) {
      return invocation.invoke(parameters);
    }
    return undefined;
  }

}
