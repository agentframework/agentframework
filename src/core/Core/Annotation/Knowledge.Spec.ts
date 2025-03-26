import { Knowledge } from './Knowledge';
import { METADATA } from '../WellKnown';

describe('Knowledge!', () => {
  describe('# should able to', () => {
    it('get static class property from wisdom type', () => {
      const knowledge = new Knowledge(Reflect, METADATA);

      class A {}

      class B extends A {}

      class C extends B {}

      const tc: any = knowledge.add(C).prototype;
      tc.ccc = <any>1;
      const tb: any = knowledge.add(B).prototype;
      tb.bbb = <any>2;
      const ta: any = knowledge.add(A).prototype;
      ta.aaa = <any>3;
      const t: any = knowledge.add(Function.prototype).prototype;
      t.ooo = <any>4;

      expect(Reflect.getPrototypeOf(t)).toBeNull();

      expect(tc.ccc).toBe(<any>1);
      expect(tc.bbb).toBe(<any>2);
      expect(tc.aaa).toBe(<any>3);
      expect(tc.ooo).toBe(<any>4);

      expect(tb.ccc).toBeUndefined();
      expect(tb.bbb).toBe(<any>2);
      expect(tb.aaa).toBe(<any>3);
      expect(tb.ooo).toBe(<any>4);

      expect(ta.ccc).toBeUndefined();
      expect(ta.bbb).toBeUndefined();
      expect(ta.aaa).toBe(<any>3);
      expect(ta.ooo).toBe(<any>4);

      expect(t.ccc).toBeUndefined();
      expect(t.bbb).toBeUndefined();
      expect(t.aaa).toBeUndefined();
      expect(t.ooo).toBe(<any>4);
    });

    it('get class property from wisdom type', () => {
      const knowledge = new Knowledge(Reflect, METADATA);

      class A {}

      class B extends A {}

      class C extends B {}

      const tc: any = knowledge.add(C.prototype).prototype;
      tc.ccc = <any>1;
      const tb: any = knowledge.add(B.prototype).prototype;
      tb.bbb = <any>2;
      const ta: any = knowledge.add(A.prototype).prototype;
      ta.aaa = <any>3;
      const t: any = knowledge.add(Object.prototype).prototype;
      t.ooo = <any>4;

      expect(Reflect.getPrototypeOf(t)).toBeNull();

      expect(tc.ccc).toBe(<any>1);
      expect(tc.bbb).toBe(<any>2);
      expect(tc.aaa).toBe(<any>3);
      expect(tc.ooo).toBe(<any>4);

      expect(tb.ccc).toBeUndefined();
      expect(tb.bbb).toBe(<any>2);
      expect(tb.aaa).toBe(<any>3);
      expect(tb.ooo).toBe(<any>4);

      expect(ta.ccc).toBeUndefined();
      expect(ta.bbb).toBeUndefined();
      expect(ta.aaa).toBe(<any>3);
      expect(ta.ooo).toBe(<any>4);

      expect(t.ccc).toBeUndefined();
      expect(t.bbb).toBeUndefined();
      expect(t.aaa).toBeUndefined();
      expect(t.ooo).toBe(<any>4);
    });
  });
});
