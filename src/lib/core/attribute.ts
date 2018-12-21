import { IInterceptor } from './interceptor';
import { IInitializer } from './initializer';
import { AgentOptions } from './agent';
import { IsFunction } from './utils';

/**
 *
 */
export interface IAttribute {
  /**
   * Identifier of this attribute, usually UUID
   */
  identifier?: string;

  /**
   * Called before decoration of this attribute
   *
   * @optional
   * @param {Object | Function} target
   * @param {string | Symbol} targetKey
   * @param {PropertyDescriptor} descriptor
   * @returns {boolean}
   */
  beforeDecorate?(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean;

  /**
   * Get an initializer for current target, replace the property or replace the class constructor
   */
  getInitializer?(): IInitializer;

  /**
   * Get an interceptor for current target
   */
  getInterceptor?(): IInterceptor;
}

/**
 * This attribute is for agent / domain management
 */
export interface IAgentAttribute extends IAttribute {
  /**
   * Agent Options
   */
  options: AgentOptions;

  /**
   * Fired before decoration of this attribute
   *
   * @param {Object | Function} target
   * @param {string | Symbol} targetKey
   * @param {PropertyDescriptor} descriptor
   * @returns {boolean}
   */
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean;
}

export interface IBeforeDecorateAttribute {
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

export function CanDecorate(
  attribute: IAttribute,
  target: Object | Function,
  targetKey?: string | symbol,
  descriptor?: PropertyDescriptor
): boolean {
  if (!attribute) {
    return false;
  }
  if (IsFunction(attribute.beforeDecorate)) {
    return attribute.beforeDecorate(target, targetKey, descriptor);
  }
  return true;
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
