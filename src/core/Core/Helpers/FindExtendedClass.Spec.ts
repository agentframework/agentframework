import { FindExtendedClass } from './FindExtendedClass';

describe('FindExtendedClass', () => {
  class Base {}
  class Middle extends Base {}
  class End extends Middle {}
  class Some {}

  const ProxyBase = new Proxy(Base, {});
  class ProxyMiddle extends ProxyBase {}
  class ProxyEnd extends ProxyMiddle {}

  describe('# should able to', () => {
    it('get 2 class', () => {
      const found = FindExtendedClass(Base, End);
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(2);
      expect(found[0]).toBe(Middle);
      expect(found[1]).toBe(End);
    });

    it('get 0 class', () => {
      const found = FindExtendedClass(Base, ProxyBase);
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(0);
    });
    it('get 1 class', () => {
      const found = FindExtendedClass(Base, ProxyMiddle);
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(1);
      expect(found[0]).toBe(ProxyMiddle);
    });

    it('get 2 class', () => {
      const found = FindExtendedClass(Base, ProxyEnd);
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(2);
      expect(found[0]).toBe(ProxyMiddle);
      expect(found[1]).toBe(ProxyEnd);
    });
  });

  describe('# should not able to', () => {
    it('get 2 class', () => {
      const found = FindExtendedClass(End, Base);
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(0);
    });

    it('get any class between two class', () => {
      const found = FindExtendedClass(Some, End);
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(0);
    });
    it('get hacked class', () => {
      const Hacked = new Proxy(End.prototype, {
        getPrototypeOf(target: any): object | null {
          return target;
        },
      });
      const found = FindExtendedClass(Base, <Function>{ prototype: Hacked });
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(3);
      expect(found[0]).toBe(Middle);
      expect(found[1].toString()).toBe(End.toString()); // this is Proxy
      expect(found[2]).toBe(End);
    });
  });
});
