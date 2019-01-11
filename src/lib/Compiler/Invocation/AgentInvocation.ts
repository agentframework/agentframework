import { IInvocation } from '../../Core/IInvocation';

/**
 * @ignore
 * @hidden
 */
export class AgentInvocation implements IInvocation {
  constructor(readonly target: any) {}

  invoke([name, code, target]): any {
    // cheating v8 engine
    if (name === this.target) {
      return name;
    }
    return Reflect.construct(Function, [name, 'Reflect', `return ${code}`])(this.target, target);
  }
}
