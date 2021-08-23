import { Agent, Arguments, Invocation, Reflector, agent, decorateClass } from '../../../src/dependencies/core';

describe('6.9. Global Agent', () => {
  describe('# should able to', () => {
    it('get same value', () => {
      const seq: string[] = [];

      Reflector(Agent).addAttribute({
        id: 1,
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeUpAgent');
            const ins: any = target.invoke(params, receiver);
            ins['version'] = '1.0';
            seq.push('afterUpAgent');
            return ins;
          },
        },
      });
      Reflector(Agent).addAttribute({
        id: 2,
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeDownAgent');
            const ins: any = target.invoke(params, receiver);
            ins['version'] = '2.0';
            seq.push('afterDownAgent');
            return ins;
          },
        },
      });

      @agent()
      @decorateClass({
        id: 3,
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeClassRandom691');
            const ins = target.invoke(params, receiver);
            seq.push('afterClassRandom691');
            return ins;
          },
        },
      })
      @decorateClass({
        id: 4,
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeClassRandom691B');
            const ins = target.invoke(params, receiver);
            seq.push('afterClassRandom691B');
            return ins;
          },
        },
      })
      class ClassRandom691 {
        constructor() {
          seq.push('ClassRandom691');
        }
      }

      Reflector(ClassRandom691).addAttribute({
        id: 5,
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeClassRandom691Down');
            const ins: any = target.invoke(params, receiver);
            seq.push('afterClassRandom691Down');
            return ins;
          },
        },
      });

      Reflector(ClassRandom691).addAttribute({
        id: 6,
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeClassRandom691Down2');
            const ins: any = target.invoke(params, receiver);
            seq.push('afterClassRandom691Down2');
            return ins;
          },
        },
      });

      const rnd = new ClassRandom691();

      expect(rnd['version']).toBe('2.0');

      const attrs = Reflector(ClassRandom691).getOwnAttributes();

      // console.log(
      //   'id',
      //   attrs.map((a) => a['id'])
      // );

      expect(attrs.map((a) => a['id'])).toEqual([3, 4, 5, 6]);

      // console.log('seq', seq);

      expect(seq).toEqual([
        'beforeDownAgent',
        'beforeUpAgent',
        'beforeClassRandom691Down2',
        'beforeClassRandom691Down',
        'beforeClassRandom691B',
        'beforeClassRandom691',
        'ClassRandom691',
        'afterClassRandom691',
        'afterClassRandom691B',
        'afterClassRandom691Down',
        'afterClassRandom691Down2',
        'afterUpAgent',
        'afterDownAgent'
      ]);
    });

    it('get same value', () => {
      Reflector(Agent).static.addAttribute({
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            const ins: any = target.invoke(params, receiver);
            ins['up'] = true;
            ins['version'] = '2.0';
            return ins;
          },
        },
      });
      Reflector(Agent).static.addAttribute({
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            const ins: any = target.invoke(params, receiver);
            ins['down'] = true;
            ins['version'] = '3.0';
            return ins;
          },
        },
      });

      @agent()
      class ClassRandom692 {}

      expect(ClassRandom692['version']).toBe('3.0');
      expect(ClassRandom692['up']).toBe(true);
      expect(ClassRandom692['down']).toBe(true);
    });
  });
});
