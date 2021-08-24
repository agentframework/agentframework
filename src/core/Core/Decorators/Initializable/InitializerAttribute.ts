import { AgentFrameworkError } from '../../AgentFrameworkError';
import { Arguments } from '../../Interfaces/Arguments';
import { ClassInterceptor } from '../../Interfaces/TypeInterceptors';
import { TypeInvocation } from '../../Interfaces/TypeInvocations';

export class InitializerAttribute implements ClassInterceptor {
  constructor(readonly key: PropertyKey) {}

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
