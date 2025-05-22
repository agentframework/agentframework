/**
 * Interface for Class
 */
export interface Class<T extends object> extends Function {
  readonly prototype: T;
}
