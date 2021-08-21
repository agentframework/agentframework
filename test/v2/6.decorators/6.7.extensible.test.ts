import { exclusive } from '../../../src/dependencies/core';

describe('6.7. @extensible decorator', () => {
  describe('# should able to', () => {
    it('create extensible class 1', () => {
      @exclusive()
      class NoUser {
        id: number = 1;
      }

      expect(NoUser).toBeDefined();
      const u = new NoUser();
      expect(u).toBeInstanceOf(NoUser);
      expect(u.id).toBe(1);
    });

    it('create extensible class 2', () => {
      @exclusive()
      class NoUser {
        id: number = 2;
      }

      expect(NoUser).toBeDefined();
      const u = new NoUser();
      expect(u).toBeInstanceOf(NoUser);
      expect(u.id).toBe(1);
    });

    it('create extensible class 1', () => {
      @exclusive('test')
      class NoUser {
        id: number = 3;
      }

      expect(NoUser).toBeDefined();
      const u = new NoUser();
      expect(u).toBeInstanceOf(NoUser);
      expect(u.id).toBe(3);
    });

    it('create extensible class 2', () => {
      @exclusive('test')
      class NoUser {
        id: number = 4;
      }

      expect(NoUser).toBeDefined();
      const u = new NoUser();
      expect(u).toBeInstanceOf(NoUser);
      expect(u.id).toBe(3);
    });
  });
});
