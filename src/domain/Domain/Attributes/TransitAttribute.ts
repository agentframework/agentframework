import {
  PropertyInvocation,
  PropertyInterceptor,
  PropertyAttribute,
  Arguments,
  AnyConstructor,
  AgentFrameworkError,
} from '../../../dependencies/core';
import { GetDomainFromInvocation } from '../Helpers/GetDomainFromInvocation';
import { Domain } from '../Domain';

export class TransitAttribute<T extends object> implements PropertyAttribute, PropertyInterceptor {
  private readonly type?: AnyConstructor<T>;

  constructor(type?: AnyConstructor<T>) {
    this.type = type;
  }

  get interceptor() {
    return this;
  }

  intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
    const type = this.type || (target.design && target.design.type);
    if (!type) {
      throw new AgentFrameworkError('UnknownTransitType');
    }

    // if this object created by domain, the last argument is domain itself
    const domain = GetDomainFromInvocation(target, params, receiver);
    let value;
    if (domain) {
      // console.log('get type', typeof receiver, type.name)
      value = domain.construct(type, params, true);
    } else {
      value = Domain.construct(type, params);
    }
    return target.invoke([value], receiver);
  }
}
