import { CreateAgentClass, Reflector } from '../../../../dependencies/core';
import { agent, inject } from '../../../../dependencies/core';

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
      // add service to Registry

      const app = new App621();
      // find service from Registry

      expect(app.service).toBe(service);

      expect(Reflector(App621).property('service').hasOwnAttribute()).toBeTrue();
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

      const Agent626 = CreateAgentClass(App626);

      const app626 = new Agent626();

      expect(() => {
        expect(app626.service).toBeUndefined();
      }).toThrowError('DomainNotFound: Service626');
    });
  });
});
