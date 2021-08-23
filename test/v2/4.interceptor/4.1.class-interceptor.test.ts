import {
  decorateClass,
  Arguments,
  agent,
  TypeInvocation,
  decorateMember,
  decorateAgent,
  Reflector,
} from '../../../src/dependencies/core';

describe('4.1. Class interceptor', () => {
  describe('# should able to', () => {
    it('intercept class constructor', () => {
      @agent()
      @decorateClass({
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            return target.invoke([Math.floor(params[0])], receiver);
          },
        },
      })
      class Class411 {
        constructor(readonly a: number) {}

        @decorateMember({ role: 'user' })
        Method411() {}
      }

      const instance = new Class411(3.5);
      expect(instance).toBeInstanceOf(Class411);
      expect(instance.a).toBe(3);
    });

    it('intercept agent constructor', () => {
      @agent()
      @decorateAgent({
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            return target.invoke(params, receiver);
          },
        },
      })
      @decorateAgent({})
      class Class412 {
        constructor(readonly a: number) {}

        @decorateMember({ role: 'user' })
        Method412() {}
      }

      const instance = new Class412(3.5);
      expect(instance).toBeInstanceOf(Class412);
      expect(instance.a).toBe(3.5);
    });

    it('decorate agent constructor', () => {
      @agent()
      @decorateAgent({})
      class Class413 {
        constructor(readonly a: number) {}

        @decorateMember({ role: 'user' })
        Method413() {}
      }

      const instance = new Class413(3.5);
      expect(instance).toBeInstanceOf(Class413);
      expect(instance.a).toBe(3.5);
    });

    it('intercept class constructor and base', () => {
      const seq: string[] = [];

      @decorateClass({
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            seq.push('beforeBase414');
            const result = target.invoke(params, receiver);
            seq.push('afterBase414');
            return result;
          },
        },
      })
      class Base414 {
        constructor() {
          seq.push('Base414');
        }

        @decorateMember({ role: 'user' })
        Method414() {
          return 'Base414';
        }
      }

      @agent()
      @decorateClass({
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            seq.push('beforeClass414');
            const result = target.invoke(params, receiver);
            seq.push('afterClass414');
            return result;
          },
        },
      })
      class Class414 extends Base414 {
        readonly a: number;
        constructor(a: number) {
          seq.push('Class414-1');
          super();
          seq.push('Class414-2');
          this.a = a;
        }

        @decorateMember({ role: 'user' })
        Method414() {
          return 'Class414';
        }
      }

      const instance = new Class414(3.44234);
      expect(instance).toBeInstanceOf(Class414);
      expect(instance.a).toBe(3.44234);
      expect(instance.Method414()).toBe('Class414');
      expect(seq).toEqual([
        'beforeClass414',
        'beforeBase414',
        'Class414-1',
        'Base414',
        'Class414-2',
        'afterBase414',
        'afterClass414',
      ]);
    });

    it('intercept agent constructor and base', () => {
      const seq: string[] = [];

      @decorateAgent({
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            seq.push('beforeBase415');
            const result = target.invoke(params, receiver);
            seq.push('afterBase415');
            return result;
          },
        },
      })
      class Base415 {
        constructor() {
          seq.push('Base415');
        }

        @decorateMember({ role: 'user' })
        Method415() {
          return 'Base415';
        }
      }

      @decorateAgent({
        name: 'upAgent',
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            seq.push('upBeforeClass415');
            const result = target.invoke(params, receiver);
            seq.push('upAfterClass415');
            return result;
          },
        },
      })
      @decorateClass({
        name: 'upClass',
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            seq.push('upBeforeClass415');
            const result = target.invoke(params, receiver);
            seq.push('upAfterClass415');
            return result;
          },
        },
      })
      @agent()
      @decorateAgent({
        name: 'downAgent',
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            seq.push('downAgentBeforeClass415');
            const result = target.invoke(params, receiver);
            seq.push('downAgentAfterClass415');
            return result;
          },
        },
      })
      @decorateClass({
        name: 'downClass',
        interceptor: {
          intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
            seq.push('downBeforeClass415');
            const result = target.invoke(params, receiver);
            seq.push('downAfterClass415');
            return result;
          },
        },
      })
      class Class415 extends Base415 {
        readonly a: number;
        constructor(a: number) {
          seq.push('Class415-1');
          super();
          seq.push('Class415-2');
          this.a = a;
        }

        @decorateMember({ role: 'admin' })
        Method415() {
          return 'Class415';
        }
      }

      @agent()
      class End415 extends Class415 {}

      // console.log('class', Reflector(Class415).getOwnAttributes());
      // console.log('agent', Reflector(Class415).static.getOwnAttributes());
      // console.log('ty', );
      // console.log('seq', seq, Class415);

      expect(Reflector(End415).getOwnAttributes()).toEqual([])
      expect(Reflector(End415).static.getOwnAttributes()).toEqual([])
      expect(seq).toEqual(['downAgentBeforeClass415', 'downAgentAfterClass415']);

      // const instance = new Class415(3.44234);
      // expect(instance).toBeInstanceOf(Class415);
      // expect(instance.a).toBe(3.44234);
      // expect(instance.Method414()).toBe('Class414');
    });
  });
});
