import { AgentFrameworkError, Arguments, TypeInterceptor, TypeInvocation, } from '../../../packages/dependencies/agent';
import { GetSystemDomain } from '../../../packages/dependencies/domain';
import { AddAttributeToConstructor } from '../../../packages/dependencies/core';

export const Initializer: unique symbol = Symbol.for('AgentFramework.Initializer');

class InitializerAttribute implements TypeInterceptor {
  constructor(readonly key: PropertyKey) {
  }

  get interceptor() {
    return this;
  }

  intercept(target: TypeInvocation, params: Arguments, receiver: any) {
    // after create instance, call custom Initializer
    const instance = target.invoke<object>(params, receiver);
    const initializer = Reflect.get(instance, this.key);
    if (initializer) {
      if ('function' !== typeof initializer) {
        throw new AgentFrameworkError('InitializerIsNotFunction');
      }
      Reflect.apply(initializer, instance, params);
    }

    return instance;
  }
}

class StaticInitializerAttribute implements TypeInterceptor {
  constructor(readonly key: PropertyKey) {
  }

  get interceptor() {
    return this;
  }

  intercept(target: TypeInvocation, params: Arguments, receiver: Function): object {
    const declaringType = target.design.declaringType;
    const initializer = Reflect.get(declaringType, this.key, receiver);
    if (initializer) {
      if ('function' !== typeof initializer) {
        throw new AgentFrameworkError('ClassInitializerIsNotFunction');
      }
      return Reflect.apply(initializer, declaringType, arguments);
    } else {
      return target.invoke(params, receiver);
    }
  }
}

function initializable(key?: string | symbol): ClassDecorator {
  return (type: Function): void => {
    // NOTE: Design pattern: Factory method
    // InitializerAttribute must before StaticInitializerAttribute
    AddAttributeToConstructor(new InitializerAttribute(key || Initializer), type.prototype);
    AddAttributeToConstructor(new StaticInitializerAttribute(key || Initializer), type.prototype);
  };
}

@initializable()
export class WebRequestIdentity {
  constructor(
    readonly status?: boolean
  ) {
  }

  /**
   * Initialize a settings object
   */
  static [Initializer](target: TypeInvocation, params: Arguments, receiver: any) {
    return new WebRequestIdentity(true);
  }
}


describe('4.11. Class Initializer', () => {
  describe('# should able to', () => {
    it('intercept class constructor', () => {
      const a = new WebRequestIdentity();
      expect(a.status).toBeUndefined();
      const b = GetSystemDomain().resolve(WebRequestIdentity);
      expect(b.status).toBe(true);
    });
  });
});
