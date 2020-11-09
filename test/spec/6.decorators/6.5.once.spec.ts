import { InMemoryDomain, agent, CreateAgent, once, Reflector, OnceAttribute } from '../../../lib';

describe('6.5. @once decorator', () => {
  describe('# should able to', () => {
    it('create agent', () => {
      let count = 0;
      class Service651 {
        constructor() {
          count++;
        }
      }

      @agent()
      class App651 {
        @once()
        get service(): Service651 {
          return new Service651();
        }
      }

      const app = new App651();

      expect(app.service).toBeInstanceOf(Service651);
      expect(app.service).toBe(app.service);
      expect(count).toBe(1);

      expect(Reflector(App651).property('service').hasOwnAttribute(OnceAttribute)).toBeTrue();
    });

    it('create agent with domain', () => {
      let count = 0;
      class Service652 {
        constructor() {
          count++;
        }
      }

      class App652 {
        @once()
        get service(): Service652 {
          return new Service652();
        }
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App652);

      expect(app.service).toBe(app.service);
      expect(count).toBe(1);
    });

    it('create agent without Domain', () => {
      let count = 0;
      class Service653 {
        constructor() {
          count++;
        }
      }

      class App653 {
        @once()
        get service(): Service653 {
          return new Service653();
        }
      }

      const Agent653 = CreateAgent(App653);

      const app653 = new Agent653();

      expect(app653.service).toBeInstanceOf(Service653);
      expect(count).toBe(1);
    });
  });

  describe('# should not able to', () => {
    it('create agent on method', () => {
      @agent()
      class App654 {
        @once()
        find() {
          return [];
        }

        @once()
        set value(v: any) {}
      }

      const app = new App654();

      expect(() => {
        expect(app.find()).toBeUndefined();
      }).toThrowError('OnceOnlyAvailableOnGetter');

      expect(() => {
        app.value = 1;
      }).toThrowError('OnceOnlyAvailableOnGetter');
    });
  });
});
