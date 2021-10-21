import { Remember, remember } from '../../../src/dependencies/agent';

describe('6.6. @remember helper', () => {
  describe('# should able to', () => {
    class Class661 {
      @remember('Test')
      static get random() {
        return Date.now();
      }
      static get stats() {
        return Remember('Test', this, 'stats', () => Date.now());
      }
    }

    class Class662 {
      @remember('Test')
      static get random() {
        return Date.now();
      }
      static get stats() {
        return Remember('Test', this, 'stats', () => Date.now());
      }
    }

    it('get same value', () => {
      expect(Class661.random).toBe(Class661.random);
      expect(Class661.stats).toBe(Class661.stats);
    });

    it('get same value from different class', () => {
      expect(Class662.random).toBe(Class661.random);
      expect(Class662.stats).toBe(Class661.stats);
    });
  });
});
