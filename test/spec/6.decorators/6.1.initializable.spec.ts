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

    it('create async initializable agent', async () => {
      @initializable()
      class Root613 {
        root: string | undefined;
        [Initializer]() {
          this.root = 'Base613$';
        }
      }

      class Base613 extends Root613 {
        base: string | undefined;
        [Initializer]() {
          this.base = 'Base613$';
        }
      }

      class App613 extends Base613 {
        name: string | undefined;
        [Initializer]() {
          this.name = 'App613$';
        }

        static [ClassInitializer](domain: Domain, target: ClassInvocation, params: Arguments, receiver: typeof App613) {
          const ins = target.invoke(params, receiver);
          expect(ins).toBeInstanceOf(target.design.type);
          return Promise.resolve(ins);
        }
      }

      const domain = new InMemoryDomain();

      const app1 = await domain.resolve(App613);
      expect(app1).toBeInstanceOf(App613);
      expect(app1.name).toBe('App613$');

      const domain2 = new InMemoryDomain();

      const app2 = await domain2.resolve(App613);
      expect(app2).toBeInstanceOf(App613);
      expect(app2.name).toBe('App613$');
    });

    it('create class without initializer', () => {
      const domain = new InMemoryDomain();
      @initializable()
      class App614 {
        name: string | undefined = 'App614';
      }

      const app614 = domain.construct(App614);

      expect(app614.name).toBe('App614');
      expect(app614).toBeInstanceOf(App614);
    });

    it('create slow static initializable agent', async () => {
      const domain = new InMemoryDomain();
      @initializable()
      class App615 {
        public name1: string | undefined;
        static [ClassInitializer](domain: Domain, target: ClassInvocation, params: Arguments, receiver: typeof App615) {
          const app = target.invoke<App615>(params, receiver);
          app.name1 = 'App615$';
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(app);
            }, 100);
          });
        }
      }
      const app1 = domain.resolve(App615);
      const app2 = domain.resolve(App615);
      expect(app1 === app2).toBeFalse();
      domain.dispose();
      const a1 = await app1;
      const a2 = await app2;
      expect(a1 === a2).toBeTrue();
      expect(a1.name1).toBe('App615$');
    });

    it('create slow static initializable agent after dispose', async () => {
      const domain = new InMemoryDomain();
      @initializable()
      class App616 {
        public name1: string | undefined;
        static [ClassInitializer](domain: Domain, target: ClassInvocation, params: Arguments, receiver: typeof App616) {
          const app = target.invoke<App616>(params, receiver);
          app.name1 = 'App616$';
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(app);
            }, 100);
          });
        }
        dispose() {
          this.name1 = undefined;
        }
      }
      const app1 = domain.resolve(App616);
      const app2 = domain.resolve(App616);
      expect(app1 === app2).toBeFalse();
      domain.dispose();
      const a1 = await app1;
      const a2 = await app2;
      expect(a1 === a2).toBeTrue();
      expect(a1.name1).toBeUndefined();
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
