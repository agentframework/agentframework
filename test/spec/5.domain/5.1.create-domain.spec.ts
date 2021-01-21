import { InMemoryDomain, Domain, IsDomain, InMemorySubDomain } from '../../../lib';

describe('5.1. Create domain', () => {
  describe('# should able to', () => {
    it('create domain', () => {
      const domain = new InMemoryDomain();
      expect(domain).toBeInstanceOf(Domain);
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
      expect(subdomain).toBeInstanceOf(Domain);
      expect(subdomain.name).toBe('InMemoryDomain__InMemorySubDomain$');
      expect(IsDomain(subdomain)).toBeTrue();
      expect(subdomain.disposed).toBeFalsy();
      subdomain.dispose();
      expect(subdomain.disposed).toBeTrue();
      subdomain.dispose();
      expect(subdomain.disposed).toBeTrue();
    });
  });
});
