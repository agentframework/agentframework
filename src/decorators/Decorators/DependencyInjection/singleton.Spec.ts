import { agent, singleton } from 'agentframework';
import { GetAgentType, GetType, Reflector } from '../../../../packages/dependencies/agent';
import { SingletonAttribute } from './SingletonAttribute';

describe('Core @singleton() decorator', () => {
  describe('# should able to', () => {
    it('create agent with @singleton()', () => {
      class CoreSingletonDecoratorService1 {
        //
      }

      @agent()
      class CoreSingletonDecoratorApp1 {
        @singleton()
        readonly service!: CoreSingletonDecoratorService1;
        @singleton(CoreSingletonDecoratorService1)
        readonly service2!: any;
      }

      const app = new CoreSingletonDecoratorApp1();

      expect(app.service).toBeInstanceOf(CoreSingletonDecoratorService1);
      expect(app.service2).toBeInstanceOf(CoreSingletonDecoratorService1);
      expect(app.service2).toBe(app.service);

      // test metadata
      const property = Reflector(CoreSingletonDecoratorApp1).property('service');
      expect(property.hasOwnAttribute()).toBeTrue();
      expect(property.hasOwnAttribute(SingletonAttribute)).toBeTrue();
      expect(property.getOwnAttributes().length).toBe(1);
      expect(property.getOwnAttribute(SingletonAttribute)).toBeInstanceOf(SingletonAttribute);
      expect(property.getOwnAttribute(SingletonAttribute)!.type).toBeUndefined();
      expect(property.hasOwnInterceptor()).toBeTrue();
      expect(property.hasOwnInterceptor()).toBeTrue();
    });

    it('create agent with @singleton()', () => {
      @agent()
      class CoreSingletonDecoratorService2 {
        //
      }

      @agent()
      class CoreSingletonDecoratorApp2 {
        @singleton()
        readonly service!: CoreSingletonDecoratorService2;
        @singleton(CoreSingletonDecoratorService2)
        readonly service2!: any;
      }

      expect(GetType(CoreSingletonDecoratorApp2)).toBeDefined();
      expect(GetAgentType(CoreSingletonDecoratorApp2)).toBeDefined();
      expect(GetType(CoreSingletonDecoratorApp2)).toBe(GetAgentType(CoreSingletonDecoratorApp2));

      const app = new CoreSingletonDecoratorApp2();

      expect(app.service).toBeInstanceOf(GetType(CoreSingletonDecoratorService2)!);
      expect(app.service2).toBeInstanceOf(GetAgentType(CoreSingletonDecoratorService2)!);
      expect(app.service2).toBe(app.service);

      // test metadata
      const property = Reflector(CoreSingletonDecoratorApp2).property('service');
      expect(property.hasOwnAttribute()).toBeTrue();
      expect(property.hasOwnAttribute(SingletonAttribute)).toBeTrue();
      expect(property.getOwnAttributes().length).toBe(1);
      expect(property.getOwnAttribute(SingletonAttribute)).toBeInstanceOf(SingletonAttribute);
      expect(property.getOwnAttribute(SingletonAttribute)!.type).toBeUndefined();
      expect(property.hasOwnInterceptor()).toBeTrue();
      expect(property.hasOwnInterceptor()).toBeTrue();
    });
  });

  describe('# should not able to', () => {
    it('create singleton agent with unknown type', () => {
      @agent()
      class CoreSingletonDecoratorApp2 {
        @singleton()
        readonly service: undefined;
      }

      const app = new CoreSingletonDecoratorApp2();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownSingletonType');
    });

    it('change singleton agent', () => {
      class CoreSingletonService3 {
      }

      @agent()
      class CoreSingletonDecoratorApp3 {
        @singleton()
        service?: CoreSingletonService3;
      }

      const app = new CoreSingletonDecoratorApp3();

      expect(() => {
        app.service = new CoreSingletonService3();
      }).toThrowError('NotAllowModifySingletonVariable');
    });
  });
});
