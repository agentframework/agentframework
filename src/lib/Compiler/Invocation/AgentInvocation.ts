import { IInvocation } from '../../Core/IInvocation';

/**
 * @ignore
 * @hidden
 */
export class AgentInvocation implements IInvocation {
  constructor(readonly target: any) {}

  invoke([target, code, agent]): any {
    if (target === this.target) {
      return target;
    }
    // cheating v8 by using factory method for class
    const args = [target, 'Reflect', `return ${code}`];
    return Reflect.construct(Function, args)(this.target, agent);
  }
}
