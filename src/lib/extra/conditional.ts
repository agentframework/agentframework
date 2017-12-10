import { IsEqual } from '../core/utils';
import { decorateClassMember, decorateClassMethod } from '../core/decorator';
import { IAttribute } from '../core/attribute';
import { IInterceptor } from '../core/interceptor';
import { IInvocation } from '../core/invocation';


/**
 * Define a conditional
 * @param field
 * @param expect
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor)=>undefined}
 */
export function conditional(field: string, expect: any) {
  return decorateClassMethod(new ConditionalAttribute(field, expect));
}

/**
 * PrerequisiteAttribute
 */
export class ConditionalAttribute implements IAttribute, IInterceptor {

  constructor(private _field: string, private _expect: any) {
  }

  get field(): string {
    return this._field
  }

  get expect(): boolean {
    return this._expect
  }

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }

  getInterceptor(): IInterceptor {
    return this;
  }

  intercept(invocation: IInvocation, parameters: ArrayLike<any>): any {
    const actualValue = Reflect.get(invocation.target, this.field);
    if (IsEqual(actualValue, this.expect)) {
      return invocation.invoke(parameters);
    }
    return undefined;
  }

}
