import { IInvocation } from './invocation';


export interface IInterceptor {
  intercept(target: IInvocation, parameters: ArrayLike<any>): any;
}
