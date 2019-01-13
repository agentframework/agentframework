import { IInvocation } from '../../Core/IInvocation';
import { Reflector } from '../../Reflection/Reflector';
import { Type } from '../../Reflection/Type';
import { ICompiler } from '../ICompiler';
import { Arguments } from '../Arguments';
import { Parameters } from '../Internal/Parameters';
import { Resolve } from '../../Internal/Resolve';
import { AgentCompiler } from '../AgentCompiler';

/**
 * @ignore
 * @hidden
 */
export class ConstructCompiler<C extends Function> {
  constructor(readonly _newTarget: C, readonly _target: C, readonly _design: any, readonly _params: Arguments) {}

  get target(): Function {
    return this._target;
  }

  get design(): Type {
    return this._design;
  }

  get compiler(): ICompiler {
    const value = Resolve(AgentCompiler);
    Reflect.defineProperty(this, 'compiler', { value });
    return value;
  }

  get compiledParameters(): Map<number, IInvocation> {
    const value = this.compiler.compileParameters(this._target, Reflector(this._target));
    Reflect.defineProperty(this, 'compiledParameters', { value });
    return value;
  }

  get compiledTarget(): any {
    const value = this.compiler.compile(this._newTarget, this._params);
    Reflect.defineProperty(this, 'compiledTarget', { value });
    return value;
  }
}

/**
 * @ignore
 * @hidden
 */
export class InterceptedConstructInvocation<C extends Function> extends ConstructCompiler<C> implements IInvocation {
  constructor(_newTarget: C, readonly _args: any, _target: C, _params: Arguments, _design: any) {
    super(_newTarget, _target, _design, _params);
  }

  invoke(parameters: ArrayLike<any>) {
    let args = Array.prototype.slice.call(parameters, 0);
    for (const [idx, interceptor] of this.compiledParameters.entries()) {
      args[idx] = interceptor.invoke([parameters[idx], idx, args]);
    }
    Parameters.set(this._args, args);
    return Reflect.construct(this._target, args, this.compiledTarget);
  }
}

/**
 * @ignore
 * @hidden
 */
export class DirectConstructInvocation<C extends Function> extends ConstructCompiler<C> implements IInvocation {
  constructor(_newTarget: C, _args: any, _target: C, _params: Arguments, _design: any) {
    super(_newTarget, _target, _design, _params);
  }

  invoke<T>(parameters: ArrayLike<any>): T {
    return Reflect.construct(this._target, parameters, this.compiledTarget);
  }
}
