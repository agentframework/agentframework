import { IInvocation } from '../../Core/IInvocation';

/**
 * @ignore
 * @hidden
 */
export class ValueInvocation implements IInvocation {
  constructor(private _target: any, private _propertyKey: PropertyKey, private _design: any) {}

  get design(): any {
    return this._design;
  }

  get target(): any {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    return Reflect.get(this._target, this._propertyKey);
  }
}
