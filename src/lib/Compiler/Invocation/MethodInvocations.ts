import { IInvocation } from '../../Core/IInvocation';
import { Method } from '../../Reflection/Method';
import { Property } from '../../Reflection/Property';

export class DirectMethodInvocation implements IInvocation {
  constructor(
    readonly _target: Function,
    readonly method: Function,
    readonly _design: Method<Property>,
    private _newTarget?: Function
  ) {}

  get design(): Method<Property> {
    return this._design;
  }

  get target(): Function {
    return this._target;
  }

  set target(newTarget: Function) {
    this._newTarget = newTarget;
  }

  invoke(parameters: ArrayLike<any>): any {
    return Reflect.apply(this.method, this._newTarget, parameters);
  }
}

export class InterceptedMethodInvocation implements IInvocation {
  constructor(
    readonly _target: Function,
    readonly method: Function,
    readonly _design: Method<Property>,
    readonly params: Map<number, IInvocation>,
    private _newTarget?: Function
  ) {}

  get design(): Method<Property> {
    return this._design;
  }

  get target(): Function {
    return this._target;
  }

  set target(newTarget: Function) {
    this._newTarget = newTarget;
  }

  invoke(parameters: ArrayLike<any>) {
    const params = Array.isArray(parameters) ? parameters : Array.prototype.slice.call(parameters, 0);
    for (const [idx, interceptor] of this.params.entries()) {
      params[idx] = interceptor.invoke([parameters[idx], idx, parameters]);
    }
    return Reflect.apply(this.method, this._newTarget, params);
  }
}
