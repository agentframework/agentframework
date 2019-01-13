export interface IInvocation {
  /**
   *
   */
  design: any;

  /**
   * The origin user class
   */
  target: Function;
  
  /**
   * The next function
   *
   * @param parameters
   */
  invoke<T>(parameters: ArrayLike<any>): T;
}
