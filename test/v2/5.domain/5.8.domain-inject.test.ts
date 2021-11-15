import { Reflector, CreateAgent } from '../../../src/dependencies/agent';
import { InMemoryDomain, agent, inject } from '../../../src/dependencies/domain';

describe('5.8. Domain @inject decorator', () => {
  describe('# should able to', () => {
    it('create inject agent', () => {
      @agent()
      class Service581 {
        //
      }

      @agent()
      class App581 {
        @inject()
        readonly service!: Service581;
      }

      const service = new Service581();

      const app = new App581();

      expect(app.service).toBe(service);
      expect(app.service).toBe(service); // cached

      expect(Reflector(App581).property('service').hasOwnAttribute()).toBeTrue();
    });

    it('create inject agent using domain', () => {
      class Service582 {
        //
      }

      class App582 {
        @inject()
        readonly service!: Service582;
      }

      const domain = new InMemoryDomain();

      const service = domain.construct(Service582);

      const app = domain.construct(App582);

      expect(app.service).toBe(service);
    });
  });

  describe('# should not able to', () => {
    it('inject non-existing agent', () => {
      @agent()
      class Service583 {
        //
      }

      @agent()
      class App583 {
        @inject()
        readonly service!: Service583;
      }

      const app = new App583();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('InjectInstanceNotExists: Service583$');
    });

    it('inject non-existing agent using domain', () => {
      class Service584 {
        //
      }

      class App584 {
        @inject()
        readonly service!: Service584;
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App584);

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('InjectInstanceNotExists: Service584');
    });

    it('inject unknown', () => {
      @agent()
      class App585 {
        @inject()
        readonly service: undefined;
      }

      const app = new App585();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownInjectType');
    });

    it('inject without Domain', () => {
      class Service586 {}

      class App586 {
        @inject()
        readonly service!: Service586;
      }

      const Agent586 = CreateAgent(App586);

      const app586 = new Agent586();

      expect(() => {
        expect(app586.service).toBeUndefined();
      }).toThrowError('DomainNotFound: Service586');
    });

    it('modify inject value', () => {
      class Service586 {}

      @agent()
      class App586 {
        @inject()
        service?: Service586;
      }

      const app = new App586();

      expect(() => {
        app.service = new Service586();
      }).toThrowError('NotAllowModifyTransitVariable');
    });
  });
});
