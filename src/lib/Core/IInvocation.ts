export interface IInvocation {
  design?: {
    type: any;
    paramtypes?: Array<any>;
    returntype?: any;
  };
  target?: any;
  invoke<T>(parameters: ArrayLike<any>): T;
}
