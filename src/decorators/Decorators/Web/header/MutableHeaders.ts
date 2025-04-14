import { ReadonlyHeaders } from './ReadonlyHeaders';

export interface MutableHeaders extends ReadonlyHeaders {
  /**
   * Appends a new value onto an existing header inside a Headers object,
   * or adds the header if it does not already exist.
   */
  add(name: string, value: string): void;

  /**
   * Sets a new value for an existing header inside a Headers object,
   * or adds the header if it does not already exist.
   */
  set(name: string, value: string): void;

  /**
   * Deletes a header from a Headers object.
   */
  delete(name: string): boolean;
}
