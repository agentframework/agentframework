import { remember } from '../../../src/dependencies/agent';

describe('6.6. @remember helper', () => {
  describe('# should able to', () => {
    it('get same value', () => {
      class Class661 {
        @remember('Random')
        static get children() {
          return new Map();
        }
      }
      expect(Class661.children).toBe(Class661.children);
    });
  });
});
