/**
 * Cookie Options
 *
 * https://httpwg.org/specs/rfc6265.html#cookie
 */
export interface CookieOptions {
  /**
   * a number representing the seconds from Date.now() for expiry
   */
  maxAge?: number;

  /**
   * a Date object indicating the cookie's expiration date (expires at the end of session by default).
   */
  expires?: Date;

  /**
   * a string indicating the path of the cookie (/ by default).
   */
  path?: string;

  /**
   * a string indicating the domain of the cookie (no default).
   */
  domain?: string;

  /**
   * a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS). Read more about this option below.
   */
  secure?: boolean;

  /**
   * a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (true by default).
   */
  httpOnly?: boolean;

  /**
   * a boolean or string indicating whether the cookie is a "same site" cookie (false by default). This can be set to 'strict', 'lax', or true (which maps to 'strict').
   */
  sameSite?: boolean | 'Strict' | 'Lax';
}
