import { agent } from '../../../../release';
import { decorateMember } from '../../../../release';
import { TypeInvocation } from '../../../../release';
import { Arguments } from '../../../../release';

describe('4.7. setter interceptor', () => {
  describe('# should able to', () => {
    it('intercept class setter', () => {
      @agent()
      class Class414 {
        a!: number;
        @decorateMember({
          interceptor: {
            intercept(target: TypeInvocation, params: Arguments, receiver: any): any {
              return target.invoke([Math.floor(params[0])], receiver);
            },
          },
        })
        set setter(n: number) {
          this.a = n;
        }
      }
      const instance = new Class414();
      expect(instance).toBeInstanceOf(Class414);
      expect(instance.a).toBeUndefined();
      instance.setter = 5.5;
      expect(instance.a).toBe(5);
      instance.setter = 6.5;
      expect(instance.a).toBe(6);
      instance.setter = 7.5;
      expect(instance.a).toBe(7);
      instance.setter = 8.5;
      expect(instance.a).toBe(8);
      instance.setter = 9.5;
      expect(instance.a).toBe(9);
      instance.setter = 10.5;
      expect(instance.a).toBe(10);
    });
  });
});
