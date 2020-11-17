/* tslint:disable */

import {
  agent,
  CreateAgent,
  decorate,
  decorateMember,
  decorateParameter,
  IsAgent,
  Reflector,
  MemberKinds,
} from '../../../lib';
import { RoundInterceptor } from '../attributes/RoundInterceptor';

@agent()
class Calculator {
  @decorateMember(new RoundInterceptor())
  round1(num: any) {
    return num;
  }

  @decorateMember(new RoundInterceptor())
  round2(num: any) {
    return num;
  }

  @decorate(new RoundInterceptor(), MemberKinds.Property)
  round3(num: any) {
    return num;
  }

  round4(@decorateParameter(new RoundInterceptor()) num: any) {
    return num;
  }
}

describe('Interceptor', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(Calculator)).toBeTrue();
    });

    it('re-upgrade agent', () => {
      expect(IsAgent(CreateAgent(Calculator))).toBeTrue();
    });

    it('new instance', () => {
      const ca = new Calculator();
      expect(ca instanceof Calculator).toBe(true);
      expect(Reflect.getPrototypeOf(ca)).toBe(Calculator.prototype);
    });

    it('construct instance', () => {
      const ca = Reflect.construct(Calculator, []);
      expect(ca instanceof Calculator).toBe(true);
      expect(Reflect.getPrototypeOf(ca)).toBe(Calculator.prototype);
    });

    // region round1
    it('get round1 attribute', () => {
      const items = Reflector(Calculator).property('round1').getOwnAttributes(RoundInterceptor);
      expect(items.length).toBe(1);
    });

    it('get round1 value', () => {
      const ca = new Calculator();
      expect(ca).toBeTruthy();
      expect(ca.round1(1.3)).toBe(1);
    });

    it('get round1 invalid value', () => {
      const ca = new Calculator();
      expect(ca).toBeTruthy();
      expect(ca.round1('text')).toBe(0);
    });
    // endregion

    // region round2
    it('get round2 attribute', () => {
      const items = Reflector(Calculator).property('round2').getOwnAttributes(RoundInterceptor);
      expect(items.length).toBe(1);
    });

    it('get round2 value', () => {
      const ca = new Calculator();
      expect(ca).toBeTruthy();
      expect(ca.round2(1.3)).toBe(1);
    });

    it('get round2 invalid value', () => {
      const ca = new Calculator();
      expect(ca).toBeTruthy();
      expect(ca.round2('text')).toBe(0);
    });
    // endregion

    // region round3
    it('get round3 attribute', () => {
      const items = Reflector(Calculator).property('round3').getOwnAttributes(RoundInterceptor);
      expect(items.length).toBe(1);
    });

    it('get round3 value', () => {
      const ca = new Calculator();
      expect(ca).toBeTruthy();
      expect(ca.round3(1.3)).toBe(1);
    });

    it('get round3 invalid value', () => {
      const ca = new Calculator();
      expect(ca).toBeTruthy();
      expect(ca.round3('text')).toBe(0);
    });
    // endregion

    // region round4
    it('get round4 attribute', () => {
      const items = Reflector(Calculator).property('round4').getParameters();
      expect(items.length).toBe(1);
    });

    it('get round4 value', () => {
      const ca = new Calculator();
      expect(ca).toBeTruthy();
      expect(ca.round4(1.3)).toBe(1);
    });

    it('get round4 invalid value', () => {
      const ca = new Calculator();
      expect(ca).toBeTruthy();
      expect(ca.round4('text')).toBe(0);
    });
    // endregion
  });
});
