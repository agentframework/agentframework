/* tslint:disable */

import { decorateMember, Reflector } from '../../../packages/dependencies/agent';
import { RandomInterceptor } from '../1.attributes/RandomInterceptor';
import { RoundInterceptor } from '../1.attributes/RoundInterceptor';

class ClassWithTwoInterceptor {
  @decorateMember(new RandomInterceptor())
  ClassWithTwoInterceptorField1: any;

  @decorateMember(new RoundInterceptor())
  ClassWithTwoInterceptorMethod1() {
    return 'connected';
  }
}

describe('Reflection get metadata ', () => {
  describe('# should able to', () => {
    it('detect interceptor', () => {
      expect(Reflect.has(new RandomInterceptor(), 'interceptor')).toBeTrue();
    });

    it('detect annotations', () => {
      const results = Reflector(ClassWithTwoInterceptor).getOwnProperties();
      expect(results.length).toBe(2);
    });

    it('search current type by interceptor', () => {
      const result = Reflector(ClassWithTwoInterceptor).findOwnProperties((p) => p.hasOwnInterceptor());
      expect(result).toBeTruthy();
      expect(result.length).toBe(2);
    });

    it('search current and base types by interceptor', () => {
      const result = Reflector(ClassWithTwoInterceptor).findProperties((p) => p.hasOwnInterceptor());
      expect(result).toBeTruthy();
      expect(result.size).toBe(1);
      for (const layer of result.entries()) {
        expect(layer[1].length).toBe(2);
      }
    });

    it('search by attribute', () => {
      const result = Reflector(ClassWithTwoInterceptor).findOwnProperties((p) => p.hasOwnAttribute(RandomInterceptor));
      expect(result.length).toBe(1);
    });
  });
});
