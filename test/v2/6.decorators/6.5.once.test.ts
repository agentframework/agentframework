import { once } from 'agentframework';
import { Once } from '../../../packages/agent/Agent/Helpers/Once';

describe('6.5. @once helper', () => {
  describe('# should able to', () => {
    let n = 0;

    class Class651 {
      @once() // require @agent
      static get random() {
        return n++;
      }

      static get stats() {
        return Once(this, 'stats', n++);
      }
    }

    class Class652 {
      @once()
      static get random() {
        return n++;
      }

      static get stats() {
        return Once(this, 'stats', this.random);
      }
    }

    it('get same value', () => {
      expect(Class651.random).not.toBe(Class651.random);
      expect(Class651.stats).toBe(Class651.stats);
    });

    it('get same value from different class', () => {
      expect(Class652.random).not.toBe(Class651.random);
      expect(Class652.random).not.toBe(Class652.random);
      expect(Class652.stats).not.toBe(Class651.stats);
      expect(Class652.stats).toBe(Class652.stats);
    });
  });
});
