import { IInvocation } from './IInvocation';

/**
 * Initialize a field
 */
export interface IInitializer {
  initialize(target: IInvocation, parameters: ArrayLike<any>): any;
}
