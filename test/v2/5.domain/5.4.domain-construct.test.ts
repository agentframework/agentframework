import { InMemoryDomain } from '../../../src/dependencies/domain';
import { agent } from '../../../src/domain';

describe('5.4. Domain construct', () => {
  class A {}

  class B extends A {
    disposed: boolean | undefined;
    dispose() {
      this.disposed = true;
    }
  }

  class C extends B {}

  @agent()
  class D extends C {}

  class R {
    constructor() {
      return <any>{
        lift() {},
        subscribe() {},
      };
    }
  }

  class P {
    constructor() {
      return <any>new Promise((resolve, reject) => {});
    }
  }

  describe('# should able to', () => {
    it('construct agent', () => {
      const domain = new InMemoryDomain();
      const c = domain.construct(C);
      expect(c).toBeInstanceOf(C);
      const c1 = domain.construct(C);
      expect(c).toBe(c1);
      domain.dispose();
    });

    it('construct domain and agent', () => {
      const root = new InMemoryDomain();
      const domain = root.construct(InMemoryDomain);
      const c = domain.construct(C);
      expect(c).toBeInstanceOf(C);
      const c1 = domain.construct(C);
      expect(c).toBe(c1);
      domain.dispose();
    });

    // it('construct type using helper function', () => {
    //   const domain = new InMemoryDomain();
    //   const c = construct(domain, C);
    //   expect(c).toBeInstanceOf(C);
    //   const c1 = construct(c, C);
    //   expect(c).toBe(c1);
    //   const d = new D();
    //   const d1 = construct(d, C);
    //   expect(d1).not.toBe(c1);
    //   expect(() => {
    //     construct(new A(), C);
    //   }).toThrowError('Domain not found');
    //   domain.dispose();
    // });

    it('construct transit type', () => {
      const domain = new InMemoryDomain();
      const c = domain.construct(C);
      expect(c).toBeInstanceOf(C);
      const c1 = domain.construct(C, undefined, true);
      expect(c).not.toBe(c1);
      const c2 = domain.construct(C, undefined, true);
      expect(c).not.toBe(c2);
      expect(c1).not.toBe(c2);
      domain.dispose();
    });

    it('construct Promise', () => {
      const domain = new InMemoryDomain();
      expect(() => {
        domain.construct(R);
      }).toThrowError('NotAllowConstructObservableObject');
    });

    it('construct Promise', () => {
      const domain = new InMemoryDomain();
      expect(() => {
        domain.construct(P);
      }).toThrowError('NotAllowConstructPromiseObject');
    });

    it('construct agent', () => {
      const domain = new InMemoryDomain();
      expect(() => {
        domain.construct(D);
      }).toThrowError('NotSupportCreateAgentForOtherDomain');
    });
  });
});
