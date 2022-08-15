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

      class AppWebRequest extends WebRequest {

      }
      const root = new InMemoryDomain();

      // cache WebRequest to improve performance
      root.compile(WebRequest);
      root.compile(AppWebRequest);

      const sub0 = root.construct(InMemoryDomain);
      expect(sub0).toBeInstanceOf(InMemoryDomain);
      expect(sub0).not.toBe(root);

      const sub1 = root.construct(InMemorySubDomain, [], true);
      expect(sub1.domain).toBe(root);
      const wr1 = sub1.construct(AppWebRequest);

      const sub2 = root.construct(InMemorySubDomain, [], true);
      expect(sub2.domain).toBe(root);
      const wr2 = sub2.construct(AppWebRequest);

      const sub3 = root.construct(InMemorySubDomain);
      expect(sub3.domain).toBe(root);
      const wr3 = sub3.construct(AppWebRequest, [], true);

      expect(wr1).not.toBe(wr2);
      expect(wr1).not.toBe(wr3);

      const reqs = new Set<AppWebRequest>();
      for (let n = 0; n < 10000; n++) {
        const sub = root.construct(InMemorySubDomain, [], true);
        const req = sub.construct(AppWebRequest);
        expect(reqs.has(req)).toBeFalse();
        reqs.add(req);
      }
    });
  });
});
