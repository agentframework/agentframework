import { IInvocation } from './invocation';
import { Constructor } from './constructor';


export interface IInitializer {
  initialize(target: IInvocation, parameters: ArrayLike<any>): any;
}

/**
 * @ignore
 * @hidden
 * @type {Map<Function, IInitializer>}
 */
export const Initializers: Map<Function, IInitializer> = new Map<Function, IInitializer>();

/**
 * @ignore
 * @param {Constructor} initializerType
 * @param args
 * @returns {IInitializer}
 * @constructor
 */
export function GetGlobalInitializer(initializerType: Constructor, ...args): IInitializer {
  if (!Initializers.has(initializerType)) {
    Initializers.set(initializerType, Reflect.construct(initializerType, args));
  }
  return Initializers.get(initializerType);
}
