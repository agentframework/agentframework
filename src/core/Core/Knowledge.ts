import { Invocation } from './Interfaces/Invocation';
import { Interceptor } from './Interfaces/Interceptor';
import { Constructor } from './Constructor';
import { Remember } from './Wisdom/Remember';

/**
 * Get original type of giving agent
 */
export class Types {
  // core
  // key: Agent Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
  static get v1() {
    return Remember<Map<Function | object, Function | object>>(this, 'v1', Map);
  }
}

/**
 * Get invocations of giving type
 */
export class Invocations {
  static get v1() {
    return Remember<Map<Function, Invocation>>(this, 'v1', Map);
  }
}

/**
 * Get interceptors of giving type
 */
export class Interceptors {
  static get v1() {
    return Remember<Map<Function, [Constructor<Interceptor>, unknown]>>(this, 'v1', Map);
  }
}
