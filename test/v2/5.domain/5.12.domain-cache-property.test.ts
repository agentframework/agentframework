import {
  Arguments,
  decorateMember,
  decorateParameter,
  Design,
  Invocation,
  Reflector,
} from '../../../packages/dependencies/agent';
import { InMemoryDomain } from '../../../packages/dependencies/domain';

describe('5.12. Domain agent property cache', () => {
  describe('# should able to', () => {
    it('cache domain agent in same domain', () => {
      let seq: string[] = [];

      class WebRequest {
        @decorateMember({
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeInvoke');
              const ret = target.invoke(params, receiver);
              seq.push('afterInvoke');
              return ret;
            },
          },
        })
        invoke(
          @decorateParameter({
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeInvokeParameter');
                const ret = target.invoke(params, receiver);
                seq.push('afterInvokeParameter');
                return ret;
              },
            },
          })
          url?: string
        ) {
          seq.push('invoke');
        }
      }
      expect(seq).toEqual([]);

      seq = [];
      const domain1 = new InMemoryDomain();
      expect(seq).toEqual([]);
      debugger;
      const req1_d1 = domain1.resolve(WebRequest);
      expect(seq).toEqual([]);

      seq = [];

      req1_d1.invoke('example.com');
      // console.log('r1', seq);
      const cached1 = ['beforeInvoke', 'beforeInvokeParameter', 'afterInvokeParameter', 'invoke', 'afterInvoke'];
      expect(seq).toEqual(cached1);

      Reflector(WebRequest)
        .property('invoke')
        .addAttribute({
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeInvokeAttribute1');
              const ret = target.invoke(params, receiver);
              seq.push('afterInvokeAttribute1');
              return ret;
            },
          },
        });

      // make some changes to the interceptor
      seq = [];
      const req2_d1 = domain1.resolve(WebRequest);
      expect(seq).toEqual([]);

      req2_d1.invoke();
      // cached in same domain
      expect(seq).toEqual(cached1);

      // new domain
      seq = [];
      const domain2 = new InMemoryDomain();
      expect(seq).toEqual([]);

      const req1_d2 = domain2.resolve(WebRequest);
      expect(seq).toEqual([]);

      seq = [];
      req1_d2.invoke();
      // console.log('r3', seq);
      expect(seq).toEqual([
        'beforeInvokeAttribute1',
        'beforeInvoke',
        'beforeInvokeParameter',
        'afterInvokeParameter',
        'invoke',
        'afterInvoke',
        'afterInvokeAttribute1',
      ]);

      Reflector(WebRequest)
        .property('invoke')
        .addAttribute({
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeInvokeAttribute2');
              const ret = target.invoke(params, receiver);
              seq.push('afterInvokeAttribute2');
              return ret;
            },
          },
        });

      seq = [];
      const req2_d2 = domain2.resolve(WebRequest, [], true);
      expect(seq).toEqual([]);

      req2_d2.invoke();
      expect(seq).toEqual([
        'beforeInvokeAttribute2',
        'beforeInvokeAttribute1',
        'beforeInvoke',
        'beforeInvokeParameter',
        'afterInvokeParameter',
        'invoke',
        'afterInvoke',
        'afterInvokeAttribute1',
        'afterInvokeAttribute2',
      ]);

      seq = [];
      const domain3 = new InMemoryDomain();
      expect(seq).toEqual([]);
      debugger;
      const req1_d3 = domain3.resolve(WebRequest, [], true);
      expect(seq).toEqual([]);

      seq = [];
      req1_d3.invoke();
      // console.log('seq', seq);
      expect(seq).toEqual([
        'beforeInvokeAttribute2',
        'beforeInvokeAttribute1',
        'beforeInvoke',
        'beforeInvokeParameter',
        'afterInvokeParameter',
        'invoke',
        'afterInvoke',
        'afterInvokeAttribute1',
        'afterInvokeAttribute2',
      ]);
      // expect(seq).toEqual(cached1);
      // expect(seq).toEqual(req2_d2_seq);
    });
  });
});
