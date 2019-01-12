import { Constructor } from './Constructor';

export interface IInvocation {
  design?: {
    type?: Constructor<any>;
    paramtypes?: Array<any>;
    returntype?: Constructor<any>;
  };
  target: Constructor<any>;
  invoke<T>(parameters: ArrayLike<any>): T;
}
