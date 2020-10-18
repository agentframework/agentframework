import { extensible } from '../../../lib';

describe('6.7. @extensible decorator', () => {
  describe('# should able to', () => {
    it('create extensible class', () => {
      @extensible()
      class NoUser {
        id: number = 1;
      }

      expect(NoUser).toBeDefined();
      const u = new NoUser();
      expect(u).toBeInstanceOf(NoUser);
      expect(u.id).toBe(1);
    });

    it('create extensible class', () => {
      @extensible()
      class NoUser {
        id: number = 2;
      }

      expect(NoUser).toBeDefined();
      const u = new NoUser();
      expect(u).toBeInstanceOf(NoUser);
      expect(u.id).toBe(1);
    });
  });
});
