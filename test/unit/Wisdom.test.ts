import { Wisdom } from '../../src/core/Core/Wisdom/Wisdom';

describe('Wisdom', () => {
  describe('# should able to', () => {
    it('get name', () => {
      const pkg = require('../../package.json');
      const name = pkg.name + '@' + pkg.version;
      expect(Wisdom.name).toBeInstanceOf(String);
      expect(Wisdom.name).toBe(name);
      expect(Wisdom[Symbol.for('Deno.symbols.customInspect')]()).toBe(name);
      expect(Wisdom[Symbol.for('nodejs.util.inspect.custom')]()).toBe(name);
    });
  });
});
