import { IInvocation } from '../../Core/IInvocation';
import { AgentAttribute } from '../../Core/AgentAttribute';
import { Arguments } from '../../Core/Arguments';
import { Reflector } from '../../Core/Reflector';
import { ICompiler } from '../../Core/ICompiler';

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
    readonly _params: Arguments
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
    const args = Array.prototype.slice.call(params, 0);
    const parameters = this.compiledParameters;
    if (parameters.size) {
      for (const idx of parameters.keys()) {
        const param = parameters.get(idx);
        if (param) {
          args[idx] = param.invoke([params[idx]]);
        }
      }
    }
    return Reflect.construct(this._target, args, this.compiledTarget);
  }
}
