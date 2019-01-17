/* tslint:disable */

import { Agent, IsAgent, decorateClassMember, agent } from '../../../src/lib';
import { RoundAttribute } from '../attributes/RoundAttribute';

class Base {
  @decorateClassMember(new RoundAttribute())
  get age(): number {
    return 1.2;
  }
}

@agent()
class Calculator extends Base {
  @decorateClassMember(new RoundAttribute())
  get age(): number {
    return 1.5;
  }
}

describe('Duplicate Interceptors', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
    });

    it('re-upgrade agent', () => {
      expect(Agent(Calculator)).toBe(Calculator);
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
