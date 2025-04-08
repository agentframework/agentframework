/* tslint:disable */

import { AgentAttribute } from '../../../packages/dependencies/agent';

export class BadAgentChecker extends AgentAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }
}
