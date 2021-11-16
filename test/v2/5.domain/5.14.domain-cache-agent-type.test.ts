import { InMemoryDomain, InMemorySubDomain } from '../../../src/domain';
import { Arguments, decorateMember, PropertyInvocation } from '../../../src/agent';

describe('5.14. Domain cache agent type', () => {
  describe('# should able to', () => {
    it('cache domain agent in parent domain of same domain', () => {
      class WebRequest {
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: unknown): unknown {
              return '/api' + target.invoke(params, receiver);
            },
          },
        })
        get url(): string {
          return '/myapp';
        }
      }
      const root = new InMemoryDomain();
      // cache WebRequest
      root.compile(WebRequest);

      const sub = root.construct(InMemorySubDomain);
      expect(sub.parent).toBe(root);

      const wr1 = sub.construct(WebRequest, [], true);
      const wr2 = sub.construct(WebRequest, [], true);

      expect(wr1).not.toBe(wr2);

      for (let n = 0; n < 10000; n++) {
        const newReq = root.construct(InMemorySubDomain, [], true);
        newReq.construct(WebRequest, [], true);
      }
    });
  });
});
