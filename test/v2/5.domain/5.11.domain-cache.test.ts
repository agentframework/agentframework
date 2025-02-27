import {InMemoryDomain} from '../../../src/dependencies/domain';
import {Arguments, decorateClass, Design, Invocation} from '../../../src/dependencies/agent';

describe('5.11. Domain agent cache', () => {
  describe('# should able to', () => {
    it('cache domain agent in same domain', () => {
      let seq: string[] = [];

      const domain1 = new InMemoryDomain();
      const domain2 = new InMemoryDomain();

      @decorateClass({
        get interceptor() {
          return {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeWebRequest1');
              const ret = target.invoke(params, receiver);
              seq.push('afterWebRequest1');
              return ret;
            }
          }
        }
      })
      class WebRequest511 {
        /* [original code] */
      }

      class WebResponse511 extends WebRequest511 {
        /* [extended code] */
      }

      const proto = Reflect.getPrototypeOf(WebRequest511);
      expect(proto).toBeDefined();
      if (proto) {
        expect(proto.toString()).toEqual(`function () { [native code] }`);
      }
      expect(seq).toEqual([]);
      const r1 = domain1.construct(WebRequest511);
      expect(seq).toEqual(['beforeWebRequest1', 'afterWebRequest1']);
      const r2 = domain1.construct(WebRequest511);
      expect(seq).toEqual(['beforeWebRequest1', 'afterWebRequest1']);
      const r3 = domain1.construct(WebRequest511, [], true);
      expect(seq).toEqual(['beforeWebRequest1', 'afterWebRequest1', 'beforeWebRequest1', 'afterWebRequest1']);
      const r4 = domain1.construct(WebRequest511, [], true);
      expect(seq).toEqual(['beforeWebRequest1', 'afterWebRequest1', 'beforeWebRequest1', 'afterWebRequest1', 'beforeWebRequest1', 'afterWebRequest1']);

      // validate type
      expect(r1).toBeInstanceOf(WebRequest511);
      expect(r2).toBeInstanceOf(WebRequest511);
      expect(r3).toBeInstanceOf(WebRequest511);
      expect(r4).toBeInstanceOf(WebRequest511);

      // validate instance
      expect(typeof r1).toEqual('object');
      expect(typeof r2).toEqual('object');
      expect(typeof r3).toEqual('object');
      expect(typeof r4).toEqual('object');

      // validate instance
      expect(r1).toBe(r2);
      expect(r1).not.toBe(r3);
      expect(r1).not.toBe(r4);
      expect(r3).not.toBe(r4);

      const d2r1 = domain2.construct(WebRequest511);
      expect(d2r1).not.toBe(r1);
      expect(d2r1).toBeInstanceOf(WebRequest511);

      const d2r2 = domain2.construct(WebResponse511);
      expect(d2r2).toBeInstanceOf(WebRequest511);
      expect(d2r2).toBeInstanceOf(WebResponse511);

      // Object got constructor
      // Class got prototype

      // validate inherit
      expect(r1.constructor.toString()).toEqual('class WebRequest511$ extends WebRequest511 { /* [generated code] */ }');
      expect(Reflect.getPrototypeOf(r1)).toEqual(WebRequest511.prototype);
      expect(Reflect.getPrototypeOf(r2)).toEqual(WebRequest511.prototype);

    });

    // it('cache domain agent in same domain', ()=>{
    //   let seq: string[] = [];
    //
    //   const domain = new InMemoryDomain();
    //
    //   @decorateClass({
    //     interceptor: {
    //       intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
    //         seq.push('beforeWebRequest1');
    //         const ret = target.invoke(params, receiver);
    //         seq.push('afterWebRequest1');
    //         return ret;
    //       },
    //     },
    //   })
    //   class WebRequest512 {}
    //
    //   const r1 = domain.construct(WebRequest512);
    //
    //   Reflector(WebRequest512).addAttribute({
    //     interceptor: {
    //       intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
    //         seq.push('beforeWebRequest2');
    //         const ret = target.invoke(params, receiver);
    //         seq.push('afterWebRequest2');
    //         return ret;
    //       },
    //     },
    //   });
    //
    //   const r1_seq_updated = [
    //     'beforeWebRequest2',
    //     'beforeWebRequest1',
    //     'afterWebRequest1',
    //     'afterWebRequest2'
    //   ];
    //
    //   // make some changes to the interceptor
    //   seq = [];
    //   const r1_ref = domain.construct(WebRequest512); // cached, not call interceptor
    //   expect(seq).toEqual([]);
    //   expect(r1_ref).toBe(r1);
    //
    //   // make some changes to the interceptor
    //   const r1_new = domain.construct(WebRequest512, [], true); // cached, not call interceptor
    //   expect(seq).toEqual(r1_seq_updated);
    //   expect(r1_new).not.toBe(r1);
    //
    //   // new domain
    //   class Domain2 extends InMemoryDomain {}
    //   const domain2 = new Domain2();
    //
    //   seq = [];
    //   const r3 = domain2.construct(WebRequest512);
    //   expect(r3).toBeInstanceOf(WebRequest512);
    //   expect(seq).toEqual(r1_seq_updated);
    //
    //   seq = [];
    //   const r4 = domain2.construct(WebRequest512, [], true);
    //   expect(r4).toBeInstanceOf(WebRequest512);
    //   expect(r3).not.toBe(r4);
    //   expect(seq).toEqual(r1_seq_updated);
    // })
  });
});
