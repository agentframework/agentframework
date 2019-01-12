import { IInvocation } from '../../Core/IInvocation';
import { Property } from '../../Reflection/Property';

/**
 * @ignore
 * @hidden
 */
export class FieldInvocation implements IInvocation {
  constructor(private _target: Function, private _propertyKey: PropertyKey, private _design: Property) {}

  get design(): Property {
    return this._design;
  }

  get target(): Function {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    // how to know the value of a field before you create that class
    // return the value from prototype is a good choose? NO, it may cause infinite loops
    return undefined;
  }
}
