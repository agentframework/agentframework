import { agent } from '../../agent'
import { decorateClassMethod } from '../decorator';
import { IAttribute } from '../attribute';
import { IInterceptor } from '../interceptor';
import { IInvocation } from '../invocation';
import { AgentFeatures } from '../compiler';
import { AgentCompileType } from '../compiler';


describe('core.interceptors.invocation', () => {
  
  describe('# should able to', () => {
    
    it('create agent', () => {
      
      class IncreaseValueAttribute implements IAttribute, IInterceptor {
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          Object.keys(target.target);
          return target.invoke(parameters) + 5000;
        }
        
        getInterceptor() {
          return this;
        }
      }
      
      class InjectClass {
        
        @decorateClassMethod(new IncreaseValueAttribute())
        @decorateClassMethod(new IncreaseValueAttribute())
        test() {
          return 10000;
        }
        
        @decorateClassMethod(new IncreaseValueAttribute())
        @decorateClassMethod(new IncreaseValueAttribute())
        test2() {
          return 20000;
        }
        
      }
      
      @agent({ features: AgentFeatures.Disabled, compile: AgentCompileType.LazyFunction })
      class Tester01 extends InjectClass {
      
      }
      
      @agent({ features: AgentFeatures.Initializer, compile: AgentCompileType.StaticClass })
      class Tester02 extends InjectClass {
      
      }
      
      @agent({ features: AgentFeatures.Interceptor, compile: AgentCompileType.DynamicProxy })
      class Tester03 extends InjectClass {
      
      }
      
      // initializer / interceptors been disabled
      const tester01 = new Tester01();
      expect(tester01.test()).toBe(10000);
      
      // interceptors been disabled
      const tester02 = new Tester02();
      expect(tester02.test2()).toBe(20000);
      
      const tester03 = new Tester03();
      expect(tester03.test2()).toBe(30000);
      expect(tester03 instanceof Tester03).toBe(true);
      
    });
    
  });
  
});
