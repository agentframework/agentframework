import { Remember } from '../Decorators/Remember/Remember';
import { ClassInvocation } from '../TypeInvocations';

export interface ClassConstructorState {
  version: number;
  // constructor
  invocation: ClassInvocation;
}

/**
 * Gets or sets invocations of giving type (to improve both `new Class()` perf and bootstrap perf)
 */
export class ClassConstructors {
  static get v1() {
    return Remember('ClassConstructors', this, 'v1', () => new WeakMap<Function, ClassConstructorState>());
  }
}

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
