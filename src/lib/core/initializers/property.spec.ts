import { agent } from '../../agent'
import {
  AgentCompileType, AgentFeatures, decorateAgent, decorateClassMethod,
  decorateClassProperty
} from '../decorator';
import { IAttribute } from '../attribute';
import { IInterceptor } from '../interceptor';
import { IInvocation } from '../invocation';
import { IInitializer } from '../initializer';

class InterceptorAttribute implements IAttribute, IInterceptor {
  intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    Object.keys(target.target);
    return target.invoke(parameters);
  }
  getInterceptor() {
    return this;
  }
}

class InitializerAttribute implements IAttribute, IInitializer {
  public initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    Object.keys(target.target);
    return target.invoke(parameters);
  }
  getInitializer() {
    return this;
  }
}

class Base {

}

describe('interceptor / property', () => {
  
  describe('# should not able to', () => {
    
    it('decorate interceptor on field property', () => {
      
      @agent()
      class IncorrectAgent extends Base {
        
        @decorateClassMethod(new InitializerAttribute())
        @decorateClassMethod(new InterceptorAttribute())
        test() {
        }
        
      }
      
      expect(()=>{
    
        new IncorrectAgent();
    
      }).toThrowError('Class: IncorrectAgent; Property: test; Initializer can only decorate on field property.')
      
    });
    
    it('decorate interceptor on field property', () => {
  
  
      @agent()
      class GoodAgent extends Base {
    
        @decorateClassProperty(new InitializerAttribute())
        @decorateClassProperty(new InterceptorAttribute())
        field
    
      }
  
      const instance = new GoodAgent();
      
      
      expect(instance instanceof GoodAgent).toBeTruthy();
      
    });
    
    it('unable to decorate interceptor', () => {
  
  
      class FakeInitializerAttribute implements IAttribute {
        
        getInitializer() {
          return null;
        }
      }
  
      class Base {
      }
      
      @agent()
      class FakeAgent extends Base {
        @decorateClassProperty(new FakeInitializerAttribute())
        field;
      }
    
      const instance = new FakeAgent();
      expect(instance instanceof FakeAgent).toBeTruthy();
    
    });
    
  });
  
});
