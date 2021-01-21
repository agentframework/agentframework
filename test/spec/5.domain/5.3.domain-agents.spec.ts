import { InMemoryDomain, agent, FindDomain, GetDomain, InMemorySubDomain } from '../../../lib';

describe('5.3. Domain agent', () => {
  class A {}

  @agent()
  class B extends A {
    disposed: boolean | undefined;
    dispose() {
      this.disposed = true;
    }
  }

  @agent()
  class C extends B {}

  class D extends C {}

  describe('# should able to', () => {
    it('find domain agent', () => {
      expect(FindDomain(B)).toBeDefined();
    });

    it('find domain agent', () => {
      expect(GetDomain(B)).toBeDefined();
    });

    it('add agent', () => {
      const domain = new InMemoryDomain();
      domain.addInstance(A, new A());
      domain.addInstance(C, new B());
      domain.addInstance(C, new C());
      domain.addInstance(D, new D());
      expect(domain.getInstance(A)).toBeInstanceOf(A);
      expect(domain.getInstance(B)).toBeInstanceOf(B);
      expect(domain.getInstance(C)).toBeInstanceOf(B);
      expect(domain.getInstance(D)).toBeInstanceOf(C);
      domain.dispose();
    });

    it('add explicit agent', () => {
      const domain = new InMemoryDomain();
      domain.addInstance(B, new B(), true);
      expect(domain.getInstance(A)).toBeUndefined();
      expect(domain.getInstance(B)).toBeInstanceOf(B);
      domain.dispose();
    });

    it('set agent', () => {
      const domain = new InMemoryDomain();
      domain.setInstance(A, new B());
      expect(domain.getInstance(A)).toBeInstanceOf(B);
      domain.dispose();
    });

    it('remove agent', () => {
      const domain = new InMemoryDomain();
      const agent = new B();
      domain.addInstance(B, agent);
      domain.removeInstance(A, agent);
      expect(domain.getInstance(A)).toBeUndefined();
      expect(domain.getInstance(B)).toBeInstanceOf(B);
      agent.dispose();
      domain.dispose();
    });

    it('remove non-existing agent', () => {
      const domain = new InMemoryDomain();
      const agent = new B();
      domain.addInstance(B, agent);
      domain.removeInstance(A, new A());
      expect(domain.getInstance(A)).toBeInstanceOf(B);
      expect(domain.getInstance(B)).toBeInstanceOf(B);
      domain.dispose();
    });

    it('has agent', () => {
      const domain = new InMemoryDomain();
      const agent = new B();
      domain.addInstance(B, agent);
      expect(domain.hasInstance(A)).toBeTrue();
      expect(domain.hasInstance(B)).toBeTrue();
      expect(domain.hasInstance(C)).toBeFalse();
      domain.dispose();
    });

    it('get agent', () => {
      const domain = new InMemoryDomain();
      const agent = new B();
      domain.addInstance(B, agent);
      expect(domain.getInstance(A)).toBeInstanceOf(B);
      expect(domain.getInstance(B)).toBeInstanceOf(B);
      expect(domain.getInstance(C)).toBeUndefined();
      domain.dispose();
    });

    it('get agent from subdomain', () => {
      const domain = new InMemoryDomain();
      const sd = domain.construct(InMemorySubDomain);
      const agent = new B();
      domain.addInstance(B, agent);
      expect(domain.getInstance(A)).toBeInstanceOf(B);
      expect(domain.getInstance(B)).toBeInstanceOf(B);
      expect(domain.getInstance(C)).toBeUndefined();
      expect(sd.getInstance(A)).toBeInstanceOf(B);
      expect(sd.getInstance(B)).toBeInstanceOf(B);
      expect(sd.getInstance(C)).toBeUndefined();
      domain.dispose();
    });

    // it('get agent or throw', () => {
    //   const domain = new InMemoryDomain();
    //   const agent = new B();
    //   domain.addInstance(B, agent);
    //   expect(domain.getInstanceOrThrow(A)).toBeInstanceOf(B);
    //   expect(domain.getInstanceOrThrow(B)).toBeInstanceOf(B);
    //   expect(() => {
    //     domain.getInstanceOrThrow(C);
    //   }).toThrowError(AgentNotFoundError, 'AgentNotFound: InMemoryDomain__C$');
    //   expect(() => {
    //     domain.getInstanceOrThrow(D);
    //   }).toThrowError('AgentNotFound: D');
    //   domain.dispose();
    // });
  });
});
