/* tslint:disable */

import { OnDemandAgentAttribute } from '../../../src/dependencies/agent';

export class BadAgentChecker extends OnDemandAgentAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }
}
