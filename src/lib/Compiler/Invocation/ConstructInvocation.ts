import { IInvocation } from '../../Core/IInvocation';
import { AgentAttribute } from '../../Core/AgentAttribute';
import { Reflector } from '../../Core/Reflector';
import { ICompiler } from '../../Core/ICompiler';
import { Arguments } from '../../Core/Arguments';
import { Parameters } from '../Parameters';

/**
 * @ignore
 * @hidden
 */
export class ConstructInvocation implements IInvocation {
  constructor(
    readonly _target: any,
    readonly _newTarget: any,
    readonly _options: AgentAttribute,
    readonly _compiler: ICompiler,
    readonly _params: Arguments,
    readonly _id: any
  ) {}

  get compiledParameters(): Map<number, IInvocation> {
    const value = this._compiler.compileParameters(Reflector(this._target));
    Reflect.defineProperty(this, 'compiledParameters', { value });
    return value;
  }

  get compiledTarget(): any {
    const value = this._compiler.compile(this._newTarget, this._options, this._params);
    Reflect.defineProperty(this, 'compiledTarget', { value });
    return value;
  }

  invoke(params: ArrayLike<any>) {
    const parameters = this.compiledParameters;
    let args;
    if (parameters.size) {
      args = Array.prototype.slice.call(params, 0);
      for (const idx of parameters.keys()) {
        const param = parameters.get(idx);
        if (param) {
          args[idx] = param.invoke([params[idx]]);
        }
      }
    } else {
      args = params;
    }
    Parameters.set(this._id, args);
    // Update parameters for this instance
    return Reflect.construct(this._target, args, this.compiledTarget);
  }
}
