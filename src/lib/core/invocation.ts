
export interface IInvoke {

  (...parameters: Array<any>): any

}


export interface IInvocation {

  target?: any;

  invoke(parameters: ArrayLike<any>): any;

}
