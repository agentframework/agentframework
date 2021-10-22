import {
  Arguments,
  CreateAgent,
  Design,
  Invocation,
  IsAgent,
  Reflector,
  decorateAgent,
} from '../../../src/dependencies/agent';
import { agent } from '../../../src/dependencies/agent';

describe('1.3. Agent interceptor invoke sequence', () => {
  describe('# should able to', () => {
    it('get sequence for agent constructors', () => {
      let seq: string[] = [];

      // no effect, because Agent already created by @agent()
      @decorateAgent({
        id: 1,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeAnotherAgent131-@deco-1');
            const ret = target.invoke(params, receiver);
            seq.push('afterAnotherAgent131-@deco-1');
            return ret;
          },
        },
      })
      @agent()
      @decorateAgent({
        id: 2,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeAnotherAgent131-@deco-2');
            const ret = target.invoke(params, receiver);
            seq.push('afterAnotherAgent131-@deco-2');
            return ret;
          },
        },
      })
      class AnotherAgent131 {
        constructor() {
          seq.push('AnotherAgent');
        }
      }

      // console.log('seq 1', seq)
      expect(seq).toEqual(['beforeAnotherAgent131-@deco-2', 'afterAnotherAgent131-@deco-2']);
      seq = [];

      Reflector(AnotherAgent131).static.addAttribute({
        id: 3,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeAnotherAgent131-aa-1');
            const ret = target.invoke(params, receiver);
            seq.push('afterAnotherAgent131-aa-1');
            return ret;
          },
        },
      });
      Reflector(AnotherAgent131).static.addAttribute({
        id: 4,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeAnotherAgent131-aa-2');
            const ret = target.invoke(params, receiver);
            seq.push('afterAnotherAgent131-aa-2');
            return ret;
          },
        },
      });

      expect(seq).toEqual([]);

      @decorateAgent({
        id: 5,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBase131-@deco-1');
            const ret = target.invoke(params, receiver);
            seq.push('afterBase131-@deco-1');
            return ret;
          },
        },
      })
      @agent()
      @decorateAgent({
        id: 6,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBase131-@deco-2');
            const ret = target.invoke(params, receiver);
            seq.push('afterBase131-@deco-2');
            return ret;
          },
        },
      })
      class Base131 extends AnotherAgent131 {
        constructor() {
          seq.push('before Base131');
          super();
          seq.push('Base131');
        }
      }

      expect(seq).toEqual(['beforeBase131-@deco-2', 'afterBase131-@deco-2']);
      seq = [];

      Reflector(Base131).static.addAttribute({
        id: 7,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBase131-aa-1');
            const ret = target.invoke(params, receiver);
            seq.push('afterBase131-aa-1');
            return ret;
          },
        },
      });
      Reflector(Base131).static.addAttribute({
        id: 8,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBase131-aa-2');
            const ret = target.invoke(params, receiver);
            seq.push('afterBase131-aa-2');
            return ret;
          },
        },
      });

      // console.log('seq 4', seq);

      @decorateAgent({
        id: 9,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle131-@deco-1');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle131-@deco-1');
            return ret;
          },
        },
      })
      @decorateAgent({
        id: 10,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle131-@deco-2');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle131-@deco-2');
            return ret;
          },
        },
      })
      class Middle131 extends Base131 {
        constructor() {
          seq.push('before Middle131');
          super();
          seq.push('Middle131');
        }
      }

      // console.log('seq 5', seq);

      Reflector(Middle131).static.addAttribute({
        id: 11,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle131-Reflector-1');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle131-Reflector-1');
            return ret;
          },
        },
      });

      Reflector(Middle131).static.addAttribute({
        id: 12,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle131-Reflector-2');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle131-Reflector-2');
            return ret;
          },
        },
      });

      // console.log('seq 6', seq);

      // console.log('seq 7', seq);

      @decorateAgent({
        id: 15,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop13-@deco-1');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop13-@deco-1');
            return ret;
          },
        },
      })
      @decorateAgent({
        id: 16,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop13-@deco-2');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop13-@deco-2');
            return ret;
          },
        },
      })
      class Top13 extends Middle131 {}

      // console.log('seq 8', seq);

      expect(seq).toEqual([]);

      // NOTE: this is working since AgentInvocation is not been cached by CreateAgent()
      Reflector(Top13).static.addAttribute({
        id: 13,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop13-Reflector-1');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop13-Reflector-1');
            return ret;
          },
        },
      });

      const Top = CreateAgent(Top13);

      // console.log('seq 9', seq);
      expect(IsAgent(Top)).toBeTrue();

      expect(seq).toEqual([
        'beforeTop13-Reflector-1',
        'beforeTop13-@deco-1',
        'beforeTop13-@deco-2',
        'afterTop13-@deco-2',
        'afterTop13-@deco-1',
        'afterTop13-Reflector-1',
      ]);
      seq = [];

      // NOTE: this is working since AgentInvocation is NOT been cached by CreateAgent()
      Reflector(Top13).static.addAttribute({
        id: 14,
        interceptor: {
          intercept(target: Invocation, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop13-Reflector-2');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop13-Reflector-2');
            return ret;
          },
        },
      });

      // console.log('seq 9', seq);
      expect(seq).toEqual([]);

      // debugger;
      const Top2 = CreateAgent(Top13);

      expect(IsAgent(Top2)).toBeTrue();

      // console.log('seq 10', seq);
      expect(seq).toEqual([
        'beforeTop13-Reflector-2',
        'beforeTop13-Reflector-1',
        'beforeTop13-@deco-1',
        'beforeTop13-@deco-2',
        'afterTop13-@deco-2',
        'afterTop13-@deco-1',
        'afterTop13-Reflector-1',
        'afterTop13-Reflector-2',
      ]);
    });
  });
});
