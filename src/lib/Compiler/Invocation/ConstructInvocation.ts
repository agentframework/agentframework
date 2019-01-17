/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { IInvocation } from '../../Core/IInvocation';
import { Reflector } from '../../Reflection/Reflector';
import { Type } from '../../Reflection/Type';
import { ICompiler } from '../ICompiler';
import { Arguments } from '../Arguments';
import { parameter } from '../Internal/Parameter';
import { Resolve } from '../../Internal/Resolve';
import { AgentCompiler } from '../AgentCompiler';

/**
 * @ignore
 * @hidden
 */
export class ConstructCompiler<C extends Function> {
  constructor(readonly _newTarget: C, readonly _target: C, readonly _design: any, readonly _params: Arguments) { }

  get target(): Function {
    return this._target;
  }

  get agent(): object | undefined {
    return undefined;
  }

  get design(): Type {
    return this._design;
  }

  get compiler(): ICompiler {
    const value = Resolve(AgentCompiler);
    Reflect.defineProperty(this, 'compiler', { value });
    return value;
  }

  get compiledParameters(): Map<number, [IInvocation, IInvocation]> {
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
    for (const [idx, [, interceptor]] of this.compiledParameters.entries()) {
      args[idx] = interceptor.invoke([parameters[idx], idx, args]);
    }
    parameter.set(this._args, args);
    return Reflect.construct(this._target, args, this.compiledTarget);
  }
}

/**
 * @ignore
 * @hidden
 */
export class DirectConstructInvocation<C extends Function> extends ConstructCompiler<C> implements IInvocation {
  constructor(_newTarget: C, readonly _args: any, _target: C, _params: Arguments, _design: any) {
    super(_newTarget, _target, _design, _params);
  }

  invoke<T>(parameters: ArrayLike<any>): T {
    if (Array.isArray(parameters)) { parameter.set(this._args, parameters); }
    return Reflect.construct(this._target, parameters, this.compiledTarget);
  }
}
