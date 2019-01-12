import { Constructor } from './Constructor';

export interface IInvocation {
  readonly design: any;
  target: Function;
  invoke<T>(parameters: ArrayLike<any>): T;
}

export interface IValueInvocation extends IInvocation {
  readonly design: { type: Constructor<any> };
}

export interface IFunctionInvocation extends IInvocation {
  readonly design: {
    paramtypes: Array<any>;
    returntype: Constructor<any>;
  };
}
