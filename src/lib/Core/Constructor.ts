export interface ConstructorWithoutParameter {
  new (): Object;
}

export interface ConstructorWithParameters {
  new (...args: Array<any>): Object;
}

export type Constructor = ConstructorWithoutParameter | ConstructorWithParameters;
