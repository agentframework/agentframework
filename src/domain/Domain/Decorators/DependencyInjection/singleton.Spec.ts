import {
  AgentFrameworkError,
  Arguments,
  CreateAgent,
  decorateMember,
  IsAgent,
  PropertyInvocation,
  Reflector,
} from '../../../../dependencies/core';
import { InMemoryDomain, agent, singleton } from '../../../../dependencies/domain';

describe('Domain @singleton() decorator', () => {
  describe('# should able to', () => {
    it('create singleton agent', () => {
      class Service31111 {
        //
      }

      @agent()
      class App31111 {
        @singleton()
        readonly service!: Service31111;
        @singleton(Service31111)
        readonly service2!: any;
      }

      const app = new App31111();

      expect(app.service).toBeInstanceOf(Service31111);
      expect(app.service2).toBe(app.service);
      expect(Reflector(App31111).property('service').hasOwnAttribute()).toBeTrue();
    });

    it('create singleton agent using domain', () => {
      class Service31112 {
        //
      }

      class App31112 {
        @singleton()
        readonly service!: Service31112;
        @singleton(Service31112)
        readonly service2!: any;
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App31112);

      expect(app.service).toBeInstanceOf(Service31112);
      expect(app.service2).toBe(app.service);
    });

    it('create singleton agent in domain', () => {
      class Service31113 {
        //
      }

      class App31113 extends InMemoryDomain {
        @singleton()
        readonly service!: Service31113;
        @singleton(Service31113)
        readonly service2!: any;
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App31113);

      expect(app.service).toBeInstanceOf(Service31113);
      expect(app.service2).toBe(app.service);
    });
  });

  describe('# should not able to', () => {
    it('create singleton agent with unknown type', () => {
      @agent()
      class App31114 {
        @singleton()
        readonly service: undefined;
      }

      const app = new App31114();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownSingletonType');
    });

    it('create singleton agent without Domain', () => {
      class Service31115 {}

      class App31115 {
        @singleton()
        readonly service!: Service31115;
      }

      const Agent = CreateAgent(App31115);

      const agent = new Agent();

      expect(() => {
        expect(agent.service).toBeUndefined();
      }).toThrowError('NoDomainFoundForSingletonInjection');
    });

    it('create singleton using invalid receiver', () => {
      const domain = new InMemoryDomain();

      class Service31116 {
        //
      }

      class App31116 {
        @singleton()
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: App31116): any {
              // console.log('params[0]', params[0], params[0].constructor.toString());
              expect(params.length).toBe(1);
              expect(params[0].constructor.name).toBe('Service31116$');
              expect(IsAgent(params[0].constructor.prototype)).toBeTrue();
              expect(IsAgent(params[0].constructor)).toBeTrue();
              expect(IsAgent(params[0])).toBeFalse();
              expect(receiver.constructor.name).toBe('App31116$');
              // will throw error next line
              return target.invoke([domain], undefined);
            },
          },
        })
        readonly service!: Service31116;
      }

      const app = domain.construct(App31116);

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError(AgentFrameworkError, 'InvalidReceiver');
    });

    it('create singleton without domain', () => {
      const domain = new InMemoryDomain();

      class Service31117 {
        //
      }

      class App31117 {
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
              // singleton will got undefined receiver
              return target.invoke([receiver], undefined);
            },
          },
        })
        @singleton()
        readonly service!: Service31117;
      }

      const app = domain.construct(App31117);

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError(AgentFrameworkError, 'NoDomainFoundForSingletonInjection');
    });

    it('create interceptor on invalid property', () => {
      const domain = new InMemoryDomain();

      class App31118 {
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

      const config = Reflect.getOwnPropertyDescriptor(App31118.prototype, 'run');

      if (config) {
        config.value = null;
        Reflect.defineProperty(App31118.prototype, 'run', config);
        // console.log('config', Reflect.getOwnPropertyDescriptor(App637.prototype, 'run'));

        const plain = new App31118();
        expect(plain.run).toBeNull();

        const desc = Reflector(App31118).property('run').descriptor;
        if (desc) {
          desc.value = null;
        }

        const a = domain.construct(App31118);
        expect(a).toBeInstanceOf(App31118);
      }
    });
  });
});
