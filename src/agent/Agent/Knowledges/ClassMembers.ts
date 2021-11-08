import { Remember } from '../Decorators/Remember/Remember';

export interface ClassMemberState {
  // type version
  version: number;
  // properties version
  members: Map<string | symbol, number>;
}

export class ClassMembers {
  static get v1() {
    return Remember('ClassMembers', this, 'v1', () => new WeakMap<Function, ClassMemberState>());
  }
}
