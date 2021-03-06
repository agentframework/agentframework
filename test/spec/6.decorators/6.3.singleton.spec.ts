import {
  InMemoryDomain,
  agent,
  singleton,
  decorateMember,
  Arguments,
  PropertyInvocation,
  Reflector,
  SingletonAttribute,
  AgentFrameworkError
} from '../../../lib';
import { CreateAgent } from '../../../src/core';

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
      expect(
        Reflector(App631)
          .property('service')
          .hasOwnAttribute(SingletonAttribute)
      ).toBeTrue();
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

      const domain = new InMemoryDomain();

      const app = domain.construct(App632);

      expect(app.service).toBeInstanceOf(Service632);
      expect(app.service2).toBe(app.service);
    });

    it('create singleton agent in domain', () => {
      class Service632 {
        //
      }

      class App632 extends InMemoryDomain {
        @singleton()
        readonly service!: Service632;
        @singleton(Service632)
        readonly service2!: any;
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App632);

      expect(app.service).toBeInstanceOf(Service632);
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

      const Agent626 = CreateAgent(App634);

      const app626 = new Agent626();

      expect(() => {
        expect(app626.service).toBeUndefined();
      }).toThrowError('NoDomainFoundForSingletonInjection');
    });

    it('create singleton using invalid receiver', () => {
      const domain = new InMemoryDomain();

      class Service635 {
        //
      }

      class App635 {
        @singleton()
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: App635): any {
              expect(params.length).toBe(1);
              expect(params[0].constructor.name).toBe('Service635$');
              expect(receiver.constructor.name).toBe('App635$');
              const ret = target.invoke([domain], undefined);
              console.log('ret', ret);
              return ret;
            }
          }
        })
        readonly service!: Service635;
      }

      const app = domain.construct(App635);

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError(AgentFrameworkError, 'InvalidReceiver');
    });

    it('create singleton using invalid receiver', () => {
      const domain = new InMemoryDomain();

      class Service636 {
        //
      }

      class App636 {
        @decorateMember({
          interceptor: {
            intercept(target: PropertyInvocation, params: Arguments, receiver: any): any {
              return target.invoke([receiver], undefined);
            }
          }
        })
        @singleton()
        readonly service!: Service636;
      }

      const app = domain.construct(App636);

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError(AgentFrameworkError, 'NoDomainFoundForSingletonInjection');
    });
  });
});
