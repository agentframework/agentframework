import { IInitializer } from './IInitializer';
import { IInterceptor } from './IInterceptor';

/**
 * Attribute
 */
export interface IAttribute {
  /**
   * Before decoration hook. Return false to stop decorate this attribute to a class
   *
   * @param {Object | Function} target
   * @param {string | Symbol} key
   * @param {PropertyDescriptor} descriptor
   * @returns {boolean}
   */
  beforeDecorate(target: Object | Function, key?: string | symbol, descriptor?: PropertyDescriptor | number): boolean;

  /**
   * Get initializer for current target
   */
  readonly initializer?: IInitializer;

  /**
   * Get interceptor for current target
   */
  readonly interceptor?: IInterceptor;
}

export interface IInterceptorAttribute extends IAttribute {
  readonly interceptor: IInterceptor;
}

export interface IInitializerAttribute extends IAttribute {
  readonly initializer: IInitializer;
}
