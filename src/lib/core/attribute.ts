import { IInterceptor } from './interceptor';

export interface IAttribute {
  
  /**
   * Attribute identifier
   */
  identifier?: string;
  
  /**
   * Fired before decoration of this attribute
   * @param target
   * @param targetKey
   */
  beforeDecorate?(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean

  /**
   * Get interceptor for this _invocation
   */
  getInterceptor?(): IInterceptor

}

/**
 * This attribute is for agent / domain management
 */
export interface IAgentAttribute extends IAttribute {
  identifier: string;
}

export interface IBeforeDecorateAttribute extends IAttribute {

  /**
   * Fired before decoration of this attribute
   * @param target
   * @param targetKey
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
