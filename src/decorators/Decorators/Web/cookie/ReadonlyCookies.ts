/**
 * Data relationship between cookie name and cookie value is one to many.
 *
 * Data structure to store cookies is Map<string, Array<string>>
 */
export interface ReadonlyCookies {
  /**
   * Return cookie value, name is case-sensitive
   */
  get(name: string): string | undefined;

  /**
   * Return all cookie value with specified cookie name
   */
  getAll(name: string): Array<string> | undefined;

  /**
   * Check whether the specified cookie exists or not
   */
  has(name: string): boolean;

  /**
   * Returns an iterator allowing to go through all key/value pairs contained in this object.
   */
  [Symbol.iterator](): IterableIterator<[string, string]>;

  /**
   * Returns an iterator allowing to go through all key/value pairs contained in this object.
   */
  entries(): IterableIterator<[string, string]>;

  /**
   * Returns an iterator allowing you to go through all keys of the key/value pairs contained in this object.
   */
  keys(): IterableIterator<string>;

  /**
   * Returns an iterator allowing you to go through all values of the key/value pairs contained in this object.
   */
  values(): IterableIterator<string>;
}
