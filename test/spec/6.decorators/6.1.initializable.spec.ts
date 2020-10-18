import { InMemoryDomain, Domain, initializable, ClassInitializer, Initializer, CreateAgent } from '../../../lib';
import { Arguments, ClassInvocation } from '../../../lib';

describe('6.1. @initializable decorator', () => {
  describe('# should able to', () => {
    it('create static initializable agent', () => {
      const domain = new InMemoryDomain();
      @initializable()
      class App611 {
        public name1: string | undefined;
        static [ClassInitializer](domain: Domain, target: ClassInvocation, params: Arguments, receiver: typeof App611) {
          const app = target.invoke<App611>(params, receiver);
          app.name1 = 'App611$';
          return app;
        }
      }
      const app1 = domain.construct(App611);
      expect(app1).toBeInstanceOf(App611);
      expect(app1.name1).toBe('App611$');

      const app2 = domain.construct(App611);
      expect(app2).toBeInstanceOf(App611);
      expect(app2.name1).toBe('App611$');

      const App611Agent = CreateAgent(App611);
      const app3 = new App611Agent();
      expect(app3).toBeDefined();
    });

    it('create initializable agent', () => {
      class Root612 {
        root: string | undefined;
        [Initializer]() {
          this.root = 'Base612$';
        }
      }

      class Base612 extends Root612 {
        base: string | undefined;
        [Initializer]() {
          this.base = 'Base612$';
        }
      }

      @initializable()
      class App612 extends Base612 {
        name: string | undefined;
        [Initializer]() {
          this.name = 'App612$';
        }
      }

      class ServiceBase612 extends Base612 {
        base: string | undefined;
        [Initializer]() {
          this.base = 'SericeBase612$';
        }
      }

      @initializable()
      class Service612 extends ServiceBase612 {
        name: string | undefined;
        [Initializer]() {
          this.name = 'Service612$';
        }
      }
      const domain = new InMemoryDomain();

      const app1 = domain.construct(App612);
      expect(app1).toBeInstanceOf(App612);
      expect(app1.name).toBe('App612$');

      const svc1 = domain.construct(Service612);
      expect(svc1).toBeInstanceOf(Service612);
      expect(svc1.name).toBe('Service612$');

      const domain2 = new InMemoryDomain();

      const app2 = domain2.construct(App612);
      expect(app2).toBeInstanceOf(App612);
      expect(app2.name).toBe('App612$');

      const svc2 = domain2.construct(Service612);
      expect(svc2).toBeInstanceOf(Service612);
      expect(svc2.name).toBe('Service612$');
    });
  });

  describe('# should not able to', () => {
    it('create invalid class initializer  agent', () => {
      const domain = new InMemoryDomain();
      @initializable()
      class App612 {
        name: string | undefined;
        static [ClassInitializer] = {};
      }
      expect(() => {
        domain.construct(App612);
      }).toThrowError('ClassInitializerMustFunction');
    });
  });
});
