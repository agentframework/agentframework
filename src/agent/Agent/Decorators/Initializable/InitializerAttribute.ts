import { AgentFrameworkError } from '../../AgentFrameworkError';
import { ClassInterceptor } from '../../TypeInterceptors';
import { ClassInvocation } from '../../TypeInvocations';
import { Arguments } from '../../Arguments';


export class InitializerAttribute implements ClassInterceptor {
  constructor(readonly key: PropertyKey) {}

  get interceptor() {
    return this;
  }

  intercept(target: ClassInvocation, params: Arguments, receiver: any) {
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
