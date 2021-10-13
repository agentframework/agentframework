import { Remember } from '../../Core/Decorators/Remember';
import { TypeInvocation } from '../../Core/Annotation/TypeInvocations';

/**
 * Gets or sets invocations of giving type (to improve both `new Class()` perf and bootstrap perf)
 */
export class ClassInvocations {
  static get v1() {
    return Remember('ClassInvocations', this, 'v1', () => new WeakMap<Function, TypeInvocation>());
  }
}
