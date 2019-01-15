
import { Agent, decorateClassMember, IsAgent, Reflector, decorateClassField, agent } from '../../../src/lib';
import { RandomAttribute } from '../attributes/RandomAttribute';

class Base {
  @decorateClassMember(new RandomAttribute())
  run: number;
}

@agent()
class Calculator extends Base {
  @decorateClassField(new RandomAttribute())
  run: number;
}

describe('Duplicate Initializer', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
      expect(Agent(Calculator)).toBe(Calculator);
    });

    it('get attribute metadata from type', () => {
      expect(
        Reflector(Calculator)
          .property('run')
          .getAttributes(RandomAttribute).length
      ).toBe(0);
    });
    it('get parent attribute metadata from type', () => {
      expect(
        Reflector(Calculator)
          .property('run')
          .value.getAttributes(RandomAttribute).length
      ).toBe(1);
    });
  });

  describe('# should not able to', () => {
    it('create agent', () => {
      expect(() => {
        new Calculator();
      }).toThrow();
    });
  });
});
