import { AgentFrameworkError } from '../../../agent/Agent/AgentFrameworkError.ts';
import { TypeInterceptor } from '../../../core/Core/Interception/TypeInterceptors.ts';
import { TypeInvocation } from '../../../core/Core/Interception/TypeInvocations.ts';
import { Arguments } from '../../../core/Core/Interception/Arguments.ts';

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
