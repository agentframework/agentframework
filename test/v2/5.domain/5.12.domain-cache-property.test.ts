import { InMemoryDomain } from '../../../src/dependencies/domain';
import {
  Arguments,
  decorateMember,
  decorateParameter,
  Design,
  Invocation,
  Reflector,
} from '../../../src/dependencies/core';

describe('5.11. Domain agent cache', () => {
  describe('# should able to', () => {
    it('cache domain agent in same domain', () => {
      let seq: string[] = [];

      const domain = new InMemoryDomain();

      class WebRequest {
        @decorateMember({
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeInvoke1');
              const ret = target.invoke(params, receiver);
              seq.push('afterInvoke1');
              return ret;
            },
          },
        })
        invoke(
          @decorateParameter({
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeInvokeParameter1');
                const ret = target.invoke(params, receiver);
                seq.push('afterInvokeParameter1');
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
      const r1 = domain.construct(WebRequest);
      expect(seq).toEqual([]);

      seq = [];
      r1.invoke();
      // console.log('r1', seq);
      const cached1 = ['beforeInvoke1', 'beforeInvokeParameter1', 'afterInvokeParameter1', 'invoke', 'afterInvoke1'];
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
      const r2 = domain.construct(WebRequest);
      expect(seq).toEqual([]);

      seq = [];
      r2.invoke();
      // console.log('r2', seq);
      expect(seq).toEqual(cached1);

      // new domain
      const domain2 = new InMemoryDomain();

      seq = [];
      const r3 = domain2.construct(WebRequest);
      expect(seq).toEqual([]);

      seq = [];
      r3.invoke();
      // console.log('r3', seq);
      expect(seq).toEqual([
        'beforeInvokeAttribute1',
        'beforeInvoke1',
        'beforeInvokeParameter1',
        'afterInvokeParameter1',
        'invoke',
        'afterInvoke1',
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
      const r4 = domain2.construct(WebRequest, [], true);
      expect(seq).toEqual([]);

      seq = [];
      r4.invoke();
      // console.log('r3', seq);
      expect(seq).toEqual([
        'beforeInvokeAttribute2',
        'beforeInvokeAttribute1',
        'beforeInvoke1',
        'beforeInvokeParameter1',
        'afterInvokeParameter1',
        'invoke',
        'afterInvoke1',
        'afterInvokeAttribute1',
        'afterInvokeAttribute2',
      ]);
    });
  });
});
