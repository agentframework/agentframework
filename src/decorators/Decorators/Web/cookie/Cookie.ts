import { CookieOptions } from './CookieOptions';

/**
 * Cookie may have same name but different value
 *
 * https://httpwg.org/specs/rfc6265.html#cookie
 */
export interface Cookie extends CookieOptions {
  /**
   * Name of this cookie
   */
  name: string;

  /**
   * Value of this cookie
   */
  value: string;
}
