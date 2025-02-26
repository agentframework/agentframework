import { Reflector, agent, transit } from '../../../src/dependencies/agent';

describe('6.4. @transit decorator', () => {
  describe('# should able to', () => {
    it('create agent', () => {

      // this test ensure the transit attribute works

      class Service641 {
        //
      }

      //console.log('app1', Service641)

      @agent()
      class App641 {
        @transit()
        readonly service!: Service641;
        @transit(Service641)
        readonly service2!: any;
      }

      //console.log('app2', App641)

      const app = new App641();

      //console.log('app4', Reflector(App641))

      //console.log('app5', app)

      let base: any = App641.prototype;
      while(base) {
        //console.log('--->', base, Reflector(base));

        base = Reflect.getPrototypeOf(base);
      }

      expect(app.service).toBeInstanceOf(Service641);
      expect(app.service2).toBeInstanceOf(Service641);
      expect(app.service2).not.toBe(app.service);

      expect(Reflector(App641).property('service').hasOwnAttribute()).toBeTrue();
    });

    // it('create agent with domain', () => {
    //   class Service642 {
    //     //
    //   }
    //
    //   class App642 {
    //     @transit()
    //     readonly service!: Service642;
    //     @transit(Service642)
    //     readonly service2!: any;
    //   }
    //
    //
    //   const App = CreateAgent(App642);
    //   const app = new App();
    //
    //   expect(app.service).toBeInstanceOf(Service642);
    //   expect(app.service2).toBeInstanceOf(Service642);
    //   expect(app.service2).not.toBe(app.service);
    // });
    //
    // it('create agent without Domain', () => {
    //   class Service643 {}
    //
    //   class App643 {
    //     @transit()
    //     readonly service!: Service643;
    //     @transit()
    //     readonly service2!: Service643;
    //   }
    //
    //   const Agent626 = CreateAgent(App643);
    //
    //   const app626 = new Agent626();
    //
    //   expect(app626.service).toBeInstanceOf(Service643);
    //   expect(app626.service2).toBeInstanceOf(Service643);
    //   expect(app626.service2).not.toBe(app626.service);
    // });
  });

  describe('# should not able to', () => {
    // it('create transit agent with unknown type', () => {
    //   @agent()
    //   class App644 {
    //     constructor() {
    //       console.log('ctor')
    //     }
    //     @transit()
    //     readonly service: undefined;
    //   }
    //
    //   console.log('App644', App644)
    //
    //   const app = new App644();
    //   expect(() => {
    //     expect(app.service).toBeUndefined();
    //   }).toThrowError('UnknownTransitType');
    // });
  });
});
