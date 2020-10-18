import { InMemoryDomain, Domain, IsDomain } from '../../../lib';

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
  });
});
