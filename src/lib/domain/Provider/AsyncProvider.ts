import { AnyConstructor, Arguments } from '../../../dependencies/core';
import { Domain } from '../Domain';

export interface AsyncProvider<T extends object> {
  resolve(target: AnyConstructor<T>, params?: Arguments, domain?: Domain): Promise<T>;
}
