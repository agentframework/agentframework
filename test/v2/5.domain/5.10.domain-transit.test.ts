import { InMemoryDomain, agent, transit } from '../../../packages/dependencies/domain';
import { CreateAgent, Reflector } from '../../../packages/dependencies/agent';

describe('5.10. @transit decorator', () => {
  describe('# should able to', () => {
    it('create agent', () => {
      class Service5101 {
        //
      }

      @agent()
      class App5101 {
        @transit()
        readonly service!: Service5101;
        @transit(Service5101)
        readonly service2!: any;
      }

      const app = new App5101();

      expect(app.service).toBeInstanceOf(Service5101);
      expect(app.service2).toBeInstanceOf(Service5101);
      expect(app.service2).not.toBe(app.service);

      expect(Reflector(App5101).property('service').hasOwnAttribute()).toBeTrue();
    });

    it('create agent with domain', () => {
      class Service5102 {
        //
      }

      class App5102 {
        @transit()
        readonly service!: Service5102;
        @transit(Service5102)
        readonly service2!: any;
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App5102);

      expect(app.service).toBeInstanceOf(Service5102);
      expect(app.service2).toBeInstanceOf(Service5102);
      expect(app.service2).not.toBe(app.service);
    });


  });

  describe('# should not able to', () => {

    it('create agent without Domain', () => {
      class Service5103 {}

      class App5103 {
        @transit()
        readonly service!: Service5103;
        @transit()
        readonly service2!: Service5103;
      }

      const Agent626 = CreateAgent(App5103);

      const app626 = new Agent626();

      expect(()=> {
        expect(app626.service).toBeInstanceOf(Service5103);
        expect(app626.service2).toBeInstanceOf(Service5103);
        expect(app626.service2).not.toBe(app626.service);
      }).toThrowError('NoDomainFoundForTransitInjection');

    });

    it('create transit agent with unknown type', () => {
      @agent()
      class App5104 {
        @transit()
        readonly service: undefined;
      }

      const app = new App5104();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownTransitType');
    });

    it('modify transit value', () => {
      class Service5105 {}

      @agent()
      class App5105 {
        @transit()
        service?: Service5105;
      }

      const app = new App5105();

      expect(() => {
        app.service = new Service5105();
      }).toThrowError('NotAllowModifyTransitVariable');
    });
  });
});
