/**
 * Interface for Arguments
 */
export interface Arguments extends Iterable<any> {
  [index: number]: any;

  length: number;
}

/**
 * Interface for Class
 */
export interface Class<T extends object> extends Function {
  readonly prototype: T;
}
