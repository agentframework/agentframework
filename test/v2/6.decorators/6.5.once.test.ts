import { Once, once } from '../../../src/dependencies/agent';

describe('6.5. @once helper', () => {
  describe('# should able to', () => {
    class Class651 {
      @once()
      static get random() {
        return Date.now();
      }
      static get stats() {
        return Once(this, 'stats', Date.now());
      }
    }

    class Class652 {
      static counter = 0;

      @once()
      static get random() {
        if (this.counter > 0) {
          return Date.now() + 1;
        }
        this.counter++;
        return;
      }

      static get stats() {
        return Once(this, 'stats', this.random);
      }
    }

    it('get same value', () => {
      expect(Class651.random).toBe(Class651.random);
      expect(Class651.stats).toBe(Class651.stats);
    });

    it('get same value from different class', () => {
      expect(Class652.random).not.toBe(Class651.random);
      expect(Class652.stats).not.toBe(Class651.stats);
    });
  });
});
