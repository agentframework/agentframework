import { IInvocation } from './invocation';


export interface IInitializer {
  initialize(target: IInvocation, parameters: ArrayLike<any>): any;
}

