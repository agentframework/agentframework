export interface IInvoke {
  (parameters: ArrayLike<any>): any
}

export interface IInvocation {
  target?: any;
  method?: IInvoke;

  invoke(parameters: ArrayLike<any>): any;
}
