import { Constructor } from './Constructor';

export interface IInvocation {
  design?:
    | {
        type: Constructor<any>;
      }
    | {
        paramtypes: Array<any>;
        returntype: Constructor<any>;
      };
  target: Function | Object;
  invoke<T>(parameters: ArrayLike<any>): T;
}

export interface IValueInvocation extends IInvocation {
  design: { type: Constructor<any> };
  target: Object;
}

export interface IFunctionInvocation extends IInvocation {
  design: {
    paramtypes: Array<any>;
    returntype: Constructor<any>;
  };
  target: Function;
}
