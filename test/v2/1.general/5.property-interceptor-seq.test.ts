import { agent } from 'agentframework';
import {
  Arguments,
  CreateAgent,
  decorateMember,
  decorateParameter,
  Design,
  Invocation,
  Reflector
} from '../../../packages/dependencies/agent';

describe('1.5. Property interceptor invoke sequence', () => {
  describe('# should able to', () => {
    it('get sequence for class constructors', () => {
      let seq: string[] = [];

      @agent()
      class Class151 {
        @decorateMember({
          id: 1,
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeHello1');
              const ret = target.invoke(params, receiver);
              seq.push('afterHello1');
              return ret;
            },
          },
        })
        @decorateMember({
          id: 2,
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeHello2');
              const ret = target.invoke(params, receiver);
              seq.push('afterHello2');
              return ret;
            },
          },
        })
        hello(
          @decorateParameter({
            id: 2,
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeHelloParameterName1');
                const ret = target.invoke(params, receiver);
                seq.push('afterHelloParameterName1');
                return ret;
              },
            },
          })
          @decorateParameter({
            id: 2,
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeHelloParameterName2');
                const ret = target.invoke(params, receiver);
                seq.push('afterHelloParameterName2');
                return ret;
              },
            },
          })
          name?: string,
          @decorateParameter({
            id: 2,
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeHelloParameterAddress1');
                const ret = target.invoke(params, receiver);
                seq.push('afterHelloParameterAddress1');
                return ret;
              },
            },
          })
          @decorateParameter({
            id: 2,
            interceptor: {
              intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
                seq.push('beforeHelloParameterAddress2');
                const ret = target.invoke(params, receiver);
                seq.push('afterHelloParameterAddress2');
                return ret;
              },
            },
          })
          address?: string
        ) {
          seq.push('Hello-' + name);
        }

        @decorateMember({
          id: 3,
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeWorld');
              const ret = target.invoke(params, receiver);
              seq.push('afterWorld');
              return ret;
            },
          },
        })
        world() {
          seq.push('world');
        }
      }

      seq = [];
      const top1 = new Class151();
      expect(seq).toEqual([]);
      top1.hello();
      // console.log('top1', seq);
      const top1HelloSeq = [
        'beforeHello1',
        'beforeHello2',
        'beforeHelloParameterName1',
        'beforeHelloParameterName2',
        'afterHelloParameterName2',
        'afterHelloParameterName1',
        'beforeHelloParameterAddress1',
        'beforeHelloParameterAddress2',
        'afterHelloParameterAddress2',
        'afterHelloParameterAddress1',
        'Hello-undefined',
        'afterHello2',
        'afterHello1',
      ];
      expect(seq).toEqual(top1HelloSeq);

      Reflector(Class151)
        .property('hello')
        .addAttribute({
          id: 3,
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeHello3');
              const ret = target.invoke(params, receiver);
              seq.push('afterHello3');
              return ret;
            },
          },
        });

      seq = [];
      const top2 = new Class151();
      expect(seq).toEqual([]);
      top2.hello();
      // console.log('top2', seq);
      const top2HelloSeq = [
        'beforeHello3',
        'beforeHello1',
        'beforeHello2',
        'beforeHelloParameterName1',
        'beforeHelloParameterName2',
        'afterHelloParameterName2',
        'afterHelloParameterName1',
        'beforeHelloParameterAddress1',
        'beforeHelloParameterAddress2',
        'afterHelloParameterAddress2',
        'afterHelloParameterAddress1',
        'Hello-undefined',
        'afterHello2',
        'afterHello1',
        'afterHello3',
      ];
      expect(seq).not.toEqual(top1HelloSeq); // invocation is been cached
      expect(seq).toEqual(top2HelloSeq);

      Reflector(Class151)
        .property('hello')
        .addAttribute({
          id: 4,
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeHello4');
              const ret = target.invoke(params, receiver);
              seq.push('afterHello4');
              return ret;
            },
          },
        });

      seq = [];
      const top3 = new Class151();
      expect(seq).toEqual([]);
      top3.hello();
      const top3HelloSeq = [
        'beforeHello4',
        'beforeHello3',
        'beforeHello1',
        'beforeHello2',
        'beforeHelloParameterName1',
        'beforeHelloParameterName2',
        'afterHelloParameterName2',
        'afterHelloParameterName1',
        'beforeHelloParameterAddress1',
        'beforeHelloParameterAddress2',
        'afterHelloParameterAddress2',
        'afterHelloParameterAddress1',
        'Hello-undefined',
        'afterHello2',
        'afterHello1',
        'afterHello3',
        'afterHello4',
      ];
      expect(seq).not.toEqual(top1HelloSeq); // invocation is been cached
      expect(seq).toEqual(top3HelloSeq);
      seq = [];

      const top4 = new Class151();
      expect(seq).toEqual([]);
      top4.hello();
      const top4HelloSeq = [
        'beforeHello4',
        'beforeHello3',
        'beforeHello1',
        'beforeHello2',
        'beforeHelloParameterName1',
        'beforeHelloParameterName2',
        'afterHelloParameterName2',
        'afterHelloParameterName1',
        'beforeHelloParameterAddress1',
        'beforeHelloParameterAddress2',
        'afterHelloParameterAddress2',
        'afterHelloParameterAddress1',
        'Hello-undefined',
        'afterHello2',
        'afterHello1',
        'afterHello3',
        'afterHello4',
      ];
      expect(seq).not.toEqual(top1HelloSeq); // invocation is been cached
      expect(seq).toEqual(top4HelloSeq);

      seq = [];
      const AgentClass2 = CreateAgent(Class151);
      expect(seq).toEqual([]);
      const top21 = new AgentClass2();
      expect(seq).toEqual([]);

      top21.hello();
      // console.log('h2', seq);
      expect(seq).toEqual([
        'beforeHello4',
        'beforeHello3',
        'beforeHello1',
        'beforeHello2',
        'beforeHelloParameterName1',
        'beforeHelloParameterName2',
        'afterHelloParameterName2',
        'afterHelloParameterName1',
        'beforeHelloParameterAddress1',
        'beforeHelloParameterAddress2',
        'afterHelloParameterAddress2',
        'afterHelloParameterAddress1',
        'Hello-undefined',
        'afterHello2',
        'afterHello1',
        'afterHello3',
        'afterHello4',
      ]);

      seq = [];
      top21.world();
      expect(seq).toEqual(['beforeWorld', 'world', 'afterWorld']);
    });
  });
});
