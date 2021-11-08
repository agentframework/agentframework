import { InMemoryDomain } from '../../../src/dependencies/domain';
import { Arguments, decorateClass, Design, Invocation, Reflector } from '../../../src/dependencies/agent';

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

      expect(seq).toEqual([]);
      const r1 = domain.construct(WebRequest511);
      expect(r1).toBeInstanceOf(WebRequest511);
      const r1_seq = ['beforeWebRequest1', 'afterWebRequest1'];
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

      const r1_seq_updated = [
        'beforeWebRequest2',
        'beforeWebRequest1',
        'afterWebRequest1',
        'afterWebRequest2'
      ];

      // make some changes to the interceptor
      seq = [];
      const r1_ref = domain.construct(WebRequest511); // cached, not call interceptor
      expect(seq).toEqual([]);
      expect(r1_ref).toBe(r1);

      // make some changes to the interceptor
      const r1_new = domain.construct(WebRequest511, [], true); // cached, not call interceptor
      expect(seq).toEqual(r1_seq_updated);
      expect(r1_new).not.toBe(r1);

      // new domain
      class Domain2 extends InMemoryDomain {}
      const domain2 = new Domain2();

      seq = [];
      const r3 = domain2.construct(WebRequest511);
      expect(r3).toBeInstanceOf(WebRequest511);
      expect(seq).toEqual(r1_seq_updated);

      seq = [];
      const r4 = domain2.construct(WebRequest511, [], true);
      expect(r4).toBeInstanceOf(WebRequest511);
      expect(r3).not.toBe(r4);
      expect(seq).toEqual(r1_seq_updated);
    });
  });
});
