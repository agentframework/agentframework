import 'jasmine';
import { Agent, decorateClassMember, IsAgent, Reflector, decorateClassMethod } from '../../../src/lib';
import { RandomAttribute } from '../attributes/RandomAttribute';

class Calculator {
  @decorateClassMember(new RandomAttribute())
  run1(): number {
    return 1;
  }

  @decorateClassMethod(new RandomAttribute())
  run2(): number {
    return 1;
  }
}

describe('Initializer on Method', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(false);
      expect(Agent(Calculator)).toBeTruthy();
    });

    it('get attribute metadata from type', () => {
      expect(
        Reflector(Calculator)
          .property('run1')
          .getAttributes(RandomAttribute).length
      ).toBe(1);
      expect(
        Reflector(Calculator)
          .property('run2')
          .value.getAttributes(RandomAttribute).length
      ).toBe(1);
    });
  });

  describe('# should not able to', () => {
    it('create agent', () => {
      const AC = Agent(Calculator);
      expect(() => {
        new AC();
      }).toThrow();
    });
  });
});
