export interface ReadonlyHeaders {
  /**
   * Returns the specified HTTP request header field (case-insensitive match).
   * The Referrer and Referer fields are interchangeable.
   */
  get(name: string): string | undefined;

  /**
   * Returns all headers of giving name
   */
  getAll(name: string): Array<string> | undefined;

  /**
   * Check whether the specified header exists or not
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
