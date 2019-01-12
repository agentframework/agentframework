import { InterceptorFactory } from '../InterceptorFactory';
import { Arguments } from '../../Core/Arguments';
import { IInvocation } from '../../Core/IInvocation';
import { Constructor } from '../../Core/Constructor';
import { IInitializer } from '../../Core/IInitializer';
import { Parameters } from '../Internal/Cache';
import { AgentClassName } from '../Internal/Constants';

export class AgentInitializer implements IInitializer {
  readonly target = function(args: ArrayLike<any>): ArrayLike<any> {
    return Parameters.has(args) ? Parameters.get(args) : args;
  };

  constructor() {
    const InterceptedConstructors = new WeakMap<any, IInvocation>();
    function construct<T>(newTarget: Constructor<T>, args: ArrayLike<any>, target: Constructor<T>, params: Arguments) {
      let ctor = InterceptedConstructors.get(newTarget);
      if (!ctor) {
        ctor = InterceptorFactory.createConstructor(newTarget, args, target, params);
        InterceptedConstructors.set(newTarget, ctor);
      }
      return ctor.invoke(args);
    }
    // use string to avoid runtime error by compressor or obfuscater
    Reflect.set(this.target, 'construct', construct);
  }

  public initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    const name = target.target.name || AgentClassName;
    const code = `class ${name}$ extends ${name}{constructor(){return Reflect.construct(new.target,arguments,${name},()=>Reflect(arguments))}}`;
    return target.invoke([name, code, this.target]);
  }
}
