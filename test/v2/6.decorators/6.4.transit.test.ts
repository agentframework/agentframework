import { InMemoryDomain, agent, transit } from '../../../src/dependencies/domain';
import { CreateAgent, Reflector } from '../../../src/dependencies/core';

describe('6.4. @transit decorator', () => {
  describe('# should able to', () => {
    it('create agent', () => {
      class Service641 {
        //
      }

      @agent()
      class App641 {
        @transit()
        readonly service!: Service641;
        @transit(Service641)
        readonly service2!: any;
      }

      const app = new App641();

      expect(app.service).toBeInstanceOf(Service641);
      expect(app.service2).toBeInstanceOf(Service641);
      expect(app.service2).not.toBe(app.service);

      expect(Reflector(App641).property('service').hasOwnAttribute()).toBeTrue();
    });

    it('create agent with domain', () => {
      class Service642 {
        //
      }

      class App642 {
        @transit()
        readonly service!: Service642;
        @transit(Service642)
        readonly service2!: any;
      }

      const domain = new InMemoryDomain();

      const app = domain.construct(App642);

      expect(app.service).toBeInstanceOf(Service642);
      expect(app.service2).toBeInstanceOf(Service642);
      expect(app.service2).not.toBe(app.service);
    });

    it('create agent without Domain', () => {
      class Service643 {}

      class App643 {
        @transit()
        readonly service!: Service643;
        @transit()
        readonly service2!: Service643;
      }

      const Agent626 = CreateAgent(App643);

      const app626 = new Agent626();

      expect(app626.service).toBeInstanceOf(Service643);
      expect(app626.service2).toBeInstanceOf(Service643);
      expect(app626.service2).not.toBe(app626.service);
    });
  });

  describe('# should not able to', () => {
    it('create transit agent with unknown type', () => {
      @agent()
      class App644 {
        @transit()
        readonly service: undefined;
      }

      const app = new App644();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownTransitType');
    });
  });
});
