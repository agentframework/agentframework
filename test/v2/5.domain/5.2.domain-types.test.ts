import { InMemoryDomain, InMemorySubDomain } from '../../../packages/dependencies/domain';
import { agent } from '../../../packages/dependencies/domain';

describe('5.2. Domain type', () => {
  class A {}

  @agent()
  class B extends A {}

  class C extends B {}

  class D {}

  describe('# should able to', () => {
    it('add type', () => {
      const domain = new InMemoryDomain();
      domain.addType(A);
      domain.addType(B);
      domain.addType(C);
      domain.addType(A);
      domain.addType(B);
      domain.addType(C);
      expect(domain.getType(A)).toBe(A);
      expect(domain.getType(B)).toBe(B);
      expect(domain.getType(C)).toBe(C);
    });

    it('set type', () => {
      const domain = new InMemoryDomain();
      domain.addType(A);
      domain.addType(B);
      domain.addType(C);
      expect(domain.getType(A)).toBe(A);
      expect(domain.getType(B)).toBe(B);
      expect(domain.getType(C)).toBe(C);
      domain.setType(A, C);
      domain.setType(B, C);
      domain.setType(C, C);
      expect(domain.getType(A)).toBe(C);
      expect(domain.getType(B)).toBe(C);
      expect(domain.getType(C)).toBe(C);
    });

    it('remove type', () => {
      const domain = new InMemoryDomain();
      domain.removeType(A);
      domain.removeType(B);
      domain.removeType(C);
      domain.addType(C);
      expect(domain.getType(A)).toBe(C);
      expect(domain.getType(B)).toBe(C);
      expect(domain.getType(C)).toBe(C);
      domain.removeType(A);
      domain.removeType(B);
      domain.removeType(C);
      expect(domain.getType(A)).toBeUndefined();
      expect(domain.getType(B)).toBeUndefined();
      expect(domain.getType(C)).toBeUndefined();
    });

    it('has type', () => {
      const domain = new InMemoryDomain();
      domain.addType(C);
      expect(domain.getType(A)).toBe(C);
      expect(domain.getType(B)).toBe(C);
      expect(domain.getType(C)).toBe(C);
    });

    it('get type', () => {
      const domain = new InMemoryDomain();
      domain.addType(A);
      domain.addType(B);
      domain.addType(C);
      expect(domain.getType(A)).toBe(A);
      expect(domain.getType(B)).toBe(B);
      expect(domain.getType(C)).toBe(C);
    });

    it('get type from subdomain', () => {
      const domain = new InMemoryDomain();
      const sd = domain.construct(InMemorySubDomain);
      domain.addType(A);
      domain.addType(B);
      sd.addType(C);
      domain.addType(D);
      expect(domain.getType(A)).toBe(A);
      expect(sd.getOwnType(B)).toBe(C);
      expect(domain.getType(B)).toBe(B);
      expect(domain.getType(C)).toBeUndefined();
      expect(sd.getType(A)).toBe(C);
      expect(sd.getType(B)).toBe(C);
      expect(sd.getType(C)).toBe(C);
      expect(sd.getType(D)).toBe(D);
    });

    // it('get type or throw', () => {
    //   const domain = new InMemoryDomain();
    //   domain.addType(B);
    //   expect(domain.getTypeOrThrow(A)).toBe(B);
    //   expect(domain.getTypeOrThrow(B)).toBe(B);
    //   expect(() => {
    //     domain.getTypeOrThrow(C);
    //   }).toThrowError(TypeNotFoundError, 'TypeNotFound: C');
    // });
  });

  describe('# should not able to', () => {
    it('add type', () => {
      const domain = new InMemoryDomain();
      const a: any = new A();
      domain.addType(a);
      expect(domain.getType(a)).toBeTruthy();
    });
  });
});
