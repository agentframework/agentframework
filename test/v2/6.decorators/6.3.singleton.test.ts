import { agent, singleton } from 'agentframework';
import {
  decorateMember,
  Arguments,
  PropertyInvocation,
  Reflector,
  AgentFrameworkError,
  CreateAgent,
} from '../../../packages/dependencies/agent';

describe('6.3. @singleton decorator', () => {
  describe('# should able to', () => {
    it('create singleton agent', () => {
      class Service631 {
        //
      }

      @agent()
      class App631 {
        @singleton()
        readonly service!: Service631;
        @singleton(Service631)
        readonly service2!: any;
      }

      const app = new App631();

      expect(app.service).toBeInstanceOf(Service631);
      expect(app.service2).toBe(app.service);
      expect(Reflector(App631).property('service').hasOwnAttribute()).toBeTrue();
    });

    it('create singleton agent using domain', () => {
      class Service632 {
        //
      }

      class App632 {
        @singleton()
        readonly service!: Service632;
        @singleton(Service632)
        readonly service2!: any;
      }

      const Agent: typeof App632 = CreateAgent(App632);
      const app = new Agent();

      expect(app.service).toBeInstanceOf(Service632);
      expect(app.service2).toBe(app.service);
    });

    it('create singleton agent in domain', () => {
      class Service633 {
        //
      }

      class App633 {
        @singleton()
        readonly service!: Service633;
        @singleton(Service633)
        readonly service2!: any;
      }

      const Agent: typeof App633 = CreateAgent(App633);
      const app = new Agent();

      expect(app.service).toBeInstanceOf(Service633);
      expect(app.service2).toBe(app.service);
    });
  });

  describe('# should not able to', () => {
    it('create singleton agent with unknown type', () => {
      @agent()
      class App633 {
        @singleton()
        readonly service: undefined;
      }

      const app = new App633();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownSingletonType');
    });

    it('create singleton agent without Domain', () => {
      class Service634 {}

      class App634 {
        @singleton()
        readonly service!: Service634;
      }

      const Agent = CreateAgent(App634);

      const agent = new Agent();

      expect(agent.service).toBeDefined();
    });

    it('create singleton using invalid receiver', () => {
      class Service635 {
        //
      }

      class App635 {
        @singleton()
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: App635): any {
              // console.log('params[0]', params[0], params[0].constructor.toString());
              // expect(params.length).toBe(1);
              // expect(params[0].constructor.name).toBe('Service635$');
              // expect(IsAgent(params[0].constructor.prototype)).toBeTrue();
              // expect(IsAgent(params[0].constructor)).toBeTrue();
              // expect(IsAgent(params[0])).toBeFalse();
              // expect(receiver.constructor.name).toBe('App635$');
              // will throw error next line
              return target.invoke([], undefined);
            },
          },
        })
        readonly service!: Service635;
      }

      const Agent: typeof App635 = CreateAgent(App635);
      const app = new Agent();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError(AgentFrameworkError, 'InvalidReceiver');
    });

    it('create singleton without domain', () => {
      class Service636 {
        //
      }

      class App636 {
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
              return target.invoke([receiver], undefined);
            },
          },
        })
        @singleton()
        readonly service!: Service636;
      }

      const Agent: typeof App636 = CreateAgent(App636);
      const app = new Agent();

      expect(() => {
        expect(app.service).toBeUndefined();
        // this @singleton is from core, so it will not throw error missing domain
      }).toThrowError(AgentFrameworkError, 'NotAllowModifySingletonVariable');
    });

    it('create interceptor on invalid property', () => {
      class App637 {
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

      const config = Reflect.getOwnPropertyDescriptor(App637.prototype, 'run');

      if (config) {
        config.value = undefined;
        Reflect.defineProperty(App637.prototype, 'run', config);
        // console.log('config', Reflect.getOwnPropertyDescriptor(App637.prototype, 'run'));

        const plain = new App637();
        expect(plain.run).toBeUndefined();

        const desc = Reflector(App637).property('run').descriptor;
        if (desc) {
          desc.value = undefined;
        }
        // expect(() => {
        const Agent: typeof App637 = CreateAgent(App637);
        const app = new Agent();
        expect(app).toBeInstanceOf(Agent);
        expect(app).toBeInstanceOf(App637);
        // }).toThrowError(AgentFrameworkError, 'InvalidProperty: App637.run');
      }
    });
  });
});
