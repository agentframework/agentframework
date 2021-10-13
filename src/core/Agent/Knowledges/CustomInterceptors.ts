import { Remember } from "../../Core/Decorators/Remember";

/**
 * Gets or sets interceptor for specified attribute
 */
export class CustomInterceptors {
  static get v1() {
    return Remember('CustomInterceptors', this, 'v1', () => new WeakMap<Function, [Function, unknown]>());
  }
}
