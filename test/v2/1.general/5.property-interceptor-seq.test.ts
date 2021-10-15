import {
  Arguments,
  Design,
  Invocation,
  Reflector,
  CreateAgent,
  decorateMember,
  Agent,
  decorateParameter,
  agent,
} from '../../../src/dependencies/agent';

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
      const top2HelloSeq = [ 'beforeHello3',
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
        'afterHello3' ];
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

      Reflector(Agent)
        .property('hello')
        .addAttribute({
          id: 5,
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeGlobalHello1');
              const ret = target.invoke(params, receiver);
              seq.push('afterGlobalHello1');
              return ret;
            },
          },
        });

      seq = [];
      const top3 = new Class151();
      expect(seq).toEqual([]);
      top3.hello();
      const top3HelloSeq = [
        'beforeGlobalHello1',
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
        'afterGlobalHello1',
      ];
      expect(seq).toEqual(top3HelloSeq);
      seq = [];

      Reflector(Agent)
        .property('hello')
        .addAttribute({
          id: 6,
          interceptor: {
            intercept(target: Invocation<Design>, params: Arguments, receiver: unknown): unknown {
              seq.push('beforeGlobalHello2');
              const ret = target.invoke(params, receiver);
              seq.push('afterGlobalHello2');
              return ret;
            },
          },
        });

      const top4 = new Class151();
      expect(seq).toEqual([]);
      top4.hello();
      const top4HelloSeq = [
        'beforeGlobalHello2',
        'beforeGlobalHello1',
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
        'afterGlobalHello1',
        'afterGlobalHello2',
      ];
      expect(seq).toEqual(top4HelloSeq);

      seq = [];
      const AgentClass2 = CreateAgent(Class151);
      expect(seq).toEqual([]);
      const top21 = new AgentClass2();
      expect(seq).toEqual([]);

      top21.hello();
      // console.log('h2', seq);
      expect(seq).toEqual([
        'beforeGlobalHello2',
        'beforeGlobalHello1',
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
        'afterGlobalHello1',
        'afterGlobalHello2',
      ]);

      seq = [];
      top21.world();
      expect(seq).toEqual(['world']);
    });
  });
});
