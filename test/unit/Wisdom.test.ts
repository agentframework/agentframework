import { Wisdom } from '../../src/core/Core/Wisdom/Wisdom';

describe('Wisdom', () => {
  describe('# should able to', () => {
    it('get name', () => {
      const name = Wisdom.name + '@' + Wisdom.version;
      expect(Wisdom.name).toBeInstanceOf(String);
      expect(Wisdom.version).toBeInstanceOf(String);
      expect(Wisdom.timestamp).toBeInstanceOf(String);
      expect(Wisdom[Symbol.for('Deno.symbols.customInspect')]()).toBe(name);
      expect(Wisdom[Symbol.for('nodejs.util.inspect.custom')]()).toBe(name);
    });
  });
});
