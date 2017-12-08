import { agent } from '../../agent'
import {
  AgentCompileType, AgentFeatures, decorateAgent, decorateClassMethod,
  decorateClassProperty
} from '../decorator';
import { IAttribute } from '../attribute';
import { IInterceptor } from '../interceptor';
import { IInvocation } from '../invocation';
import { IInitializer } from '../initializer';


describe('interceptor / property', () => {

  describe('# should not able to', () => {

    it('decorate interceptor on field property', () => {


      class InterceptorAttribute implements IAttribute, IInterceptor {
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          Object.keys(target.target);
          return target.invoke(parameters);
        }
        getInterceptor() {
          return this;
        }
      }

      class Base {

      }

      @agent()
      class IncorrectAgent extends Base {

        @decorateClassProperty(new InterceptorAttribute())
        hijack: any;

      }

      expect(() => {

        new IncorrectAgent();

      }).toThrowError('Class: IncorrectAgent; Property: hijack; Unable to decorate Interceptor on field property.')
    });

    it('decorate interceptor on field property', () => {


      class InterceptorAttribute implements IAttribute, IInterceptor {
        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          Object.keys(target.target);
          return target.invoke(parameters);
        }
        getInterceptor() {
          return this;
        }
      }


      class Base {

        @decorateClassProperty(new InterceptorAttribute())
        field = function () {
          console.log('nice')
        };

      }

      @agent()
      class IncorrectAgent extends Base {


      }

      expect(() => {

        new IncorrectAgent();

      }).toThrowError('Class: IncorrectAgent; Property: field; Unable to decorate Interceptor on field property.')
    });

  });

});
