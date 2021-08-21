import { CreateAgent, Reflector } from '../../../../dependencies/core';
import { InMemoryDomain, agent, inject } from '../../../../dependencies/domain';

describe('Domain @inject() decorator', () => {
  describe('# should able to', () => {
    it('create inject agent', () => {
      @agent()
      class Service621 {
        //
      }

      @agent()
      class App621 {
        @inject()
        readonly service!: Service621;
      }

      const service = new Service621();

      const app = new App621();

      expect(app.service).toBe(service);

      expect(Reflector(App621).property('service').hasOwnAttribute()).toBeTrue();
    });

    it('create inject agent using domain', () => {
      class Service622 {
        //
      }

      class App622 {
        @inject()
        readonly service!: Service622;
      }

      const domain = new InMemoryDomain();

      const service = domain.construct(Service622);

      const app = domain.construct(App622);

      expect(app.service).toBe(service);
    });
  });

  describe('# should not able to', () => {
    it('inject non-existing agent', () => {
      @agent()
      class Service623 {
        //
      }

      @agent()
      class App623 {
        @inject()
        readonly service!: Service623;
      }

      const app = new App623();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('InjectInstanceNotExists: Service623$');
    });

    it('inject non-existing agent using domain', () => {
      class Service624 {
        //
      }

      class App624 {
        @inject()
        readonly service!: Service624;
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App624);

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('InjectInstanceNotExists: Service624');
    });

    it('inject unknown', () => {
      @agent()
      class App625 {
        @inject()
        readonly service: undefined;
      }

      const app = new App625();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownInjectType');
    });

    it('inject without Domain', () => {
      class Service626 {}

      class App626 {
        @inject()
        readonly service!: Service626;
      }

      const Agent626 = CreateAgent(App626);

      const app626 = new Agent626();

      expect(() => {
        expect(app626.service).toBeUndefined();
      }).toThrowError('DomainNotFound: Service626');
    });
  });
});
