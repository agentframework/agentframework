import { IInvocation } from '../../Core/IInvocation';
import { IAttribute } from '../../Core/IAttribute';

/**
 * @ignore
 * @hidden
 */
export class AgentInvocation implements IInvocation {
  constructor(readonly target: any, readonly attribute: IAttribute) {}

  invoke(parameters: ArrayLike<any>): any {
    // do nothing but return current type
    return this.target;
  }
}
