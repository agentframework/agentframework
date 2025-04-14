import { ReadonlyCookies } from "./ReadonlyCookies";
import { CookieOptions } from "./CookieOptions";

export interface MutableCookies extends ReadonlyCookies {
  /**
   * Add a new cookie
   */
  add(name: string, value: string, options?: CookieOptions): void;

  /**
   * Replace existing cookie with value
   */
  set(name: string, value: string, options?: CookieOptions): void;

  /**
   * Remove all cookies match the name
   */
  delete(name: string, options?: CookieOptions): boolean;
}
