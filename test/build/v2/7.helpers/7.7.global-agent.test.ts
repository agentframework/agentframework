import { Agent, Arguments, Invocation, Reflector, agent } from '../../../../release';

describe('7.7. Agent', () => {
  describe('# should able to', () => {
    it('get same value', () => {
      Reflector(Agent).addAttribute({
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            const ins: any = target.invoke(params, receiver);
            ins['version'] = '1.0';
            return ins;
          },
        },
      });

      @agent()
      class ClassRandom771 {}

      const rnd = new ClassRandom771();

      expect(rnd['version']).toBe('1.0');
    });


    it('get same value', () => {
      Reflector(Agent).static.addAttribute({
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            const ins: any = target.invoke(params, receiver);
            ins['version'] = '2.0';
            return ins;
          },
        },
      });

      @agent()
      class ClassRandom772 {}

      expect(ClassRandom772['version']).toBe('2.0');
    });
  });
});
