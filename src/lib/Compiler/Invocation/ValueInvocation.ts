import { IInvocation } from '../../Core/IInvocation';
import { Constructor } from '../../Core/Constructor';

/**
 * @ignore
 * @hidden
 */
export class ValueInvocation implements IInvocation {
  constructor(private _target: Constructor<any>, private _propertyKey: PropertyKey, private _design: any) {}

  get design(): any {
    return this._design;
  }

  get target(): Constructor<any> {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    // how to know the value of a field before you create that class
    // return the value from prototype is a good choose? NO, it may cause infinite loops
    return undefined;
  }
}
