import { IInvocation } from '../../Core/IInvocation';

/**
 * @ignore
 * @hidden
 */
export class AgentInvocation implements IInvocation {
  constructor(readonly target: Function) {}

  invoke([target, code, agent]): any {
    if (target === this.target) {
      return target;
    }
    // cheating v8
    const args = [target, 'Reflect', `return ${code}`];
    return Reflect.construct(Function, args)(this.target, agent);
  }
}
