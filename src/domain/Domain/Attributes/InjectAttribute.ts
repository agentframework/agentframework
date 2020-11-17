import {
  PropertyAttribute,
  PropertyInvocation,
  PropertyInterceptor,
  Arguments,
  AnyConstructor,
  AgentFrameworkError
} from '../../../dependencies/core';
import { FindDomainFromInvocation } from '../Helpers/FindDomainFromInvocation';
import { DomainNotFoundError } from '../Errors/DomainNotFoundError';

export class InjectAttribute<T extends object> implements PropertyAttribute, PropertyInterceptor {
  private readonly type?: AnyConstructor<T>;

  constructor(type?: AnyConstructor<T>) {
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
    const domain = FindDomainFromInvocation(params, receiver);
    if (!domain) {
      throw new DomainNotFoundError(`no domain to inject ${type.name}`);
    }

    const value = domain.getAgentOrThrow(type);

    return target.invoke([value], receiver);
  }
}
