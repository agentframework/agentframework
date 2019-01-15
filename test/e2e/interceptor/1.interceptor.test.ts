
import {
  agent,
  Agent,
  decorate,
  decorateClassMember,
  decorateClassMethod,
  decorateParameter,
  IsAgent,
  Reflector,
  Target
} from '../../../src/lib';
import { RoundAttribute } from '../attributes/RoundAttribute';




@agent()
class Calculator {
  @decorateClassMethod(new RoundAttribute())
  round1(num: any) {
    return num;
  }

  @decorateClassMember(new RoundAttribute())
  round2(num: any) {
    return num;
  }

  @decorate(new RoundAttribute(), Target.Method)
  round3(num: any) {
    return num;
  }

  round4(@decorateParameter(new RoundAttribute()) num: any) {
    return num;
  }
}

describe('Interceptor', () => {
  describe('# should able to', () => {
    it('detect agent', () => {
      expect(IsAgent(Calculator)).toBe(true);
    });

    it('re-upgrade agent', () => {
      expect(Agent(Calculator)).toBe(Calculator);
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

    //region round1
    it('get round1 attribute', () => {
      const items = Reflector(Calculator)
        .property('round1')
        .value.getAttributes(RoundAttribute);
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
    //endregion

    //region round2
    it('get round2 attribute', () => {
      const items = Reflector(Calculator)
        .property('round2')
        .getAttributes(RoundAttribute);
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
    //endregion

    //region round3
    it('get round3 attribute', () => {
      const items = Reflector(Calculator)
        .property('round3')
        .value.getAttributes(RoundAttribute);
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
    //endregion

    //region round4
    it('get round4 attribute', () => {
      const items = Reflector(Calculator)
        .property('round4')
        .value.parameter(0)
        .getAttributes(RoundAttribute);
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
    //endregion
  });
});
