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

import { InterceptorConstructorFactory } from '../InterceptorConstructorFactory';
import { Arguments } from '../Arguments';
import { parameter } from '../Internal/Parameter';
import { agentClass } from '../Internal/Constants';
import { IInvocation } from '../../Core/IInvocation';
import { IInitializer } from '../../Core/IInitializer';
import { Reflector } from '../../Reflection/Reflector';

export class LazyClassInitializer implements IInitializer {
  constructor() {
    const constructors = new WeakMap<any, IInvocation>();
    function construct<C extends Function>(newTarget: C, args: ArrayLike<any>, target: C, params: Arguments) {
      let ctor = constructors.get(newTarget);
      if (!ctor) {
        ctor = InterceptorConstructorFactory.createConstructor(newTarget, args, target, params);
        constructors.set(newTarget, ctor);
      }
      return ctor.invoke(args);
    }
    // use string to avoid runtime error by compressor or obfuscater
    Reflect.set(this.target, 'construct', construct);
  }
  // isParametersAvailable() make sure this is the only way need to add parameter interceptor
  readonly target = function (args: ArrayLike<any>): ArrayLike<any> {
    return parameter.has(args) ? parameter.get(args)! : args;
  };

  public initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    const name = target.target.name || agentClass;
    const type = Reflector(target.target);
    const code =
      `class ${name}$ extends ${name}{\n` +
      `  constructor(){return Reflect.construct(${name}$,arguments,${name},()=>Reflect(arguments))}\n` +
      '}';
    // const code = `class ${name}$ extends ${name}{constructor(){
    // return Reflect.construct(new.target,arguments,${name},()=>Reflect(arguments))}}`;
    return target.invoke([name, code, this.target, type]);
  }
}
