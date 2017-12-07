import { decorateClassMember } from '../core/decorator';
import { IAttribute } from '../core/attribute';
import { IInterceptor } from '../core/interceptor';
import { IInvocation } from '../core/invocation';


/**
 * Return pre-defined value when catch an exception
 * @param replaced
 * @returns {(target:Object, propertyKey:(string|symbol), descriptor?:PropertyDescriptor)=>void}
 */
export function failure(replaced: any) {
  return decorateClassMember(new FailureAttribute(replaced));
}

/**
 * PrerequisiteAttribute
 */
export class FailureAttribute implements IAttribute, IInterceptor {

  constructor(private _value: any) {
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
    try {
      return invocation.invoke(parameters);
    }
    catch (err) {
      return this.value;
    }
  }
}
