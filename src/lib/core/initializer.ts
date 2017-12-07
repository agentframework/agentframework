import { IInvocation } from './invocation';

export interface IInitializer {
  initialize(invocation: IInvocation, parameters: ArrayLike<any>): any;
}
