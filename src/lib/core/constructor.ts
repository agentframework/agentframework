/**
 * Constructor
 */
export interface Constructor {
  new(...args: Array<any>);
}

export interface TypedConstructorWithoutParameter<T> {
  new(): T;
}

export interface TypedConstructorWithParameters<T> {
  new(...args: Array<any>): T;
}

export type TypedConstructor<T> = TypedConstructorWithoutParameter<T> | TypedConstructorWithParameters<T>;
