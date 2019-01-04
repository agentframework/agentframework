import { IInvocation } from '../../Core/IInvocation';
import { AgentAttribute } from '../../Core/AgentAttribute';

/**
 * @ignore
 * @hidden
 */
export class AgentInvocation implements IInvocation {
  constructor(readonly target: any, readonly attribute: AgentAttribute) { }

  invoke(parameters: ArrayLike<any>): any {
    return Reflect.construct(this.target, parameters);
  }
}
