import { AgentInvocation } from '../Invocation/AgentInvocation';
import { IInitializer } from '../../Core/IInitializer';
import { InterceptorFactory } from '../InterceptorFactory';
import { AgentAttribute } from '../../Core/AgentAttribute';
import { Constructor } from '../../Core/Constructor';
import { Arguments } from '../../Core/Arguments';
import { IInvocation } from '../../Core/IInvocation';
import { AgentCompiler } from '../AgentCompiler';
import { Agents } from '../../Core/Cache';
import { Resolve } from '../../Core/Resolver/Resolve';

/**
 * Build a class which lazy cached constructor
 */
export class ClassInitializer implements IInitializer {
  private static InterceptedConstructors = new WeakMap<any, IInvocation>();

  public static construct<T>(newTarget: Constructor<T>, params: Arguments, options: AgentAttribute): T {
    // find target
    const target = Object.getPrototypeOf(newTarget.prototype).constructor;

    // check cache
    let ctor = ClassInitializer.InterceptedConstructors.get(target);

    // compile only if not cached
    if (!ctor) {
      const compiler = Resolve(AgentCompiler);

      // create a interceptor chain from the found attributes
      ctor = InterceptorFactory.createConstructor(target, newTarget, options, compiler, params);

      // cache the interceptor
      // use symbol here to allow reset cache when needed
      ClassInitializer.InterceptedConstructors.set(target, ctor);
    }

    return ctor.invoke(params());
  }

  initialize(invocation: AgentInvocation, parameters: ArrayLike<any>): any {
    const target = invocation.target;
    const targetName = target.name || 'Agent';
    const newTarget = new Function(
      'Reflect',
      targetName,
      'target',
      [
        `return class ${targetName}$ extends ${targetName} {`,
        '  constructor() {',
        `    return Reflect.construct(new.target, ()=>arguments, target);`,
        '  }',
        '};'
      ].join('\r\n')
    )(ClassInitializer, target, invocation.attribute); // this.prototype is not available here
    Agents.set(newTarget, target);
    return newTarget;
  }
}