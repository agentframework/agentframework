import { IInterceptor } from './interceptor';
import { Reflection } from './reflection';
import { AddConstructProxyInterceptor } from './interceptors/construct';
import { AddPrototypeInterceptor } from './interceptors/prototype';

export interface IAttribute {

  /**
   * Fired before decoration of this attribute
   * @param target
   * @param targetKey
   */
  beforeDecorate?(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean

  /**
   * Get interceptor for this _invocation
   */
  getInterceptor(): IInterceptor

}
