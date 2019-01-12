import { IInvocation } from '../../Core/IInvocation';
import { Parameter } from '../../Reflection/Parameter';

/**
 * @ignore
 * @hidden
 */
export class ParameterInvocation implements IInvocation {
  constructor(private _target: Function, private _design: Parameter<any>) {}

  get design(): Parameter<any> {
    return this._design;
  }

  get target(): Function {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>): any {
    // parameters[0] = value of index
    // parameters[1] = index of this parameter
    // parameters[2] = all parameters
    return parameters[0];
  }
}
