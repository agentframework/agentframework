import { InMemoryDomain } from '../../../src/dependencies/domain';
import { Agent, Arguments, decorateClass, Design, Invocation, Reflector } from '../../../src/dependencies/agent';

describe('5.11. Domain agent cache', () => {
  describe('# should able to', () => {
    it('cache domain agent in same domain', () => {
      let seq: string[] = [];

      const domain = new InMemoryDomain();

      @decorateClass({
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeWebRequest1');
            const ret = target.invoke(params, receiver);
            seq.push('afterWebRequest1');
            return ret;
          },
        },
      })
      class WebRequest511 {}

      expect(seq).toEqual([]);
      Reflector(Agent).addAttribute({
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeGlobal1');
            const ret = target.invoke(params, receiver);
            seq.push('afterGlobal1');
            return ret;
          },
        },
      });

      seq = [];
      const r1 = domain.construct(WebRequest511);
      expect(r1).toBeInstanceOf(WebRequest511);
      const r1_seq = ['beforeGlobal1', 'beforeWebRequest1', 'afterWebRequest1', 'afterGlobal1'];
      expect(seq).toEqual(r1_seq);

      Reflector(WebRequest511).addAttribute({
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeWebRequest2');
            const ret = target.invoke(params, receiver);
            seq.push('afterWebRequest2');
            return ret;
          },
        },
      });

      Reflector(Agent).addAttribute({
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeGlobal2');
            const ret = target.invoke(params, receiver);
            seq.push('afterGlobal2');
            return ret;
          },
        },
      });

      // make some changes to the interceptor
      seq = [];
      const r2 = domain.construct(WebRequest511); // cached, not call interceptor
      expect(seq).toEqual([]);
      expect(r2).toBe(r1);

      // new domain
      const domain2 = new InMemoryDomain();

      seq = [];
      const r3 = domain2.construct(WebRequest511);
      expect(r3).toBeInstanceOf(WebRequest511);
      const r3_seq = [
        'beforeGlobal2',
        'beforeGlobal1',
        'beforeWebRequest2',
        'beforeWebRequest1',
        'afterWebRequest1',
        'afterWebRequest2',
        'afterGlobal1',
        'afterGlobal2',
      ];
      expect(seq).toEqual(r3_seq);

      seq = [];
      const r4 = domain2.construct(WebRequest511, [], true);
      expect(r4).toBeInstanceOf(WebRequest511);
      expect(r3).not.toBe(r4);
      expect(seq).toEqual(r3_seq);
    });
  });
});
