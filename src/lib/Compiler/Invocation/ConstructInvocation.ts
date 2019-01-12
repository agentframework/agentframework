import { IInvocation } from '../../Core/IInvocation';
import { Reflector } from '../../Reflection/Reflector';
import { Constructor } from '../../Core/Constructor';
import { ICompiler } from '../ICompiler';
import { Arguments } from '../Arguments';
import { Parameters } from '../Internal/Parameters';
import { Resolve } from '../../Internal/Resolve';
import { AgentCompiler } from '../AgentCompiler';

/**
 * @ignore
 * @hidden
 */
export class ConstructInvocation<C extends Function> implements IInvocation {
  constructor(
    readonly _newTarget: C,
    readonly _args: any,
    readonly _target: C,
    readonly _params: Arguments
  ) {}

  get compiler(): ICompiler {
    return Resolve(AgentCompiler);
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

  get target(): Function {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>) {
    let args;
    if (this._target.length > 0) {
      const params = this.compiledParameters;
      if (params.size) {
        args = Array.isArray(parameters) ? parameters : Array.prototype.slice.call(parameters, 0);
        for (const [idx, interceptor] of params.entries()) {
          args[idx] = interceptor.invoke([parameters[idx], idx, args]);
        }
        Parameters.set(this._args, args);
        return Reflect.construct(this._target, args, this.compiledTarget);
      }
    }
    return Reflect.construct(this._target, parameters, this.compiledTarget);
  }
}
