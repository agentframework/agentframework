export interface IInvocation {
  /**
   *
   */
  readonly design: any;

  /**
   * The origin user class
   */
  readonly target: Function;

  /**
   * The next function
   *
   * @param parameters
   */
  invoke<T>(parameters: ArrayLike<any>): T;
}
