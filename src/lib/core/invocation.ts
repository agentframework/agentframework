import { IDesign } from './design';

export interface IInvoke {
  
  (...parameters: Array<any>): any
  
}


export interface IInvocation {
  
  design?: IDesign;
  
  target?: any;
  
  invoke(parameters: ArrayLike<any>): any;
  
}
