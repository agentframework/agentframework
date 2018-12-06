import { agent } from '../../agent'
import { decorateAgent, decorateClassMethod, decorateClassField } from '../decorator';
import { IAttribute } from '../attribute';
import { IInterceptor } from '../interceptor';
import { IInvocation } from '../invocation';
import { AgentCompileType } from '../compilerOptions';


describe('core.interceptors.factory', () => {

  describe('# should able to', () => {

    it('create agent with fake interceptor', () => {

      class FakeInterceptorAttribute implements IAttribute, IInterceptor {

        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          throw new Error('Not support');
        }

        getInterceptor() {
          return null;
        }

      }

      class Base {

        @decorateClassMethod(new FakeInterceptorAttribute())
        hijack(): any {

        }

      }

      @agent({ compile: AgentCompileType.LazyFunction })
      class Tester01 extends Base {

      }

      const instance = new Tester01();
      expect(instance instanceof Tester01).toBeTruthy();


    });

  });

});
