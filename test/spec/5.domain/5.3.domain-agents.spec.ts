import { InMemoryDomain, agent, FindDomain, AgentNotFoundError } from '../../../lib';

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
      domain.addAgent(B, new B(), true);
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
      expect(domain.hasAgent(A)).toBeTrue();
      expect(domain.hasAgent(B)).toBeTrue();
      expect(domain.hasAgent(C)).toBeFalse();
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

    it('get agent or throw', () => {
      const domain = new InMemoryDomain();
      const agent = new B();
      domain.addAgent(B, agent);
      expect(domain.getAgentOrThrow(A)).toBeInstanceOf(B);
      expect(domain.getAgentOrThrow(B)).toBeInstanceOf(B);
      expect(() => {
        domain.getAgentOrThrow(C);
      }).toThrowError(AgentNotFoundError, 'Agent InMemoryDomain__C$ not found');
      expect(() => {
        domain.getAgentOrThrow(D);
      }).toThrowError('Agent D not found');
      domain.dispose();
    });
  });
});
