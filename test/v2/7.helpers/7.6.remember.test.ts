import { remember } from '../../../src/dependencies/core';

class ClassA {
  @remember('Random')
  static get children() {
    return new Map();
  }
}

describe('7.6. @remember helper', () => {
  describe('# should able to', () => {
    it('get same value', () => {
      expect(ClassA.children).toBe(ClassA.children);
    });
  });
});
