/* tslint:disable */

import { CreateAgent, decorateMember, IsAgent, Reflector } from '../../../lib';
import { RoundInterceptor } from '../attributes/RoundInterceptor';

class Calculator {
  @decorateMember(new RoundInterceptor())
  RoundOnField!: number;
}

Reflect.defineProperty(Calculator.prototype, 'RoundOnField', {
  value: 1,
});

describe('Interceptor on Field', () => {
  describe('# should able to', () => {
    it('define agent', () => {
      expect(IsAgent(Calculator)).toBeFalse();
      expect(CreateAgent(Calculator)).toBeTruthy();
    });

    it('re-upgrade agent', () => {
      expect(CreateAgent(CreateAgent(Calculator))).toBeTruthy();
    });

    it('get the attribute', () => {
      expect(Reflector(Calculator).property('RoundOnField').getOwnAttributes(RoundInterceptor).length).toBe(1);
    });

    it('create agent', () => {
      const Agent = CreateAgent(Calculator);
      const agent = new Agent();
      expect(agent).toBeTruthy();
    });
  });
});
