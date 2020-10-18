import { agent } from '../../../lib';
import { decorateClassProperty } from '../../../lib';
import { ClassInvocation } from '../../../lib';
import { Arguments } from '../../../lib';

describe('4.6. getter interceptor', () => {
  describe('# should able to', () => {
    it('intercept class getter', () => {
      @agent()
      class Class414 {
        a!: number;

        @decorateClassProperty({
          interceptor: {
            intercept(target: ClassInvocation, params: Arguments, receiver: any): any {
              return Math.floor(target.invoke(params, receiver));
            }
          }
        })
        get getter() {
          return this.a;
        }
      }
      const instance = new Class414();
      expect(instance).toBeInstanceOf(Class414);
      instance.a = 4.5;
      expect(instance.a).toBe(4.5);
      expect(instance.getter).toBe(4);
      expect(instance.getter).toBe(4);
      expect(instance.getter).toBe(4);
      expect(instance.getter).toBe(4);
      expect(instance.getter).toBe(4);
      expect(instance.getter).toBe(4);
      expect(instance.getter).toBe(4);
      expect(instance.getter).toBe(4);
      expect(instance.getter).toBe(4);
    });
  });
});
