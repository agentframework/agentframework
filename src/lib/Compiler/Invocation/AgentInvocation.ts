import { IInvocation } from '../../Core/IInvocation';
import { Constructor } from '../../Core/Constructor';

/**
 * @ignore
 * @hidden
 */
export class AgentInvocation implements IInvocation {
  constructor(readonly target: Constructor<any>) {}

  invoke([target, code, agent]): any {
    if (target === this.target) {
      return target;
    }
    // cheating v8
    const args = [target, 'Reflect', `return ${code}`];
    return Reflect.construct(Function, args)(this.target, agent);
  }
}
