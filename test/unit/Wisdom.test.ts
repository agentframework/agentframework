import { Wisdom } from '../../src/core/Core/Wisdom/Wisdom';

describe('Wisdom', () => {
  describe('# should able to', () => {
    it('get name', () => {
      const WisdomStatic: any = Wisdom.constructor;
      expect(WisdomStatic.id).toBeInstanceOf(String);
      expect(WisdomStatic.version).toBeInstanceOf(String);
      expect(WisdomStatic.timestamp).toBeInstanceOf(String);
      // console.log('Wisdom', Wisdom);
      // const name = WisdomStatic.id + '@' + WisdomStatic.version;
      // expect(Wisdom[Symbol.for('Deno.symbols.customInspect')]()).toBe(name);
      // expect(Wisdom[Symbol.for('nodejs.util.inspect.custom')]()).toBe(name);
    });
  });
});
