import { InMemoryDomain, GetDomain, InMemorySubDomain } from '../../../packages/dependencies/domain';
import { agent } from '../../../packages/dependencies/domain';

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
    // it('find domain agent', () => {
    //   expect(FindDomain(C)).toBeDefined();
    // });

    it('get domain agent', () => {
      expect(GetDomain(C)).toBeDefined();
    });

    // it('find same domain agent', () => {
    //   expect(GetDomain(C)).toBe(FindDomain(B));
    // });

    // it('find not domain agent', () => {
    //   expect(FindDomain(D)).toBe(GetDomain(B));
    // });

    it('get not domain agent', () => {
      expect(GetDomain(D)).toBeUndefined();
    });

    // it('find same domain agent', () => {
    //   const domain = new InMemoryDomain();
    //   const subdomain = domain.construct(InMemorySubDomain);
    //   expect(FindDomain(subdomain)).toBe(subdomain);
    //   expect(FindDomain(subdomain.constructor)).toBe(domain);
    // });

    it('add agent', () => {
      const domain = new InMemoryDomain();
      domain.addAgent(A, new A());
      domain.addAgent(C, new B());
      domain.addAgent(C, new C());
      domain.addAgent(D, new D());
      expect(domain.getAgent(A)).toBeInstanceOf(A);
      expect(domain.getAgent(B)).toBeInstanceOf(B);
      expect(domain.getAgent(C)).toBeInstanceOf(B);
      expect(domain.getAgent(D)).toBeInstanceOf(C);
      domain.dispose();
    });

    it('add explicit agent', () => {
      const domain = new InMemoryDomain();
      domain.setAgent(B, new B());
      expect(domain.getAgent(A)).toBeUndefined();
      expect(domain.getAgent(B)).toBeInstanceOf(B);
      domain.dispose();
    });

    it('set agent', () => {
      const domain = new InMemoryDomain();
      domain.setAgent(A, new B());
      expect(domain.getAgent(A)).toBeInstanceOf(B);
      domain.dispose();
    });

    it('remove agent', () => {
      const domain = new InMemoryDomain();
      const agent = new B();
      domain.addAgent(B, agent);
      domain.removeAgent(A, agent);
      expect(domain.getAgent(A)).toBeUndefined();
      expect(domain.getAgent(B)).toBeInstanceOf(B);
      agent.dispose();
      domain.dispose();
    });

    it('remove non-existing agent', () => {
      const domain = new InMemoryDomain();
      const agent = new B();
      domain.addAgent(B, agent);
      domain.removeAgent(A, new A());
      expect(domain.getAgent(A)).toBeInstanceOf(B);
      expect(domain.getAgent(B)).toBeInstanceOf(B);
      domain.dispose();
    });

    it('has agent', () => {
      const domain = new InMemoryDomain();
      const agent = new B();
      domain.addAgent(B, agent);
      expect(domain.getAgent(A)).toBe(agent);
      expect(domain.getAgent(B)).toBe(agent);
      expect(domain.getAgent(C)).toBeUndefined();
      domain.dispose();
    });

    it('get agent', () => {
      const domain = new InMemoryDomain();
      const agent = new B();
      domain.addAgent(B, agent);
      expect(domain.getAgent(A)).toBeInstanceOf(B);
      expect(domain.getAgent(B)).toBeInstanceOf(B);
      expect(domain.getAgent(C)).toBeUndefined();
      domain.dispose();
    });

    it('get agent from subdomain', () => {
      const domain = new InMemoryDomain();
      const sd = domain.construct(InMemorySubDomain);
      const agent = new B();
      domain.addAgent(B, agent);
      expect(sd.getOwnAgent(B)).toBeUndefined();
      expect(domain.getAgent(A)).toBeInstanceOf(B);
      expect(domain.getAgent(B)).toBeInstanceOf(B);
      expect(domain.getAgent(C)).toBeUndefined();
      expect(sd.getAgent(A)).toBeInstanceOf(B);
      expect(sd.getAgent(B)).toBeInstanceOf(B);
      expect(sd.getAgent(C)).toBeUndefined();
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
