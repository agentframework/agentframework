import {
  decorateMember,
  Arguments,
  PropertyInvocation,
  Reflector,
  AgentFrameworkError,
  CreateAgent,
} from '../../../packages/dependencies/agent';
import { InMemoryDomain, agent, singleton } from '../../../packages/dependencies/domain';

describe('5.9. Domain @singleton decorator', () => {
  describe('# should able to', () => {
    it('create singleton agent', () => {
      class Service591 {
        //
      }

      @agent()
      class App591 {
        @singleton()
        readonly service!: Service591;
        @singleton(Service591)
        readonly service2!: any;
      }

      const app = new App591();

      expect(app.service).toBeInstanceOf(Service591);
      expect(app.service2).toBe(app.service);
      expect(Reflector(App591).property('service').hasOwnAttribute()).toBeTrue();
    });

    it('create singleton agent using domain', () => {
      class Service592 {
        //
      }

      class App592 {
        @singleton()
        readonly service!: Service592;
        @singleton(Service592)
        readonly service2!: any;
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App592);

      expect(app.service).toBeInstanceOf(Service592);
      expect(app.service2).toBe(app.service);
    });

    it('create singleton agent in domain', () => {
      class Service593 {
        //
      }

      class App593 extends InMemoryDomain {
        @singleton()
        readonly service!: Service593;
        @singleton(Service593)
        readonly service2!: any;
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App593);

      expect(app.service).toBeInstanceOf(Service593);
      expect(app.service2).toBe(app.service);
    });
  });

  describe('# should not able to', () => {
    it('create singleton agent with unknown type', () => {
      @agent()
      class App593 {
        @singleton()
        readonly service: undefined;
      }

      const app = new App593();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownSingletonType');
    });

    it('create singleton agent without Domain', () => {
      class Service594 {}

      class App594 {
        @singleton()
        readonly service!: Service594;
      }

      const Agent = CreateAgent(App594);

      const agent = new Agent();

      expect(() => {
        expect(agent.service).toBeUndefined();
      }).toThrowError('NoDomainFoundForSingletonInjection');
    });

    it('create singleton using invalid receiver', () => {
      const domain = new InMemoryDomain();

      class Service595 {
        //
      }

      class App595 {

        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: App595): any {
              return target.invoke(params, undefined);
            },
          },
        })
        @singleton()
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: App595): any {
              return target.invoke(params, undefined);
            },
          },
        })
        readonly service!: Service595;
      }

      const app = domain.construct(App595);

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError(AgentFrameworkError, 'InvalidReceiver');
    });

    it('create singleton without domain', () => {
      const domain = new InMemoryDomain();

      class Service596 {
        //
      }

      class App596 {
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
              return target.invoke([new Service596()], receiver);
            },
          },
        })
        @singleton()
        readonly service!: Service596;
      }

      const app = domain.construct(App596);

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError(AgentFrameworkError, 'NotAllowModifySingletonVariable');
    });

    it('create interceptor on invalid property', () => {
      const domain = new InMemoryDomain();

      class App597 {
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
              return target.invoke([receiver], undefined);
            },
          },
        })
        run() {
          return true;
        }
      }

      const config = Reflect.getOwnPropertyDescriptor(App597.prototype, 'run');

      if (config) {
        config.value = undefined;
        Reflect.defineProperty(App597.prototype, 'run', config);
        // console.log('config', Reflect.getOwnPropertyDescriptor(App597.prototype, 'run'));

        const plain = new App597();
        expect(plain.run).toBeUndefined();

        const desc = Reflector(App597).property('run').descriptor;
        if (desc) {
          desc.value = undefined;
        }
        const ins = domain.construct(App597);
        expect(ins).toBeInstanceOf(App597);

        const p1 = Reflect.getPrototypeOf(ins);
        expect(p1).toBeDefined();
        const r1 = Reflect.getOwnPropertyDescriptor(p1!, 'run');
        expect(r1).toBeUndefined();
        const p2 = Reflect.getPrototypeOf(p1!);
        expect(p2).toBeDefined();
        const r2 = Reflect.getOwnPropertyDescriptor(p2!, 'run');
        expect(r2).toBeDefined();

        expect(() => {
          expect(ins['run']).toBeDefined();
        }).toThrowError(AgentFrameworkError, 'InvalidReceiver');

        expect(() => {
          Reflect.get(ins, 'run');
        }).toThrowError(AgentFrameworkError, 'InvalidReceiver');

        expect(() => {
          ins.run();
        }).toThrowError(AgentFrameworkError, 'InvalidReceiver');
      }
    });
  });
});
