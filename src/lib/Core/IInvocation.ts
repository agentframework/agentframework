export interface IInvocationDesign {
  type: any;
  paramtypes?: Array<any>;
  returntype?: any;
}

export interface IInvocation {
  design?: IInvocationDesign;
  target?: any;
  invoke<T>(parameters: ArrayLike<any>): T;
}
