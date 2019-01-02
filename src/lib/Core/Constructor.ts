export interface ConstructorWithoutParameter<T> {
  new (): T;
}

export interface ConstructorWithParameters<T> {
  new (...args: Array<any>): T;
}

export type Constructor<T extends Object = Object> = ConstructorWithoutParameter<T> | ConstructorWithParameters<T>;
