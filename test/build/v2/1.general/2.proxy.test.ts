describe('Proxy', () => {
  describe('# should able to', () => {
    it('create proxy in between', () => {
      class Base {}
      class Middle extends Base {}
      const Proxy1 = new Proxy(Middle, {});
      const Proxy2 = new Proxy(Middle, {});
      class End extends Proxy1 {}

      expect(Proxy1.prototype).toBe(Middle.prototype); //
      expect(Proxy1.prototype).toBe(Proxy2.prototype); //
      expect(Proxy1).not.toBe(Proxy2);
      expect(Proxy1).not.toBe(Middle);
      expect(Proxy2).not.toBe(Middle);

      // can not use constructor to lookup
      expect(Reflect.getPrototypeOf(End)).toBe(Proxy1);
      expect(Reflect.getPrototypeOf(Proxy1)).toBe(Base);
      expect(Reflect.getPrototypeOf(Middle)).toBe(Base);
      expect(Reflect.getPrototypeOf(Base)).toBe(Function.prototype);

      // can use prototype to lookup
      expect(Reflect.getPrototypeOf(End.prototype)).toBe(Middle.prototype);
      expect(Reflect.getPrototypeOf(Proxy1.prototype)).toBe(Base.prototype);
      expect(Reflect.getPrototypeOf(Middle.prototype)).toBe(Base.prototype);
      expect(Reflect.getPrototypeOf(Base.prototype)).toBe(Object.prototype);

      expect(new Middle().constructor).toBe(new Proxy1().constructor);
      expect(new Proxy1().constructor).toBe(new Proxy2().constructor);
      expect(new Proxy1()).toBeInstanceOf(Middle);
      expect(new Proxy2()).toBeInstanceOf(Middle);
    });
  });
});
