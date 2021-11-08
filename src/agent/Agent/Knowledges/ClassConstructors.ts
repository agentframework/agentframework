import { Remember } from '../Decorators/Remember/Remember';
import { TypeInvocation } from '../TypeInvocations';

export interface ClassConstructorState {
  version: number;
  invocation: TypeInvocation;
}

/**
 * Gets or sets invocations of giving type (to improve both `new Class()` perf and bootstrap perf)
 */
export class ClassConstructors {
  static get v1() {
    return Remember('ClassConstructors', this, 'v1', () => new WeakMap<Function, ClassConstructorState>());
  }
}
