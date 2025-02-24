import { AgentFrameworkError } from '../../AgentFrameworkError';
import { TypeInterceptor } from '../../TypeInterceptors';
import { TypeInvocation } from '../../TypeInvocations';
import { Arguments } from '../../Arguments';

export class InitializerAttribute implements TypeInterceptor {
  constructor(readonly key: PropertyKey) {}

  get interceptor() {
    return this;
  }

  after(target: TypeInvocation, params: Arguments, receiver: any) {
    const initializer = Reflect.get(receiver, this.key);
    if (initializer) {
      if ('function' !== typeof initializer) {
        throw new AgentFrameworkError('InitializerIsNotFunction');
      }
      Reflect.apply(initializer, receiver, params);
    }
    return receiver;
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
