import { Knowledge } from './Knowledge';

describe('Knowledge!', () => {
  describe('# should able to', () => {
    it('get identity', () => {
      const KnowledgeStatic: any = Knowledge;
      expect(KnowledgeStatic.id).toBeInstanceOf(String);
      expect(KnowledgeStatic.version).toBeInstanceOf(String);
      expect(KnowledgeStatic.timestamp).toBeInstanceOf(String);
      // console.log('Knowledge', Knowledge);
      // const name = KnowledgeStatic.id + '@' + KnowledgeStatic.version;
      // expect(Knowledge[Symbol.for('Deno.symbols.customInspect')]()).toBe(name);
      // expect(Knowledge[Symbol.for('nodejs.util.inspect.custom')]()).toBe(name);
    });

    it('get static class property from wisdom type', () => {
      class A {}
      class B extends A {}
      class C extends B {}

      const tc: any = Knowledge.add(C).prototype;
      tc.ccc = 1;
      const tb: any = Knowledge.add(B).prototype;
      tb.bbb = 2;
      const ta: any = Knowledge.add(A).prototype;
      ta.aaa = 3;
      const t: any = Knowledge.add(Function.prototype).prototype;
      t.ooo = 4;

      expect(Reflect.getPrototypeOf(t)).toBeNull();

      expect(tc.ccc).toBe(1);
      expect(tc.bbb).toBe(2);
      expect(tc.aaa).toBe(3);
      expect(tc.ooo).toBe(4);

      expect(tb.ccc).toBeUndefined();
      expect(tb.bbb).toBe(2);
      expect(tb.aaa).toBe(3);
      expect(tb.ooo).toBe(4);

      expect(ta.ccc).toBeUndefined();
      expect(ta.bbb).toBeUndefined();
      expect(ta.aaa).toBe(3);
      expect(ta.ooo).toBe(4);

      expect(t.ccc).toBeUndefined();
      expect(t.bbb).toBeUndefined();
      expect(t.aaa).toBeUndefined();
      expect(t.ooo).toBe(4);
    });

    it('get class property from wisdom type', () => {
      class A {}
      class B extends A {}
      class C extends B {}

      const tc: any = Knowledge.add(C.prototype).prototype;
      tc.ccc = <any>1;
      const tb: any = Knowledge.add(B.prototype).prototype;
      tb.bbb = <any>2;
      const ta: any = Knowledge.add(A.prototype).prototype;
      ta.aaa = <any>3;
      const t: any = Knowledge.add(Object.prototype).prototype;
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
