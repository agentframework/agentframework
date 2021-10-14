import { Wisdom } from './Wisdom';

describe('Wisdom!', () => {
  describe('# should able to', () => {
    it('get identity', () => {
      const WisdomStatic: any = Wisdom;
      expect(WisdomStatic.id).toBeInstanceOf(String);
      expect(WisdomStatic.version).toBeInstanceOf(String);
      expect(WisdomStatic.timestamp).toBeInstanceOf(String);
      // console.log('Wisdom', Wisdom);
      // const name = WisdomStatic.id + '@' + WisdomStatic.version;
      // expect(Wisdom[Symbol.for('Deno.symbols.customInspect')]()).toBe(name);
      // expect(Wisdom[Symbol.for('nodejs.util.inspect.custom')]()).toBe(name);
    });

    it('get static class property from wisdom type', () => {
      class A {}
      class B extends A {}
      class C extends B {}

      const tc: any = Wisdom.add(C);
      tc.ccc = <any>1;
      const tb: any = Wisdom.add(B);
      tb.bbb = <any>2;
      const ta: any = Wisdom.add(A);
      ta.aaa = <any>3;
      const t: any = Wisdom.add(Function.prototype);
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
      class A {}
      class B extends A {}
      class C extends B {}

      const tc: any = Wisdom.add(C.prototype);
      tc.ccc = <any>1;
      const tb: any = Wisdom.add(B.prototype);
      tb.bbb = <any>2;
      const ta: any = Wisdom.add(A.prototype);
      ta.aaa = <any>3;
      const t: any = Wisdom.add(Object.prototype);
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
