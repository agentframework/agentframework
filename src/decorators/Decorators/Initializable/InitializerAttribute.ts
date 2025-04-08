import { AgentFrameworkError } from '../../../../packages/agent/Agent/AgentFrameworkError';
import { TypeInterceptor } from '../../../../packages/agent/Agent/TypeInterceptors';
import { TypeInvocation } from '../../../../packages/agent/Agent/TypeInvocations';
import { Arguments } from '../../../../packages/agent/Agent/Arguments';

export class InitializerAttribute implements TypeInterceptor {
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
