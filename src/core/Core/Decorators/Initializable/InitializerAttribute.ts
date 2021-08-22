import { Arguments } from '../../Interfaces/Arguments';
import { ClassInterceptor } from '../../Interfaces/TypeInterceptors';
import { TypeInvocation } from '../../Interfaces/TypeInvocations';
import { FindInitializers } from './FindInitializers';

export class InitializerAttribute implements ClassInterceptor {
  constructor(readonly key: PropertyKey) {}

  get interceptor() {
    return this;
  }

  intercept(target: TypeInvocation, params: Arguments, receiver: any) {
    // after create instance, call custom Initializer
    const instance = target.invoke(params, receiver);
    // call sequence: root -> base -> child
    const results = FindInitializers(receiver, this.key);
    for (const [initializer] of results) {
      Reflect.apply(initializer, instance, params);
    }
    return instance;
  }
}
