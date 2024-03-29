import { Arguments, TypeInvocation } from '../../../src/dependencies/agent';
import { CreateAgent, Initializer, initializable, agent } from '../../../src/dependencies/agent';

describe('6.1. @initializable decorator', () => {
  describe('# should able to', () => {
    it('create static initializable agent', () => {
      @agent()
      @initializable()
      class App611 {
        public name1: string | undefined;
        static get [Initializer]() {
          // console.log('this outside', this.name);
          return function (this: any, target: TypeInvocation, params: Arguments, receiver: typeof App611) {
            // console.log('this inside', this.name);
            // console.log('receiver inside', receiver.name);
            const app = target.invoke<App611>(params, receiver);
            app.name1 = 'App611$';
            return app;
          };
        }
      }

      const app1 = new App611();
      expect(app1).toBeInstanceOf(App611);
      expect(app1.constructor.name).toBe('App611$');
      expect(app1.name1).toBe('App611$');

      const app2 = new App611();
      expect(app2).toBeInstanceOf(App611);
      expect(app2.name1).toBe('App611$');

      const App611Agent = CreateAgent(App611);
      const app3 = new App611Agent();
      expect(app3).toBeDefined();
    });

    it('create initializable agent', () => {
      @agent()
      @initializable()
      class Root612 {
        name: string | undefined;
        root: string | undefined;
        [Initializer]() {
          this.root = 'Root612$';
          this.name = this.root;
        }

        hello() {}
      }

      class Base612 extends Root612 {
        base: string | undefined;
        [Initializer]() {
          super[Initializer]();
          this.base = 'Base612$';
          this.name = this.base;
        }
      }

      @agent()
      class App612 extends Base612 {
        [Initializer]() {
          super[Initializer]();
          this.name = 'App612$';
        }
      }

      class ServiceBase612 extends Base612 {
        service: string | undefined;
      }

      @agent()
      class Service612 extends ServiceBase612 {
        [Initializer]() {
          super[Initializer]();
          this.service = 'Service612$';
          this.name = this.service;
        }
      }

      const app1 = new App612();
      expect(app1).toBeInstanceOf(App612);
      expect(app1.root).toBe('Root612$');
      expect(app1.base).toBe('Base612$');
      expect(app1.name).toBe('App612$');

      const svc1 = new Service612();
      expect(svc1).toBeInstanceOf(Service612);
      expect(svc1.root).toBe('Root612$');
      expect(svc1.base).toBe('Base612$');
      expect(svc1.service).toBe('Service612$');
      expect(svc1.name).toBe('Service612$');

      const app2 = new App612();
      expect(app2).toBeInstanceOf(App612);
      expect(app2.root).toBe('Root612$');
      expect(app2.base).toBe('Base612$');
      expect(app2.name).toBe('App612$');

      const svc2 = new Service612();
      expect(svc2).toBeInstanceOf(Service612);

      expect(svc2.root).toBe('Root612$');
      expect(svc2.base).toBe('Base612$');
      expect(svc2.service).toBe('Service612$');
      expect(svc2.name).toBe('Service612$');

      expect(app1).not.toBe(app2);
      expect(svc1).not.toBe(svc2);
    });

    it('create async initializable agent', async () => {
      @agent()
      @initializable()
      class Root613 {
        name: string | undefined;
        root: string | undefined;
        [Initializer]() {
          this.root = 'Root613$';
          this.name = this.root;
        }
      }

      class Base613 extends Root613 {
        base: string | undefined;
        [Initializer]() {
          this.base = 'Base613$';
          this.name = this.base;
        }
      }

      @agent()
      class App613 extends Base613 {
        [Initializer]() {
          this.name = 'App613$';
        }

        static [Initializer](target: TypeInvocation, params: Arguments, receiver: typeof App613) {
          const ins = target.invoke(params, receiver);
          expect(ins).toBeInstanceOf(target.design.declaringType);
          return Promise.resolve(ins);
        }
      }

      const app1 = await new App613();
      expect(app1).toBeInstanceOf(App613);
      expect(app1.root).toBeUndefined();
      expect(app1.base).toBeUndefined();
      expect(app1.name).toBe('App613$');

      const app2 = await new App613();
      expect(app2).toBeInstanceOf(App613);
      expect(app2.root).toBeUndefined();
      expect(app2.base).toBeUndefined();
      expect(app2.name).toBe('App613$');

      expect(app1).not.toBe(app2);
    });

    it('create class without initializer', () => {
      @agent()
      class App614 {
        name: string | undefined = 'App614';
      }

      const app614 = new App614();

      expect(app614.name).toBe('App614');
      expect(app614).toBeInstanceOf(App614);
    });

    //
    it('create slow static initializable agent', async () => {
      @agent()
      @initializable()
      class App615 {
        public name1: string | undefined;
        static [Initializer](target: TypeInvocation, params: Arguments, receiver: typeof App615) {
          const app = target.invoke<App615>(params, receiver);
          app.name1 = 'App615$';
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(app);
            }, 100);
          });
        }
      }

      const app1 = new App615();
      const app2 = new App615();
      expect(app1).toBeInstanceOf(Promise);
      expect(app2).toBeInstanceOf(Promise);
      expect(app1).not.toBe(app2);

      const a1 = await app1;
      const a2 = await app2;
      expect(a1).not.toBe(a2);
      expect(a1.name1).toBe(a2.name1);
      expect(a1.constructor).toBe(a2.constructor);
    });

    it('create slow static initializable agent after dispose', async () => {
      @agent()
      @initializable()
      class App616 {
        public name1: string | undefined;
        static [Initializer](target: TypeInvocation, params: Arguments, receiver: typeof App616) {
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
      const app1 = new App616();
      const app2 = new App616();
      expect(app1).toBeInstanceOf(Promise);
      expect(app2).toBeInstanceOf(Promise);
      expect(app1).not.toBe(app2);

      const a1 = await app1;
      const a2 = await app2;
      expect(a1).not.toBe(a2);
      expect(a1.name1).toBe(a2.name1);
      expect(a1.constructor).toBe(a2.constructor);

      a1.dispose();
      a2.dispose();

      expect(a1.name1).toBeUndefined();
      expect(a2.name1).toBeUndefined();
    });
  });

  describe('# should not able to', () => {
    it('create agent with invalid class initializer', () => {
      @agent()
      @initializable()
      class App621 {
        static [Initializer] = {};
      }
      expect(() => {
        new App621();
      }).toThrowError('ClassInitializerIsNotFunction');
    });

    it('create agent with null class initializer', () => {
      @agent()
      @initializable()
      class App622 {
        static [Initializer]() {
          return null;
        }
      }
      expect(() => {
        new App622();
      }).toThrowError('ConstructorReturnNonObject');
    });

    it('create agent with undefined class initializer', () => {
      @agent()
      @initializable()
      class App623 {
        static [Initializer]() {}
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

    it('create agent with invalid class initializer', () => {
      @agent()
      @initializable()
      class App624 {
        [Initializer] = 1;
      }
      expect(() => {
        new App624();
      }).toThrowError('InitializerIsNotFunction');
    });
  });
});
