export interface ConstructorWithoutParameter {
  new (): any;
}

export interface ConstructorWithParameters {
  new (...args: Array<any>): any;
}

export type Constructor = ConstructorWithoutParameter | ConstructorWithParameters;
