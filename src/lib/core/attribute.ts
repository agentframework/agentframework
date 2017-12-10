import { IInterceptor } from './interceptor';
import { IInitializer } from './initializer';

/**
 *
 */
export interface IAttribute {
  
  /**
   *
   */
  identifier?: string;
  
  /**
   * Fired before decoration of this attribute
   * @param {Object | Function} target
   * @param {string | symbol} targetKey
   * @param {PropertyDescriptor} descriptor
   * @returns {boolean}
   */
  beforeDecorate?(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean

  /**
   * Get initializer for current target, replace the property or replace the class constructor
   */
  getInitializer?(): IInitializer

  /**
   * Get interceptor for current target
   */
  getInterceptor?(): IInterceptor

}

/**
 * This attribute is for agent / domain management
 */
export interface IAgentAttribute {
  identifier: string;
}


export interface IBeforeDecorateAttribute {
  /**
   * Fired before decoration of this attribute
   * @param {Object | Function} target
   * @param {string | symbol} targetKey
   * @param {PropertyDescriptor} descriptor
   * @returns {boolean}
   */
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean
}


export function CanDecorate(attribute: IAttribute, target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
  return !attribute || !attribute.beforeDecorate || attribute.beforeDecorate(target, targetKey, descriptor);
}

export function GetInterceptor(attribute: IAttribute): IInterceptor | undefined {
  if (attribute.getInterceptor) {
    const interceptor = attribute.getInterceptor();
    // do not intercept when got false, null, ''
    if (!!interceptor && typeof interceptor.intercept === 'function' && interceptor.intercept.length === 2) {
      return interceptor;
    }
  }
  return undefined;
}

export function GetInitializer(attribute: IAttribute): IInitializer | undefined {
  if (attribute.getInitializer) {
    const initializer = attribute.getInitializer();
    // do not intercept when got false, null, ''
    if (!!initializer && typeof initializer.initialize === 'function' && initializer.initialize.length === 2) {
      return initializer;
    }
  }
  return undefined;
}
