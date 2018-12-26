export interface TypedConstructorWithoutParameter<T> {
  new (): T;
}

export interface TypedConstructorWithParameters<T> {
  new (...args: Array<any>): T;
}

export type TypedConstructor<T extends Object = Object> =
  | TypedConstructorWithoutParameter<T>
  | TypedConstructorWithParameters<T>;
