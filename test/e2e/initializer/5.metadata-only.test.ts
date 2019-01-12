import { Agent, decorateClassMember, IsAgent, Reflector, decorateClassField } from '../../../src/lib';
import { BadRandomAttribute } from '../attributes/BadRandomAttribute';

class Calculator {
  @decorateClassMember(new BadRandomAttribute())
  run1: number;

  @decorateClassField(new BadRandomAttribute())
  run2: number;
}

describe('Metadata only Initializer', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(false);
      expect(Agent(Calculator)).toBeTruthy();
    });

    it('get attribute metadata from type', () => {
      expect(
        Reflector(Calculator)
          .property('run1')
          .getAttributes(BadRandomAttribute).length
      ).toBe(1);
      expect(
        Reflector(Calculator)
          .property('run2')
          .value.getAttributes(BadRandomAttribute).length
      ).toBe(1);
    });
  });

  describe('# should not able to', () => {
    it('create agent', () => {
      const AC = Agent(Calculator);
      const a = new AC();
      console.log('a', a);
      // expect(() => {}).toThrow();
    });
  });
});
