/* tslint:disable */

import {
  Arguments,
  Attribute,
  PropertyInvocation,
  ParameterInvocation,
  PropertyInterceptor,
  ParameterInterceptor,
} from '../../../src';

export class InjectAttribute implements Attribute, PropertyInterceptor {
  get interceptor(): PropertyInterceptor {
    return this;
  }

  intercept(target: PropertyInvocation, parameters: Arguments, receiver: any): any {
    // console.log('inject', target.design, '===>', parameters, 'function', target.invoke.toString());
    if (parameters.length) {
      return target.invoke(parameters, receiver);
    } else {
      const result = target.invoke(parameters, receiver);
      if (typeof result === 'undefined' && target.design.type) {
        return Reflect.construct(target.design.type, parameters);
      }
      return result;
    }
  }
}

export class InjectParameterAttribute implements Attribute, ParameterInterceptor {
  get interceptor(): ParameterInterceptor {
    return this;
  }

  intercept(target: ParameterInvocation, parameters: Arguments, receiver: any): any {
    // console.log('inject parameter', target.design, '===>', parameters, 'function', target.invoke.toString());
    if (target.design.type) {
      return Reflect.construct(target.design.type, parameters);
    }
    return target.invoke(parameters, receiver);
  }
}
