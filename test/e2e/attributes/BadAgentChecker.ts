
import { AgentAttribute } from '../../../src/lib';

export class BadAgentChecker extends AgentAttribute {
  
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }

}
