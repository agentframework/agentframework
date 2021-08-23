import { InMemoryDomain } from '../../../src/dependencies/domain';

describe('5.6. Domain instance', () => {
  const domain = new InMemoryDomain();

  describe('# should able to', () => {
    it('add instance', () => {
      domain.addAgent('VERSION', 1);
    });

    it('get instance', () => {
      expect(domain.getAgent('VERSION')).toBe(1);
    });

    it('remove instance', () => {
      domain.removeAgent('VERSION', 1);
    });
  });

  describe('# should not able to', () => {
    it('get removed instance', () => {
      expect(domain.getAgent('VERSION')).toBeUndefined();
    });
  });
});
