class A91 {
  hello() {
    return 'hello'
  }
}

describe('9.1. create class', () => {
  describe('# should able', () => {
    it('create class using native code', () => {
      class B extends A91 {}
      const b = new B();
      expect(b instanceof A91).toBeTruthy();
      expect(b).toBeTruthy();
      expect(b.hello()).toBe('hello');
    });

    it('create class using eval', () => {
      const C = eval('(class C extends A91 {})');
      const c = new C();
      expect(c instanceof C).toBeTruthy();
      expect(c.hello()).toBe('hello');
      expect(C).toBeTruthy();
    });

    it('create class using Function', () => {
      const D = Function('A91', 'return class D extends A91 {}')(A91);
      const d = new D();
      expect(d instanceof D).toBeTruthy();
      expect(d.hello()).toBe('hello');
      expect(D).toBeTruthy();
    });

    it('create class using Reflect', () => {
      const E = new Function() as new () => A91;
      Reflect.setPrototypeOf(E, A91);
      Reflect.setPrototypeOf(E.prototype, A91.prototype);

      const e = new E();
      expect(e instanceof E).toBeTruthy();
      expect(e.hello()).toBe('hello');
      expect(E).toBeTruthy();
    });
  });
});
