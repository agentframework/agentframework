import { Remember, remember } from '../../../lib/dependencies/agent';

describe('6.6. @remember helper', () => {
  describe('# should able to', () => {
    let n = 1;
    class Class661 {
      @remember('Test') // no effect because no @agent()
      static get random() {
        return n++;
      }
      static get stats() {
        return Remember('Test', this, 'stats', () => n++);
      }
    }

    class Class662 {
      @remember('Test')// no effect because no @agent()
      static get random() {
        return n++;
      }
      static get stats() {
        return Remember('Test', this, 'stats', () => n++);
      }
    }

    it('get same value', () => {
      expect(Class661.random).not.toBe(Class661.random);
      expect(Class661.stats).toBe(Class661.stats);
    });

    it('get same value from different class', () => {
      expect(Class662.random).not.toBe(Class661.random);
      expect(Class662.stats).toBe(Class661.stats);
    });
  });
});
