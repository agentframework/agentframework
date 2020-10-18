import { Arguments, AnyConstructor } from '../../../dependencies/core';
import { Domain } from '../Domain';

export interface Provider<T extends object> {
  construct(target: AnyConstructor<T>, params: Arguments, domain: Domain): T;
}
