import { agent } from '../../agent'
import { decorateClassField, decorateClassMember, decorateClassMethod } from '../decorator';
import { IAttribute } from '../attribute';
import { IInterceptor } from '../interceptor';
import { IInvocation } from '../invocation';
import { CreatePropertyInitializers } from './property';
import { IInitializer } from '../initializer';
declare var console;

describe('core.initializers.property', () => {

  describe('# should able to', () => {

    it('decorate more than one interceptor on method', () => {

      class DefaultValueAttribute implements IAttribute, IInitializer {

        initialize(target: IInvocation, parameters: ArrayLike<any>): any {
          const def = target.invoke(parameters);
          console.log('keys', Object.keys(target.target), 'def', def);
          return 10;
        }

        getInitializer() {
          return this;
        }

      }

      class IncreaseValueAttribute implements IAttribute, IInterceptor {

        intercept(target: IInvocation, parameters: ArrayLike<any>): any {
          console.log('keys', Object.keys(target.target));
          return target.invoke(parameters) + 10;
        }

        getInterceptor() {
          return this;
        }
      }

      @agent()
      class Tester01 {

        @decorateClassField(new IncreaseValueAttribute())
        @decorateClassField(new IncreaseValueAttribute())
        @decorateClassMember(new IncreaseValueAttribute())
        @decorateClassMember(new IncreaseValueAttribute())
        @decorateClassField(new DefaultValueAttribute())
        total;

      }


      // should able to create the class with null initializer
      const interceptorBag: Map<string | symbol, IInvocation> = CreatePropertyInitializers(Tester01);

      const num = interceptorBag.get('total').invoke([]);

      expect(num).toBe(50);

    });


  });


});
