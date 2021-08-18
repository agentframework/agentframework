/* tslint:disable */

import { AgentAttribute } from '../../../src';

export class BadAgentChecker extends AgentAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }
}
