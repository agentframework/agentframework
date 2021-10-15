import {
  Arguments,
  decorateClass,
  decorateParameter,
  Design,
  Invocation,
  Reflector,
} from '../../../src/dependencies/agent';
import { agent, Agent } from '../../../src/dependencies/agent';

describe('1.4. Class interceptor invoke sequence', () => {
  describe('# should able to', () => {
    it('get sequence for class constructors', () => {
      let seq: string[] = [];

      @decorateClass({
        id: 1,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeAnotherAgent1');
            const ret = target.invoke(params, receiver);
            seq.push('afterAnotherAgent1');
            return ret;
          },
        },
      })
      @agent()
      @decorateClass({
        id: 1,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeAnotherAgent2');
            const ret = target.invoke(params, receiver);
            seq.push('afterAnotherAgent2');
            return ret;
          },
        },
      })
      class AnotherAgent141 {
        constructor(
          @decorateParameter({
            id: 100,
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeAnotherAgentParameter[0]-1');
                const ret = target.invoke(params, receiver);
                seq.push('afterAnotherAgentParameter[0]-1');
                return ret;
              },
            },
          })
          name?: string,
          @decorateParameter({
            id: 101,
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeAnotherAgentParameter[1]-1');
                const ret = target.invoke(params, receiver);
                seq.push('afterAnotherAgentParameter[1]-1');
                return ret;
              },
            },
          })
          @decorateParameter({
            id: 102,
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeAnotherAgentParameter[1]-2');
                const ret = target.invoke(params, receiver);
                seq.push('afterAnotherAgentParameter[1]-2');
                return ret;
              },
            },
          })
          location?: string
        ) {
          seq.push('AnotherAgent');
        }
      }

      Reflector(AnotherAgent141)
        .parameter(0)
        .addAttribute({
          id: 103,
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeAnotherAgentParameter[0]-2');
              const ret = target.invoke(params, receiver);
              seq.push('afterAnotherAgentParameter[0]-2');
              return ret;
            },
          },
        });

      Reflector(AnotherAgent141).addAttribute({
        id: 3,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeAnotherAgent141AA1');
            const ret = target.invoke(params, receiver);
            seq.push('afterAnotherAgent141AA1');
            return ret;
          },
        },
      });

      Reflector(AnotherAgent141).addAttribute({
        id: 4,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeAnotherAgent141AA2');
            const ret = target.invoke(params, receiver);
            seq.push('afterAnotherAgent141AA2');
            return ret;
          },
        },
      });

      const aa1 = new AnotherAgent141();
      expect(aa1).toBeInstanceOf(AnotherAgent141);
      const aa1s = seq;
      const expectAA1s = [
        'beforeAnotherAgent141AA2',
        'beforeAnotherAgent141AA1',
        'beforeAnotherAgent2',
        'beforeAnotherAgentParameter[0]-2',
        'beforeAnotherAgentParameter[0]-1',
        'afterAnotherAgentParameter[0]-1',
        'afterAnotherAgentParameter[0]-2',
        'beforeAnotherAgentParameter[1]-1',
        'beforeAnotherAgentParameter[1]-2',
        'afterAnotherAgentParameter[1]-2',
        'afterAnotherAgentParameter[1]-1',
        'AnotherAgent',
        'afterAnotherAgent2',
        'afterAnotherAgent141AA1',
        'afterAnotherAgent141AA2',
      ];
      expect(aa1s).toEqual(expectAA1s);

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
      class Base141 extends AnotherAgent141 {
        constructor(
          @decorateParameter({
            id: 110,
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeBase141Parameter[0]');
                const ret = target.invoke(params, receiver);
                seq.push('afterBase141Parameter[0]');
                return ret;
              },
            },
          })
          name?: string
        ) {
          seq.push('before Base141');
          super();
          seq.push('Base141');
        }
      }

      Reflector(Base141).addAttribute({
        id: 3,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBaseReflector1');
            const ret = target.invoke(params, receiver);
            seq.push('afterBaseReflector1');
            return ret;
          },
        },
      });

      Reflector(Base141).addAttribute({
        id: 4,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeBaseReflector2');
            const ret = target.invoke(params, receiver);
            seq.push('afterBaseReflector2');
            return ret;
          },
        },
      });

      @decorateClass({
        id: 5,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle141Decorator1');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle141Decorator1');
            return ret;
          },
        },
      })
      @decorateClass({
        id: 6,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle141Decorator2');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle141Decorator2');
            return ret;
          },
        },
      })
      class Middle141 extends Base141 {
        constructor() {
          seq.push('before Middle141');
          super();
          seq.push('Middle141');
        }
      }

      Reflector(Middle141).addAttribute({
        id: 7,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle141AA3');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle141AA3');
            return ret;
          },
        },
      });

      Reflector(Middle141).addAttribute({
        id: 8,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeMiddle141AA4');
            const ret = target.invoke(params, receiver);
            seq.push('afterMiddle141AA4');
            return ret;
          },
        },
      });

      // the decorator above agent is not supported
      @decorateClass({
        id: 9,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop141Decorator1');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop141Decorator1');
            return ret;
          },
        },
      })
      // the decorator above agent is not supported
      @decorateClass({
        id: 10,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop141Decorator2');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop141Decorator2');
            return ret;
          },
        },
      })
      @agent()
      @decorateClass({
        id: 11,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop141Decorator3');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop141Decorator3');
            return ret;
          },
        },
      })
      @decorateClass({
        id: 12,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop141Decorator4');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop141Decorator4');
            return ret;
          },
        },
      })
      class Top141 extends Middle141 {
        constructor(
          @decorateParameter({
            id: 120,
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeTop141Parameter[0]-1');
                const ret = target.invoke(params, receiver);
                seq.push('afterTop141Parameter[0]-1');
                return ret;
              },
            },
          })
          name?: string
        ) {
          seq.push('before Top141');
          super();
          seq.push('Top141');
        }
      }

      Reflector(Top141).addAttribute({
        id: 11,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop141AA3');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop141AA3');
            return ret;
          },
        },
      });
      Reflector(Top141).addAttribute({
        id: 12,
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeTop141AA4');
            const ret = target.invoke(params, receiver);
            seq.push('afterTop141AA4');
            return ret;
          },
        },
      });

      /// region Modify Global Agent Attribute
      Reflector(Agent).addAttribute({
        id: 'g1',
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeGlobalReflector1');
            const ret = target.invoke(params, receiver);
            seq.push('afterGlobalReflector1');
            return ret;
          },
        },
      });

      Reflector(Agent).addAttribute({
        id: 'g2',
        interceptor: {
          intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
            seq.push('beforeGlobalReflector2');
            const ret = target.invoke(params, receiver);
            seq.push('afterGlobalReflector2');
            return ret;
          },
        },
      });

      Reflector(Agent)
        .parameter(0)
        .addAttribute({
          id: 'g2',
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeGlobalParameter[0]-1');
              const ret = target.invoke(params, receiver);
              // console.log('ret', ret);
              seq.push('afterGlobalParameter[0]-1');
              return ret;
            },
          },
        });
      // endregion

      seq = [];
      const aa2 = new AnotherAgent141();
      expect(aa2).toBeInstanceOf(AnotherAgent141);
      const aa2s = seq;

      const expectAA2s = [
        'beforeGlobalReflector2',
        'beforeGlobalReflector1',
        'beforeGlobalParameter[0]-1',
        'afterGlobalParameter[0]-1',
        'beforeAnotherAgent141AA2',
        'beforeAnotherAgent141AA1',
        'beforeAnotherAgent2',
        'beforeAnotherAgentParameter[0]-2',
        'beforeAnotherAgentParameter[0]-1',
        'afterAnotherAgentParameter[0]-1',
        'afterAnotherAgentParameter[0]-2',
        'beforeAnotherAgentParameter[1]-1',
        'beforeAnotherAgentParameter[1]-2',
        'afterAnotherAgentParameter[1]-2',
        'afterAnotherAgentParameter[1]-1',
        'AnotherAgent',
        'afterAnotherAgent2',
        'afterAnotherAgent141AA1',
        'afterAnotherAgent141AA2',
        'afterGlobalReflector1',
        'afterGlobalReflector2',
      ];
      expect(aa2s).toEqual(expectAA2s);

      seq = [];
      const top1 = new Top141();
      expect(top1).toBeInstanceOf(Top141);
      const topSeq1 = seq;

      const expectSeq = [
        'beforeGlobalReflector2',
        'beforeGlobalReflector1',
        'beforeGlobalParameter[0]-1',
        'afterGlobalParameter[0]-1',
        'beforeTop141AA4',
        'beforeTop141AA3',
        'beforeTop141Decorator3',
        'beforeTop141Decorator4',
        'beforeMiddle141AA4',
        'beforeMiddle141AA3',
        'beforeMiddle141Decorator1',
        'beforeMiddle141Decorator2',
        'beforeBaseReflector2',
        'beforeBaseReflector1',
        'beforeBaseDecorator1',
        'beforeBaseDecorator2',
        'beforeTop141Parameter[0]-1',
        'afterTop141Parameter[0]-1',
        'before Top141',
        'before Middle141',
        'before Base141',
        'beforeGlobalReflector2',
        'beforeGlobalReflector1',
        'beforeGlobalParameter[0]-1',
        'afterGlobalParameter[0]-1',
        'beforeAnotherAgent141AA2',
        'beforeAnotherAgent141AA1',
        'beforeAnotherAgent2',
        'beforeAnotherAgentParameter[0]-2',
        'beforeAnotherAgentParameter[0]-1',
        'afterAnotherAgentParameter[0]-1',
        'afterAnotherAgentParameter[0]-2',
        'beforeAnotherAgentParameter[1]-1',
        'beforeAnotherAgentParameter[1]-2',
        'afterAnotherAgentParameter[1]-2',
        'afterAnotherAgentParameter[1]-1',
        'AnotherAgent',
        'afterAnotherAgent2',
        'afterAnotherAgent141AA1',
        'afterAnotherAgent141AA2',
        'afterGlobalReflector1',
        'afterGlobalReflector2',
        'Base141',
        'Middle141',
        'Top141',
        'afterBaseDecorator2',
        'afterBaseDecorator1',
        'afterBaseReflector1',
        'afterBaseReflector2',
        'afterMiddle141Decorator2',
        'afterMiddle141Decorator1',
        'afterMiddle141AA3',
        'afterMiddle141AA4',
        'afterTop141Decorator4',
        'afterTop141Decorator3',
        'afterTop141AA3',
        'afterTop141AA4',
        'afterGlobalReflector1',
        'afterGlobalReflector2',
      ];

      // console.log('seq 1', seq);
      expect(topSeq1).toEqual(expectSeq);

      seq = [];
      const top2 = new Top141();
      expect(top2).toBeInstanceOf(Top141);
      const topSeq2 = seq;

      expect(topSeq2).toEqual(expectSeq);

      // NOTE: the invocation is been cached. so seq must same
      expect(topSeq1).toEqual(topSeq2);
    });
  });
});
