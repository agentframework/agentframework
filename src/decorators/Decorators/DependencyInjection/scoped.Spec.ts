import { agent, scoped } from 'agentframework';
import { GetAgentType, GetType, Reflector } from '@agentframework/agent';
import { ScopedAttribute } from './ScopedAttribute';

describe('Core @scoped() decorator', () => {
  describe('# should able to', () => {
    it('create agent with @scoped()', () => {
      class CoreScopedDecoratorService1 {
        //
      }

      @agent()
      class CoreScopedDecoratorApp1 {
        @scoped()
        readonly service!: CoreScopedDecoratorService1;
        @scoped(CoreScopedDecoratorService1)
        readonly service2!: any;
      }

      const app = new CoreScopedDecoratorApp1();

      expect(app.service).toBeInstanceOf(CoreScopedDecoratorService1);
      expect(app.service2).toBeInstanceOf(CoreScopedDecoratorService1);
      expect(app.service2).toBe(app.service);

      // test metadata
      const property = Reflector(CoreScopedDecoratorApp1).property('service');
      expect(property.hasOwnAttribute()).toBeTrue();
      expect(property.hasOwnAttribute(ScopedAttribute)).toBeTrue();
      expect(property.getOwnAttributes().length).toBe(1);
      expect(property.getOwnAttribute(ScopedAttribute)).toBeInstanceOf(ScopedAttribute);
      expect(property.getOwnAttribute(ScopedAttribute)!.type).toBeUndefined();
      expect(property.hasOwnInterceptor()).toBeTrue();
      expect(property.hasOwnInterceptor()).toBeTrue();
    });

    it('create agent with @scoped()', () => {
      @agent()
      class CoreScopedDecoratorService2 {
        //
      }

      @agent()
      class CoreScopedDecoratorApp2 {
        @scoped()
        readonly service!: CoreScopedDecoratorService2;
        @scoped(CoreScopedDecoratorService2)
        readonly service2!: any;
      }

      expect(GetType(CoreScopedDecoratorApp2)).toBeDefined();
      expect(GetAgentType(CoreScopedDecoratorApp2)).toBeDefined();
      expect(GetType(CoreScopedDecoratorApp2)).toBe(GetAgentType(CoreScopedDecoratorApp2));

      const app = new CoreScopedDecoratorApp2();

      expect(app.service).toBeInstanceOf(GetType(CoreScopedDecoratorService2)!);
      expect(app.service2).toBeInstanceOf(GetAgentType(CoreScopedDecoratorService2)!);
      expect(app.service2).toBe(app.service);

      // test metadata
      const property = Reflector(CoreScopedDecoratorApp2).property('service');
      expect(property.hasOwnAttribute()).toBeTrue();
      expect(property.hasOwnAttribute(ScopedAttribute)).toBeTrue();
      expect(property.getOwnAttributes().length).toBe(1);
      expect(property.getOwnAttribute(ScopedAttribute)).toBeInstanceOf(ScopedAttribute);
      expect(property.getOwnAttribute(ScopedAttribute)!.type).toBeUndefined();
      expect(property.hasOwnInterceptor()).toBeTrue();
      expect(property.hasOwnInterceptor()).toBeTrue();
    });
  });

  describe('# should not able to', () => {
    it('create singleton agent with unknown type', () => {
      @agent()
      class CoreScopedDecoratorApp2 {
        @scoped()
        readonly service: undefined;
      }

      const app = new CoreScopedDecoratorApp2();

      expect(() => {
        expect(app.service).toBeUndefined();
      }).toThrowError('UnknownScopedType');
    });

    it('change singleton agent', () => {
      class CoreSingletonService3 {
      }

      @agent()
      class CoreScopedDecoratorApp3 {
        @scoped()
        service?: CoreSingletonService3;
      }

      const app = new CoreScopedDecoratorApp3();

      expect(() => {
        app.service = new CoreSingletonService3();
      }).toThrowError('NotAllowModifyScopedVariable');
    });
  });
});
