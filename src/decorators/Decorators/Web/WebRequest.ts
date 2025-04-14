import { WebResponse } from './WebResponse';
import { ReadonlyHeaders } from './header/ReadonlyHeaders';
import { ReadonlyForm } from './form/ReadonlyForm';
import { Dictionary } from './Dictionary';
import { ReadonlyCookies } from './cookie/ReadonlyCookies';

export interface WebRequest {
  /**
   * web request id
   */
  readonly id: string;

  /**
   * Web response
   */
  readonly res: WebResponse;

  /**
   * data only shared in current request scope
   */
  readonly state: Dictionary<any>;

  // access raw request header
  /**
   * Request method. upper case
   */
  readonly method: string;

  /**
   * Get request URL.
   *
   * e.g. /foo/bar?q=1
   */
  readonly url: string;

  /**
   * Get request pathname.
   *
   * e.g. /foo/bar
   */
  readonly path: string;

  readonly query: Dictionary<string>;

  readonly params: Dictionary<string>;

  readonly headers: ReadonlyHeaders;

  readonly cookies: ReadonlyCookies;

  // access raw request body
  readonly body: unknown;

  /**
   * Get origin of URL, include protocol and host.
   *
   * e.g. http://example.com
   */
  readonly origin: string | undefined;

  /**
   * Get referer of URL, include referer or referrer
   *
   * e.g. http://example.com
   */
  readonly referer: string | undefined;

  /**
   * Get full request URL, include protocol, host, url
   *
   * e.g. http://example.com/foo/bar?q=1
   */
  readonly href: string | undefined;

  /**
   * Get raw query string void of ?.
   */
  readonly querystring: string | undefined;

  /**
   * Get raw query string with the ?.
   */
  readonly search: string | undefined;

  /**
   * Get host (hostname:port) when present. Supports X-Forwarded-Host and Host.
   */
  readonly host: string | undefined;

  /**
   * Get hostname when present. Supports X-Forwarded-Host and Host.
   */
  readonly hostname: string | undefined;

  /**
   * Return request protocol, "https" or "http". Supports X-Forwarded-Proto
   */
  readonly protocol: string | undefined;

  /**
   * Return request Content-Length as a number when present, or undefined.
   */
  readonly length: number | undefined;

  /**
   * Return request content type as a string when present, or undefined.
   */
  readonly type: string | undefined;

  /**
   * Return request content charset as a string when present, or undefined.
   */
  readonly charset: string | undefined;

  /**
   * Return remote client ip
   */
  readonly ip: string | undefined;

  /**
   * Return client device
   */
  readonly device: string | undefined;

  /**
   * Return client country according to remote client ip
   */
  readonly country: string | undefined;

  // /**
  //  * Check if the incoming request contains the "Content-Type" header field, and it
  //  * contains any of the give mime types. If there is no request body, null is returned.
  //  * If there is no content type, or the match fails false is returned. Otherwise, it
  //  * returns the matching content-type.
  //  *
  //  * // With Content-Type: text/html; charset=utf-8
  //  * req.is('html'); // => 'html'
  //  * req.is('text/html'); // => 'text/html'
  //  * req.is('text/*', 'text/html'); // => 'text/html'
  //  *
  //  * // When Content-Type is application/json
  //  * req.is('json', 'urlencoded'); // => 'json'
  //  * req.is('application/json'); // => 'application/json'
  //  * req.is('html', 'application/*'); // => 'application/json'
  //  *
  //  * req.is('html'); // => false
  //  */
  // is(types: string[]): string | null | false;
  //
  // /**
  //  * Check if the given type(s) is acceptable, returning the best match when true, otherwise
  //  * false. The type value may be one or more mime type string such as "application/json",
  //  * the extension name such as "json", or an array ["json", "html", "text/plain"].
  //  *
  //  * // Accept: text/html
  //  * req.accepts('html');
  //  * // => "html"
  //  *
  //  * // Accept: text/*, application/json
  //  * req.accepts('html');
  //  * // => "html"
  //  * req.accepts('text/html');
  //  * // => "text/html"
  //  * req.accepts('json', 'text');
  //  * // => "json"
  //  * req.accepts('application/json');
  //  * // => "application/json"
  //  *
  //  * // Accept: text/*, application/json
  //  * req.accepts('image/png');
  //  * req.accepts('png');
  //  * // => false
  //  *
  //  * // Accept: text/*;q=.5, application/json
  //  * req.accepts(['html', 'json']);
  //  * req.accepts('html', 'json');
  //  * // => "json"
  //  *
  //  * // No Accept header
  //  * req.accepts('html', 'json');
  //  * // => "html"
  //  * req.accepts('json', 'html');
  //  * // => "json"
  //  */
  // accepts(types: string[]): string | false;
  // accepts(): string[];

  // /**
  //  * Check if encodings are acceptable, returning the best match when true, otherwise false.
  //  * Note that you should include identity as one of the encodings!
  //  */
  // acceptsEncodings(encodings: string[]): string | false;
  // acceptsEncodings(): string[];
  //
  // /**
  //  * Check if charsets are acceptable, returning the best match when true, otherwise false.
  //  */
  // acceptsCharsets(charsets: string[]): string | false;
  // acceptsCharsets(): string[];
  //
  // /**
  //  * Check if languages are acceptable, returning the best match when true, otherwise false.
  //  */
  // acceptsLanguages(languages: string[]): string | false;
  // acceptsLanguages(): string[];

  // helper function to access request header
  getHeader(name: string): string | undefined;
  getCookie(name: string): string | undefined;

  // helper function to access request body
  data(): Promise<Uint8Array>;
  text(): Promise<string>;
  json(): Promise<any>;
  form(): Promise<ReadonlyForm>;
}
