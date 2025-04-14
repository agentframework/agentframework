export interface AbstractConstructor<T> extends Function {
  readonly prototype: T;
}

export interface DefaultConstructor<T> extends AbstractConstructor<T> {
  new (): T;
}

export interface ParameterConstructor<T> extends AbstractConstructor<T> {
  new (...params: any[]): T;
}

export declare type Constructor<T> = DefaultConstructor<T> | ParameterConstructor<T>;
