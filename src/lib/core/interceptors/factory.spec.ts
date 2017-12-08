import { agent } from '../../agent'
import { AgentCompileType, decorateAgent, decorateClassMethod, decorateClassProperty } from '../decorator';
import { IAttribute } from '../attribute';
import { IInterceptor } from '../interceptor';
import { IInvocation } from '../invocation';


describe('@factory', () => {
  
  describe('# should able to', () => {
    
    it('create agent', () => {
      
      function fake() {
        return decorateClassMethod(new FakeInjectAttribute())
      }
      
      class FakeInjectAttribute implements IAttribute, IInterceptor {
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          throw new Error('Not support');
        }
        
        getInterceptor() {
          return null;
        }
      }
      
      class InjectClass {
        @fake()
        hijack(): any {
        
        }
      }
      
      @agent({ compile: AgentCompileType.LazyFunction })
      class FakeAgent extends InjectClass {
      
      }
      
      new FakeAgent();
      const fa = new FakeAgent();
      expect(fa instanceof FakeAgent).toBe(true);
    });
    
  });
  
});
