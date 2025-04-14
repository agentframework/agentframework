import { ReadonlyCookies } from './cookie/ReadonlyCookies';
import { ReadonlyForm } from './form/ReadonlyForm';
import { ReadonlyHeaders } from './header/ReadonlyHeaders';
import { Dictionary } from './Dictionary';
import { WebRequest } from './WebRequest';
import { WebResponse } from './WebResponse';
import { CookieOptions } from './cookie/CookieOptions';

export interface WebContext {
  readonly id: string;
  readonly req: WebRequest;
  readonly res: WebResponse;
  readonly state: Dictionary<any>;

  // access request header
  readonly method: string;
  readonly url: string;
  readonly path: string;
  readonly query: Dictionary<string>;
  readonly params: Dictionary<string>;
  readonly headers: ReadonlyHeaders;
  readonly cookies: ReadonlyCookies;

  // helper function to access request header
  readonly origin: string | undefined;
  readonly referer: string | undefined;
  readonly href: string | undefined;
  readonly querystring: string | undefined;
  readonly search: string | undefined;
  readonly host: string | undefined;
  readonly hostname: string | undefined;
  readonly protocol: string | undefined;
  readonly ip: string | undefined;
  readonly device: string | undefined;
  readonly country: string | undefined;

  getHeader(name: string): string | undefined;
  getCookie(name: string): string | undefined;

  // helper function to access request body
  data(): Promise<Uint8Array>;
  text(): Promise<string>;
  json(): Promise<any>;
  form(): Promise<ReadonlyForm>;

  // Response aliases
  status: number | undefined;
  message: string | undefined;
  type: string | undefined;
  length: number | undefined;
  lastModified: Date | undefined;
  etag: string | undefined;

  addHeader(name: string, value: string): void;
  clearHeader(name: string): void;
  setHeader(name: string, value: string): void;

  addCookie(name: string, value: string, options?: CookieOptions): void;
  clearCookie(name: string, options?: CookieOptions): void;
  setCookie(name: string, value: string, options?: CookieOptions): void;

  attachment(filename: string, type?: string): void;
  redirect(url: string, alt?: string): void;

  body: unknown | undefined;
}
