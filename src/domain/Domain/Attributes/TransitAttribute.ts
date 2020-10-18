import {
  PropertyInvocation,
  PropertyInterceptor,
  PropertyAttribute,
  Arguments,
  AnyConstructor,
} from '../../../dependencies/core';
import { FindDomainFromInvocation } from '../Helpers/FindDomainFromInvocation';
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
      throw new TypeError('UnknownTransitType');
    }

    // if this object created by domain, the last argument is domain itself
    const domain = FindDomainFromInvocation(params, receiver);
    if (domain) {
      // console.log('get type', typeof receiver, type.name)
      return domain.construct(type, params, true);
    } else {
      return Domain.construct(type, params);
    }
  }
}
