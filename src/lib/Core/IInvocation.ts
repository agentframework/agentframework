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

export interface IMethodInvocation extends IInvocation {
  method: Function;
}

export interface IParameterizedInvocation extends IMethodInvocation {
  params: Map<number, IInvocation>;
}
