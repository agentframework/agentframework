/* tslint:disable */

import { AgentAttribute } from '../../../lib';

export class BadAgentChecker extends AgentAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }
}
