import { Arguments, ClassInterceptor, ClassInvocation } from '../../../dependencies/core';
import { ClassInitializer } from '../Symbols';
import { FindDomainFromInvocation } from '../Helpers/FindDomainFromInvocation';
import { FindInitializers } from '../Helpers/FindInitializers';

export class InitializableAttribute implements ClassInterceptor {
  get interceptor() {
    return this;
  }

  intercept(target: ClassInvocation, params: Arguments, receiver: any) {
    let instance;
    const type = target.design.declaringType;
    // const init = (target: ClassInvocation, params: Arguments, receiver: any)
    // console.log('proxy target', type);
    // console.log('proxy agent', receiver);
    // console.log('proxy ctor', params);

    // create instance
    const initializerFunction = type[ClassInitializer];
    // in case of human mistake, check prototype if no static initializer function found
    if (initializerFunction) {
      if (typeof initializerFunction === 'function') {
        const domain = FindDomainFromInvocation(params, receiver);

        // debugger;
        // console.log('call initializerFunction', target);

        // found class initializer function
        // create instance using initializer function
        instance = Reflect.apply(initializerFunction, type, [domain, target, params, receiver]);
        // if (!(newCreated instanceof DomainAgentClass)) {
        //   console.log('invalid new domain agent');
        //   console.log('new Required', DomainAgentClass);
        //   console.log('new Created', newCreated);
        // }
      } else {
        throw new SyntaxError('ClassInitializerMustFunction');
      }
    } else {
      // TODO: move this code to static check during compilation to avoid human mistakes
      // if (target.prototype[ClassInitializer]) {
      //   throw new SyntaxError('ClassInitializerMustStatic');
      // }
      // console.log('call target.invoke');
      instance = target.invoke(params, receiver);
    }

    // after create instance
    const initializers = FindInitializers(type);
    if (initializers.length) {
      for (const layer of initializers) {
        Reflect.apply(layer[0], instance, params);
      }
    }

    return instance;
  }
}
