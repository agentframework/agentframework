import { agent } from '../../agent'
import {
  AgentCompileType, AgentFeatures, decorateAgent, decorateClassMethod,
  decorateClassProperty
} from '../decorator';
import { IAttribute } from '../attribute';
import { IInterceptor } from '../interceptor';
import { IInvocation } from '../invocation';
import { IInitializer } from '../initializer';


describe('@factory', () => {

  describe('# should able to', () => {

    it('create agent', () => {

      class FakeInterceptorAttribute implements IAttribute, IInterceptor, IInitializer {
        initialize(target: IInvocation, parameters: ArrayLike<any>): any {
          return 10;
        }
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          throw new Error('Not support');
        }
        getInterceptor() {
          return null;
        }
        getInitializer() {
          return this;
        }
      }

      class FakeInitializerAttribute implements IAttribute, IInterceptor, IInitializer {
        initialize(target: IInvocation, parameters: ArrayLike<any>): any {
          return null;
        }
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          throw new Error('Not support');
        }
        getInterceptor() {
          return null;
        }
        getInitializer() {
          return this;
        }
      }

      class IncreaseValueAttribute implements IAttribute, IInterceptor {
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          Object.keys(target.target);
          return target.invoke(parameters) + 50000;
        }
        getInterceptor() {
          return this;
        }
      }

      class ConsoleClassAttribute implements IAttribute, IInterceptor {
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          Object.keys(target.target);
          return target.invoke(parameters);
        }
        getInterceptor() {
          return this;
        }
      }

      class InjectClass {
        @decorateClassProperty(new FakeInterceptorAttribute())
        hijack: any;

        @decorateClassProperty(new FakeInitializerAttribute())
        notInitialed: any;

        @decorateClassMethod(new IncreaseValueAttribute())
        @decorateClassMethod(new IncreaseValueAttribute())
        test() {
          return 10000;
        }
      }

      @agent({ features: AgentFeatures.Disabled, compile: AgentCompileType.LazyFunction })
      class DisabledAgent extends InjectClass {

      }
      @agent({ features: AgentFeatures.Initializer, compile: AgentCompileType.StaticClass })
      class InitializerAgent extends InjectClass {

      }

      @agent({ features: AgentFeatures.Interceptor, compile: AgentCompileType.DynamicProxy, attribute: new ConsoleClassAttribute() })
      class InterceptorAgent extends InjectClass {

      }

      new InitializerAgent();
      new DisabledAgent();
      const fa = new InterceptorAgent();

      console.log('sum:', fa.test());

      expect(fa instanceof InterceptorAgent).toBe(true);
    });

  });

});
