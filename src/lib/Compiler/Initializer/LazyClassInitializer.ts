import { InterceptorFactory } from '../InterceptorFactory';
import { Arguments } from '../../Core/Arguments';
import { IInvocation } from '../../Core/IInvocation';
import { Constructor } from '../../Core/Constructor';
import { Parameters } from '../Internal/Cache';
import { IInitializer } from '../../Core/IInitializer';
import { AgentClassName } from '../Internal/Constants';

export class LazyClassInitializer implements IInitializer {
  readonly target: any = function(args: ArrayLike<any>): ArrayLike<any> {
    return Parameters.has(args) ? Parameters.get(args) : args;
  };

  constructor() {
    const InterceptedConstructors = new WeakMap<any, IInvocation>();
    this.target.construct = function<T>(newTarget: Constructor<T>, params: Arguments, args: ArrayLike<any>): T {
      const target = Object.getPrototypeOf(newTarget.prototype).constructor;
      let ctor = InterceptedConstructors.get(target);
      if (!ctor) {
        ctor = InterceptorFactory.createConstructor(target, newTarget, params, args);
        InterceptedConstructors.set(target, ctor);
      }
      return ctor.invoke(args);
    };
  }

  public initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    const name = parameters[0].name || AgentClassName;
    const code = `class ${name}$ extends ${name}{constructor(){return Reflect.construct(new.target,arguments,()=>Reflect(arguments))}}`;
    return target.invoke([name, code, this.target]);
  }
}
