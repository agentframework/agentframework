import { FindExtendedClass } from '../../src/core/Core/Helpers/FindExtendedClass';

describe('FindExtendedClass', () => {
  class Base {}
  class Middle extends Base {}
  class End extends Middle {}
  class Some {}

  describe('# should able to', () => {
    it('get 2 class', () => {
      const found = FindExtendedClass(Base, End);
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(2);
    });
  });

  describe('# should not able to', () => {
    it('get any class', () => {
      const found = FindExtendedClass(Some, End);
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(0);
    });
    it('get hacked class', () => {
      const Hacked = new Proxy(End.prototype, {
        getPrototypeOf(target: any): object | null {
          return target;
        }
      });
      const found = FindExtendedClass(Base, <Function>{ prototype: Hacked });
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(3);
    });
  });
});
