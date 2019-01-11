import { IInvocation } from '../../Core/IInvocation';
import { Reflector } from '../../Core/Reflector';
import { ICompiler } from '../../Core/ICompiler';
import { Arguments } from '../../Core/Arguments';
import { Parameters } from '../Internal/Cache';
import { Resolve } from '../../Core/Resolver/Resolve';
import { AgentCompiler } from '../AgentCompiler';

/**
 * @ignore
 * @hidden
 */
export class ConstructInvocation implements IInvocation {
  constructor(readonly _newTarget: any, readonly _args: any, readonly _target: any, readonly _params: Arguments) {}

  get compiler(): ICompiler {
    return Resolve(AgentCompiler);
  }

  get compiledParameters(): Map<number, IInvocation> {
    const value = this.compiler.compileParameters(Reflector(this._target));
    Reflect.defineProperty(this, 'compiledParameters', { value });
    return value;
  }

  get compiledTarget(): any {
    const value = this.compiler.compile(this._newTarget, this._params);
    Reflect.defineProperty(this, 'compiledTarget', { value });
    return value;
  }

  get target() {
    return this._target;
  }

  invoke(parameters: ArrayLike<any>) {
    const params = this.compiledParameters;
    let args;
    if (params.size) {
      args = Array.isArray(parameters) ? parameters : Array.prototype.slice.call(parameters, 0);
      for (const [idx, interceptor] of params.entries()) {
        args[idx] = interceptor.invoke([parameters[idx], idx, args]);
      }
      Parameters.set(this._args, args);
    } else {
      args = parameters;
    }
    return Reflect.construct(this._target, args, this.compiledTarget);
  }
}
