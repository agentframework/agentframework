import { InMemoryDomain } from '../../../packages/dependencies/domain';
import { Arguments, CreateAgent, TypeInvocation } from '../../../packages/dependencies/agent';
import { agent, initializable, Initializer } from 'agentframework';

describe('5.7. Domain @initializable decorator', () => {
  describe('# should able to', () => {
    it('create static initializable agent', () => {
      // const domain = new InMemoryDomain();

      @agent()
      @initializable()
      class App571 {
        public name1: string | undefined;

        static get [Initializer]() {
          // console.log('this outside', this.name);
          return function (this: any, target: TypeInvocation, params: Arguments, receiver: typeof App571) {
            // console.log('this inside', this.name);
            // console.log('receiver inside', receiver.name);
            const app = target.invoke<App571>(params, receiver);
            app.name1 = 'App571$';
            return app;
          };
        }
      }

      const app1 = new App571(); //domain.construct(App571);
      expect(app1).toBeInstanceOf(App571);
      expect(app1.name1).toBe('App571$');

      const app2 = new App571(); //domain.construct(App571);
      expect(app2).toBeInstanceOf(App571);
      expect(app2.name1).toBe('App571$');

      const App571Agent = CreateAgent(App571);
      const app3 = new App571Agent();
      expect(app3).toBeDefined();
    });

    it('create initializable agent', () => {
      @agent()
      @initializable()
      class Root572 {
        name: string | undefined;
        root: string | undefined;

        [Initializer]() {
          this.root = 'Root572$';
          this.name = this.root;
        }

        hello() {
        }
      }

      class Base572 extends Root572 {
        base: string | undefined;

        [Initializer]() {
          super[Initializer]();
          this.base = 'Base572$';
          this.name = this.base;
        }
      }

      class App572 extends Base572 {
        [Initializer]() {
          super[Initializer]();
          this.name = 'App572$';
        }
      }

      class ServiceBase572 extends Base572 {
        service: string | undefined;
      }

      class Service572 extends ServiceBase572 {
        [Initializer]() {
          super[Initializer]();
          this.service = 'Service572$';
          this.name = this.service;
        }
      }

      const domain = new InMemoryDomain();

      const app1 = domain.construct(App572);
      expect(app1).toBeInstanceOf(App572);
      expect(app1.root).toBe('Root572$');
      expect(app1.base).toBe('Base572$');
      expect(app1.name).toBe('App572$');

      const svc1 = domain.construct(Service572);
      expect(svc1).toBeInstanceOf(Service572);
      expect(svc1.root).toBe('Root572$');
      expect(svc1.base).toBe('Base572$');
      expect(svc1.service).toBe('Service572$');
      expect(svc1.name).toBe('Service572$');

      const domain2 = new InMemoryDomain();

      const app2 = domain2.construct(App572);
      expect(app2).toBeInstanceOf(App572);
      expect(app2.root).toBe('Root572$');
      expect(app2.base).toBe('Base572$');
      expect(app2.name).toBe('App572$');

      const svc2 = domain2.construct(Service572);
      expect(svc2).toBeInstanceOf(Service572);

      expect(svc2.root).toBe('Root572$');
      expect(svc2.base).toBe('Base572$');
      expect(svc2.service).toBe('Service572$');
      expect(svc2.name).toBe('Service572$');

      expect(app1).not.toBe(app2);
      expect(svc1).not.toBe(svc2);
    });

    it('create async initializable agent', async () => {
      @agent()
      @initializable()
      class Root573 {
        name: string | undefined;
        root: string | undefined;

        [Initializer]() {
          this.root = 'Root573$';
          this.name = this.root;
        }
      }

      class Base573 extends Root573 {
        base: string | undefined;

        [Initializer]() {
          super[Initializer]();
          this.base = 'Base573$';
          this.name = this.base;
        }
      }

      class App573 extends Base573 {
        [Initializer]() {
          super[Initializer]();
          this.name = 'App573$';
        }

        static [Initializer](target: TypeInvocation, params: Arguments, receiver: typeof App573) {
          const ins = target.invoke(params, receiver);
          expect(ins).toBeInstanceOf(target.design.declaringType);
          return Promise.resolve(ins);
        }
      }

      const domain = new InMemoryDomain();

      const app1 = await domain.resolve(App573);
      expect(app1).toBeInstanceOf(App573);
      expect(app1.root).toBe('Root573$');
      expect(app1.base).toBe('Base573$');
      expect(app1.name).toBe('App573$');

      const domain2 = new InMemoryDomain();

      const app2 = await domain2.resolve(App573);
      expect(app2).toBeInstanceOf(App573);
      expect(app2.root).toBe('Root573$');
      expect(app2.base).toBe('Base573$');
      expect(app2.name).toBe('App573$');

      expect(app1).not.toBe(app2);
    });

    it('create class without initializer', () => {
      const domain = new InMemoryDomain();

      // @initializable()
      class App574 {
        name: string | undefined = 'App574';
      }

      const app574 = domain.construct(App574);

      expect(app574.name).toBe('App574');
      expect(app574).toBeInstanceOf(App574);
    });

    it('create slow static initializable agent', async () => {
      const domain = new InMemoryDomain();

      @initializable()
      class App575 {
        public name1: string | undefined;

        static [Initializer](target: TypeInvocation, params: Arguments, receiver: typeof App575) {
          const app = target.invoke<App575>(params, receiver);
          app.name1 = 'App575$';
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(app);
            }, 100);
          });
        }
      }

      const app1 = domain.resolve(App575);
      const app2 = domain.resolve(App575);
      expect(app1 === app2).toBeFalse();
      domain.dispose();
      const a1 = await app1;
      const a2 = await app2;
      expect(a1 === a2).toBeTrue();
      expect(a1.name1).toBe('App575$');
    });

    it('create slow static initializable agent after dispose', async () => {
      const domain = new InMemoryDomain();

      @initializable()
      class App576 {
        public name1: string | undefined;

        static [Initializer](target: TypeInvocation, params: Arguments, receiver: typeof App576) {
          const app = target.invoke<App576>(params, receiver);
          app.name1 = 'App576$';
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

      const promise1 = domain.resolve(App576);
      const promise2 = domain.resolve(App576);
      expect(promise1 === promise2).toBeFalse();
      const a1 = await promise1;
      const a2 = await promise2;
      expect(a1 === a2).toBeTrue();
      expect(a1.name1).toBe('App576$');
      domain.dispose();
      expect(a1.name1).toBeUndefined();
    });
  });

  describe('# should not able to', () => {
    it('create agent with invalid class initializer', () => {
      const domain = new InMemoryDomain();

      @initializable()
      class App621 {
        static [Initializer] = {};
      }

      expect(() => {
        domain.construct(App621);
      }).toThrowError('ClassInitializerIsNotFunction');
    });

    it('create agent with null class initializer', () => {
      const domain = new InMemoryDomain();

      @initializable()
      class App622 {
        static [Initializer]() {
          return null;
        }
      }

      expect(() => {
        domain.construct(App622);
      }).toThrowError('ConstructorReturnNonObject');
    });

    it('create agent with undefined class initializer', () => {
      @agent()
      @initializable()
      class App623 {
        static [Initializer]() {
        }
      }

      expect(() => {
        new App623();
      }).toThrowError('ConstructorReturnNonObject');
    });

    it('create agent with number class initializer', () => {
      @agent()
      @initializable()
      class App623 {
        static [Initializer]() {
          return 1;
        }
      }

      expect(() => {
        new App623();
      }).toThrowError('ConstructorReturnNonObject');
    });
  });
});
