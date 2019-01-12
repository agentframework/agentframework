import { IInvocation } from '../../Core/IInvocation';

/**
 * @ignore
 * @hidden
 */
export class AgentInvocation implements IInvocation {
  constructor(private readonly _target: Function, private readonly _design: any) {}

  get design(): any {
    return this._design;
  }

  get target(): Function {
    return this._target;
  }

  invoke([target, code, agent]): any {
    if (target === this.target) {
      return target;
    }
    // cheating v8
    const args = [target, 'Reflect', `return ${code}`];
    return Reflect.construct(Function, args)(this.target, agent);
  }
}
