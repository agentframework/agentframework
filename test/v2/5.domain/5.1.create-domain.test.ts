import {InMemoryDomain, IsDomain, InMemorySubDomain, GetSystemDomain} from '../../../packages/dependencies/domain';


describe('5.1. Create domain', () => {
  describe('# should able to', () => {
    it('create domain', () => {
      const domain = new InMemoryDomain();
      expect(IsDomain(domain)).toBeTruthy();
      expect(domain.constructor.name).toBe('InMemoryDomain');
      expect(domain.name).toBe('InMemoryDomain');
      expect(IsDomain(domain)).toBeTrue();
      expect(domain.disposed).toBeFalsy();
      domain.dispose();
      expect(domain.disposed).toBeTrue();
      domain.dispose();
      expect(domain.disposed).toBeTrue();
    });

    it('create domain', () => {
      const domain = new InMemoryDomain();
      const subdomain = domain.construct(InMemorySubDomain);
      expect(IsDomain(subdomain)).toBeTrue();
      expect(subdomain.constructor.name).toBe('InMemorySubDomain$');
      expect(subdomain.name).toBe('InMemorySubDomain$');
      expect(IsDomain(subdomain)).toBeTrue();
      expect(subdomain.disposed).toBeFalsy();
      subdomain.dispose();
      expect(subdomain.disposed).toBeTrue();
      subdomain.dispose();
      expect(subdomain.disposed).toBeTrue();
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
