/* tslint:disable */

import { AgentAttribute } from '../../../src/dependencies/agent';

export class BadAgentChecker extends AgentAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }
}
