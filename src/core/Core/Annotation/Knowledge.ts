import { memorize } from './Wisdom';
import { Invocation } from '../Interfaces/Invocation';

export class Knowledge {
  // core
  // key: Agent Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
  static get types() {
    return memorize<WeakMap<Function | object, Function>>(this, 'types');
  }

  static get invocations() {
    return memorize<WeakMap<Function, Invocation>>(this, 'invocations');
  }
}
