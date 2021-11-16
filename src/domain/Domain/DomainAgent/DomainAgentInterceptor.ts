import { Arguments, TypeInterceptor, TypeInvocation } from '../../../dependencies/agent';
import { DomainLike } from '../DomainLike';

export class DomainAgentInterceptor implements TypeInterceptor {
  constructor(readonly domain: DomainLike) {
    //
  }

  public intercept(target: TypeInvocation, params: Arguments, receiver: unknown): unknown {
    return target.invoke(params, receiver);
  }
}
