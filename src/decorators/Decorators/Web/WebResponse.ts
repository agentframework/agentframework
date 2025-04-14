import { CookieOptions } from './cookie/CookieOptions';
import { MutableHeaders } from './header/MutableHeaders';
import { MutableCookies } from './cookie/MutableCookies';

export interface WebResponse {
  
  status: number | undefined;
  message: string | undefined;
  type: string | undefined;
  length: number | undefined;
  lastModified: Date | undefined;
  etag: string | undefined;

  readonly headers: MutableHeaders;
  readonly cookies: MutableCookies;

  addHeader(name: string, value: string): void;
  clearHeader(name: string): void;
  setHeader(name: string, value: string): void;

  addCookie(name: string, value: string, options?: CookieOptions): void;
  clearCookie(name: string, options?: CookieOptions): void;
  setCookie(name: string, value: string, options?: CookieOptions): void;

  /**
   * Set Content-Disposition header to "attachment" with optional `filename`.
   *
   * @param {string} filename
   * @param {string} type
   * @api public
   */
  attachment(filename: string, type?: string): void;

  /**
   * Perform a 302 redirect to `url`.
   *
   * The string "back" is special-cased
   * to provide Referrer support, when Referrer
   * is not present `alt` or "/" is used.
   *
   * Examples:
   *
   *    this.redirect('back');
   *    this.redirect('back', '/index.html');
   *    this.redirect('/login');
   *    this.redirect('http://google.com');
   *
   * @param {String} url
   * @param {String} [alt]
   * @api public
   */
  redirect(url: string, alt?: string): void;

  /**
   * get or set raw response body
   */
  body: unknown | undefined;
}
