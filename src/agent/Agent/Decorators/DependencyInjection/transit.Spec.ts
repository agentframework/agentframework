import { Reflector, agent, transit } from '../../../../dependencies/agent';
import { TransitAttribute } from './TransitAttribute';

describe('Core @transit() decorator', () => {
  describe('# should able to', () => {
    it('create agent with @transit()', () => {
      class CoreTransitDecoratorService1 {
        //
      }

      @agent()
      class CoreTransitDecoratorApp1 {
        @transit()
        readonly service!: CoreTransitDecoratorService1;
        @transit(CoreTransitDecoratorService1)
        readonly service2!: any;
      }

      const app = new CoreTransitDecoratorApp1();

      expect(app.service).toBeInstanceOf(CoreTransitDecoratorService1);
      expect(app.service2).toBeInstanceOf(CoreTransitDecoratorService1);
      expect(app.service2).not.toBe(app.service);

      // test metadata
      const property = Reflector(CoreTransitDecoratorApp1).property('service');
      expect(property.hasAttribute()).toBeTrue();
      expect(property.hasAttribute(TransitAttribute)).toBeTrue();
      expect(property.getAttributes().length).toBe(1);
      expect(property.getAttribute(TransitAttribute)).toBeInstanceOf(TransitAttribute);
      expect(property.getAttribute(TransitAttribute)!.type).toBeUndefined();
      expect(property.hasOwnInterceptor()).toBeTrue();
      expect(property.hasOwnInterceptor()).toBeTrue();
    });
  });

  describe('# should not able to', () => {
    it('create transit agent with unknown type', () => {
      @agent()
      class CoreTransitDecoratorApp2 {
        @transit()
        readonly service: undefined;
      }

      const app = new CoreTransitDecoratorApp2();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownTransitType');
    });
  });
});
