import { IInvocation } from './IInvocation';

/**
 * Intercept an method call
 */
export interface IInterceptor {
  intercept(target: IInvocation, parameters: ArrayLike<any>): any;
}
