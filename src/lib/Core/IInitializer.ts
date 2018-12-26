import { IInvocation } from './IInvocation';

/**
 * Initialize a field
 */
export interface IInitializer {
  configurable?: boolean;
  enumerable?: boolean;
  writable?: boolean;
  initialize(target: IInvocation, parameters: ArrayLike<any>): any;
}
