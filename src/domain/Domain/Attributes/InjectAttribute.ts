import {
  PropertyAttribute,
  PropertyInvocation,
  PropertyInterceptor,
  Arguments,
  AgentFrameworkError
} from '../../../dependencies/core';
import { AnyClass } from '../Class';
import { GetDomainFromInvocation } from '../Helpers/GetDomainFromInvocation';

export class InjectAttribute implements PropertyAttribute, PropertyInterceptor {
  private readonly type?: AnyClass;

  constructor(type?: AnyClass) {
    // if (typeof type === 'string') {
    //   // lookup type from local type registration
    //   throw new Error('NotSupportInjectUsingName');
    // } else {
    this.type = type;
    // }
  }

  get interceptor() {
    return this;
  }

  intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
    const type = this.type || (target.design && target.design.type);
    if (!type) {
      throw new AgentFrameworkError('UnknownInjectType');
    }
    // console.log('target:', target.design.declaringType);
    // console.log('receiver:', receiver);
    // console.log('inject:', type);
    // console.log('domain core', Knowledge);

    // console.log('params', params);
    // console.log('receiver', receiver);
    const domain = GetDomainFromInvocation(target, params, receiver);
    if (!domain) {
      throw new AgentFrameworkError('DomainNotFound: ' + type.name);
      // throw new DomainNotFoundError(`no domain to inject ${type.name}`);
    }

    const value = domain.getAgent(type);
    if (!value) {
      throw new AgentFrameworkError('InjectInstanceNotExists: ' + type.name);
    }

    return target.invoke([value], receiver);
  }
}
