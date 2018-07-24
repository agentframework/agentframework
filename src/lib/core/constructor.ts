/**
 * Constructor
 */
export interface Constructor extends Function {
  new(...args);
}

export interface TypedConstructor<T> extends Constructor {
  new(...args: Array<any>): T;
}
