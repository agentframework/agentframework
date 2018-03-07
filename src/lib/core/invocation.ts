import { IDesign } from './design';

export interface IInvoke {

  (...args): any

}


export interface IInvocation {

  design?: IDesign;

  target?: any;

  invoke(parameters: ArrayLike<any>): any;

}
