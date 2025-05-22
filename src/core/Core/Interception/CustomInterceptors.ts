import { Remember } from '../../../decorator/Decorator/Remember/Remember.ts';

/**
 * Gets or sets interceptor for specified attribute
 */
export class CustomInterceptors {
  static get v1() {
    return Remember('CustomInterceptors', this, 'v1', () => new WeakMap<Function, [Function, unknown]>());
  }
}
