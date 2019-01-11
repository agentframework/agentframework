import { IInvocation } from '../../Core/IInvocation';

/**
 * @ignore
 * @hidden
 */
export class ParameterInvocation implements IInvocation {
  constructor(private _target: any, private _design: any) {}

  get design(): any {
    return this._design;
  }

  get target(): any {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    // parameters[0] = value of index
    // parameters[1] = index of this parameter
    // parameters[2] = all parameters
    return parameters[0];
  }
}
