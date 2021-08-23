import { Arguments, decorateClass, Design, Invocation, Reflector } from '../../../src/dependencies/core';
import { agent, Agent } from '../../../src/dependencies/core';

describe('1.3. Decorator and Reflector', () => {
  describe('# should able to', () => {
    it('add class attribute from top to down', () => {
      const seq: string[] = [];

      @decorateClass({
        id: 1,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBaseDecorator1');
            const ret = target.invoke(params, receiver);
            seq.push('afterBaseDecorator1');
            return ret;
          },
        },
      })
      @decorateClass({
        id: 2,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBaseDecorator2');
            const ret = target.invoke(params, receiver);
            seq.push('afterBaseDecorator2');
            return ret;
          },
        },
      })
      class Base131 {}

      Reflector(Base131).addAttribute({
        id: 3,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBaseDecorator3');
            const ret = target.invoke(params, receiver);
            seq.push('afterBaseDecorator3');
            return ret;
          },
        },
      });

      Reflector(Base131).addAttribute({
        id: 4,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBaseDecorator4');
            const ret = target.invoke(params, receiver);
            seq.push('afterBaseDecorator4');
            return ret;
          },
        },
      });

      @decorateClass({
        id: 5,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle131Decorator1');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle131Decorator1');
            return ret;
          },
        },
      })
      @decorateClass({
        id: 6,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle131Decorator2');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle131Decorator2');
            return ret;
          },
        },
      })
      class Middle131 extends Base131 {}

      Reflector(Middle131).addAttribute({
        id: 7,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle131Decorator3');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle131Decorator3');
            return ret;
          },
        },
      });

      Reflector(Middle131).addAttribute({
        id: 8,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle131Decorator4');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle131Decorator4');
            return ret;
          },
        },
      });

      @decorateClass({
        id: 9,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop131Decorator1');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop131Decorator1');
            return ret;
          },
        },
      })
      @decorateClass({
        id: 10,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop131Decorator2');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop131Decorator2');
            return ret;
          },
        },
      })
      @agent()
      class Top131 extends Middle131 {}

      Reflector(Top131).addAttribute({
        id: 11,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop131Decorator3');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop131Decorator3');
            return ret;
          },
        },
      });

      Reflector(Top131).addAttribute({
        id: 12,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop131Decorator4');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop131Decorator4');
            return ret;
          },
        },
      });

      Reflector(Agent).addAttribute({
        id: 'g1',
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeGlobalDecorator1');
            const ret = target.invoke(params, receiver);
            seq.push('afterGlobalDecorator1');
            return ret;
          },
        },
      });

      Reflector(Agent).addAttribute({
        id: 'g2',
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeGlobalDecorator2');
            const ret = target.invoke(params, receiver);
            seq.push('afterGlobalDecorator2');
            return ret;
          },
        },
      });

      const top = new Top131();

      expect(top).toBeInstanceOf(Top131);
      // console.log(seq);

      expect(seq).toEqual([
        'beforeGlobalDecorator2',
        'beforeGlobalDecorator1',
        'beforeTop131Decorator4',
        'beforeTop131Decorator3',
        'beforeTop131Decorator2',
        'beforeTop131Decorator1',
        'beforeMiddle131Decorator4',
        'beforeMiddle131Decorator3',
        'beforeMiddle131Decorator2',
        'beforeMiddle131Decorator1',
        'beforeBaseDecorator4',
        'beforeBaseDecorator3',
        'beforeBaseDecorator2',
        'beforeBaseDecorator1',
        'afterBaseDecorator1',
        'afterBaseDecorator2',
        'afterBaseDecorator3',
        'afterBaseDecorator4',
        'afterMiddle131Decorator1',
        'afterMiddle131Decorator2',
        'afterMiddle131Decorator3',
        'afterMiddle131Decorator4',
        'afterTop131Decorator1',
        'afterTop131Decorator2',
        'afterTop131Decorator3',
        'afterTop131Decorator4',
        'afterGlobalDecorator1',
        'afterGlobalDecorator2',
      ]);

    });
  });
});
