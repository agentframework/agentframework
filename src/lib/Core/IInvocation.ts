export interface IInvocation {
  design?: any;
  target?: any;
  invoke<T>(parameters: ArrayLike<any>): T;
}
