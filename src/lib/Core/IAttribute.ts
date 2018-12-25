import { IInitializer } from './IInitializer';
import { IInterceptor } from './IInterceptor';

/**
 *
 */
export interface IAttribute {
  /**
   * Called before decoration of this attribute
   *
   * @param {Object | Function} target
   * @param {string | Symbol} targetKey
   * @param {PropertyDescriptor} descriptor
   * @returns {boolean}
   */
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean;

  /**
   * Get an initializer for current target, replace the property or replace the class constructor
   */
  getInitializer?(): IInitializer;

  /**
   * Get an interceptor for current target
   */
  getInterceptor?(): IInterceptor;
}

export interface IInterceptorAttribute extends IAttribute {
  getInterceptor(): IInterceptor;
}

export interface IInitializerAttribute extends IAttribute {
  getInitializer(): IInitializer;
}
