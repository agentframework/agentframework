import { agent } from '../../../src/dependencies/domain';
import { InMemoryDomain } from '../../../src/dependencies/domain';

describe('5.5. Domain resolve', () => {
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
      return <any>new Promise((resolve, reject) => {
        resolve({});
      });
    }
  }

  class E {
    constructor() {
      return <any>new Promise((resolve, reject) => {
        reject(new Error('not ok'));
      });
    }
  }

  describe('# should able to', () => {
    it('resolve type', async () => {
      const domain = new InMemoryDomain();
      const c1 = await domain.resolve(C);
      const c = domain.getAgent(C)!;

      expect(c1).toBeInstanceOf(C);
      expect(c1).toBe(c);
      const c2 = await domain.resolve(C);
      expect(c2).toBeInstanceOf(C);
      expect(c2).toBe(c);
      expect(c1).toBe(c2);
      domain.dispose();
    });

    it('resolve transit type', async () => {
      const domain = new InMemoryDomain();

      const c1 = await domain.resolve(C);
      expect(c1).toBeInstanceOf(C);

      const c = domain.getAgent(C)!;
      expect(c1).toBe(c);

      const c2 = await domain.resolve(C, undefined, true);
      expect(c2).toBeInstanceOf(C);
      expect(c2).not.toBe(c);

      const c3 = await domain.resolve(C, undefined, true);
      expect(c3).toBeInstanceOf(C);

      expect(c3).not.toBe(c);
      expect(c3).not.toBe(c2);

      domain.dispose();
    });

    it('resolve Promise', async () => {
      const domain = new InMemoryDomain();
      const p1 = await domain.resolve(P);
      const p2 = await domain.resolve(P);
      expect(p1).toBeDefined();
      expect(p2).toBe(p1);
    });

    it('resolve Promise with error', async () => {
      const domain = new InMemoryDomain();
      await expectAsync(domain.resolve(E)).toBeRejectedWithError('not ok');
      await expectAsync(domain.resolve(E)).toBeRejectedWithError('not ok');
    });

    it('resolve transit Promise', async () => {
      const domain = new InMemoryDomain();
      const ps = await Promise.all([domain.resolve(P, undefined, true), domain.resolve(P, undefined, true)]);
      expect(ps.length).toBe(2);
      expect(ps[0]).not.toBe(ps[1]);
    });

    it('resolve transit Promise with error', async () => {
      const domain = new InMemoryDomain();
      await expectAsync(domain.resolve(E, undefined, true)).toBeRejectedWithError('not ok');
      await expectAsync(domain.resolve(E, undefined, true)).toBeRejectedWithError('not ok');
      domain.dispose();
    });

    it('resolve pending agent', () => {
      return new Promise(async (done: Function) => {
        class Async {
          constructor() {
            return <any>new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve({});
              }, 0);
            });
          }
        }

        class Pending {
          constructor() {
            return <any>new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve({
                  dispose() {
                    done();
                  },
                });
              }, 0);
            });
          }
        }
        const domain = new InMemoryDomain();
        await expectAsync(domain.resolve(Async)).toBeResolved();
        await expectAsync(domain.resolve(Pending)).toBeResolved();
        domain.dispose();
      });
    });

    it('resolve Observable', async () => {
      const domain = new InMemoryDomain();
      await expectAsync(domain.resolve(R)).toBeRejectedWithError('NotSupportResolveObservableObject');
    });

    it('construct agent', () => {
      const domain = new InMemoryDomain();
      expect(() => {
        domain.construct(D);
      }).toThrowError('NotSupportCreateAgentForOtherDomain');
    });

    it('resolve slow promise', async () => {
      const domain = new InMemoryDomain();
      await expectAsync(domain.resolve(R)).toBeRejectedWithError('NotSupportResolveObservableObject');
    });
  });
});
