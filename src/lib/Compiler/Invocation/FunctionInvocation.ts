import { IInvocation } from '../../Core/IInvocation';
import { Constructor } from '../../Core/Constructor';

export class MethodInvocation<T> implements IInvocation {
  constructor(readonly target: Constructor<T>, readonly method: Function, readonly design: any) {}
  invoke(parameters: ArrayLike<any>): any {
    return Reflect.apply(this.method, this.target, parameters);
  }
}

export class ParameterizedMethodInvocation<T> implements IInvocation {
  constructor(
    readonly target: Constructor<T>,
    readonly method: Function,
    readonly design: any,
    readonly params: Map<number, IInvocation>
  ) {}
  invoke(parameters: ArrayLike<any>) {
    const params = Array.isArray(parameters) ? parameters : Array.prototype.slice.call(parameters, 0);
    for (const [idx, interceptor] of this.params.entries()) {
      params[idx] = interceptor.invoke([parameters[idx], idx, parameters]);
    }
    return Reflect.apply(this.method, this.target, params);
  }
}
