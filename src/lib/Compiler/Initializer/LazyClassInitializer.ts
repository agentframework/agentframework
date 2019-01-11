import { InterceptorFactory } from '../InterceptorFactory';
import { Arguments } from '../../Core/Arguments';
import { IInvocation } from '../../Core/IInvocation';
import { Constructor } from '../../Core/Constructor';
import { IInitializer } from '../../Core/IInitializer';
import { Parameters } from '../Internal/Cache';
import { AgentClassName } from '../Internal/Constants';

export class LazyClassInitializer implements IInitializer {
  readonly target: any = function(args: ArrayLike<any>): ArrayLike<any> {
    // console.log('read', args);
    return Parameters.has(args) ? Parameters.get(args) : args;
  };

  constructor() {
    const InterceptedConstructors = new WeakMap<any, IInvocation>();
    Reflect.set(this.target, 'construct', function(
      newTarget: Constructor<any>,
      args: ArrayLike<any>,
      target: any,
      params: Arguments
    ) {
      let ctor = InterceptedConstructors.get(newTarget);
      if (!ctor) {
        ctor = InterceptorFactory.createConstructor(newTarget, args, target, params);
        InterceptedConstructors.set(newTarget, ctor);
      }
      return ctor.invoke(args);
    });
  }

  public initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    const name = target.target.name || AgentClassName;
    const code = `class ${name}$ extends ${name}{constructor(){const a=arguments;return Reflect.construct(new.target,a,${name},()=>Reflect(a))}}`;
    return target.invoke([name, code, this.target]);
  }
}
