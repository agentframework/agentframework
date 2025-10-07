import { InMemoryDomain, IsDomain, InMemorySubDomain, GetSystemDomain } from '../../../packages/dependencies/domain';

describe('5.1. Create domain', () => {
  describe('# should able to', () => {
    it('create domain', () => {
      const domain = new InMemoryDomain();
      expect(IsDomain(domain)).toBeTruthy();
      expect(domain.constructor.name).toBe('InMemoryDomain');
      expect(domain.name).toBe('InMemoryDomain');
      expect(IsDomain(domain)).toBe(true);
      expect(domain.disposed).toBeFalsy();
      domain.dispose();
      expect(domain.disposed).toBe(true);
      domain.dispose();
      expect(domain.disposed).toBe(true);
    });

    it('create domain', () => {
      const domain = new InMemoryDomain();
      const subdomain = domain.resolve(InMemorySubDomain);
      expect(IsDomain(subdomain)).toBe(true);
      expect(subdomain.constructor.name).toBe('InMemorySubDomain$');
      expect(subdomain.name).toBe('InMemorySubDomain$');
      expect(IsDomain(subdomain)).toBe(true);
      expect(subdomain.disposed).toBeFalsy();
      subdomain.dispose();
      expect(subdomain.disposed).toBe(true);
      subdomain.dispose();
      expect(subdomain.disposed).toBe(true);
    });

    it('create sub domain', () => {
      const domain1 = new InMemorySubDomain();
      const domain2 = new InMemorySubDomain();
      expect(domain1.parent).toBe(domain2.parent);
    });

    it('create sub domain', () => {
      const domain1 = new InMemorySubDomain();
      expect(domain1.parent).toBe(GetSystemDomain());
    });
  });
});
