import { IInitializer } from './IInitializer';
import { IInterceptor } from './IInterceptor';

/**
 * Attribute
 */
export interface IAttribute {

  /**
   * Get an initializer for current type
   */
  readonly initializer?: IInitializer;

  /**
   * Get an interceptor for current type
   */
  readonly interceptor?: IInterceptor;
  /**
   * Called before decoration of this attribute
   *
   * @param {Object | Function} target
   * @param {string | Symbol} targetKey
   * @param {PropertyDescriptor} descriptor
   * @returns {boolean}
   */
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean;
}

export interface IInterceptorAttribute extends IAttribute {
  readonly interceptor: IInterceptor;
}

export interface IInitializerAttribute extends IAttribute {
  readonly initializer: IInitializer;
}
