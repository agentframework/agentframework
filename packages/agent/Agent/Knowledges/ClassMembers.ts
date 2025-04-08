import { Remember } from '../../../../packages/dependencies/core';
import { PropertyInfo } from '../Reflection/PropertyInfo';

export interface ClassMemberState {
  // type version
  version: number;
  // properties version
  members: Map<string | symbol, number>;
  // properties
  properties: readonly PropertyInfo[];
}

export class ClassMembers {
  static get v1() {
    return Remember('ClassMembers', this, 'v1', () => new WeakMap<Function, ClassMemberState>());
  }
}
