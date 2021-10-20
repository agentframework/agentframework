import {
  Arguments,
  decorateMember,
  decorateParameter,
  HasInterceptor,
  ParameterInvocation,
  Reflector,
} from '../../../src/dependencies/agent';
import { ClassMethod, ClassMethodParameter } from '../Kinds';

class ParamAttribute {
  get interceptor() {
    return this;
  }

  intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
    return target.invoke(params, receiver);
  }
}

class Data23 {}

class BaseLayer23 {
  status() {
    throw new Error();
  }
}

class MiddleLayer23 extends BaseLayer23 {
  @decorateMember({ require: 'operator' })
  reset(s: number): boolean {
    throw new Error();
  }
}

class Application23 extends MiddleLayer23 {
  start(): Array<any> {
    throw new Error();
  }

  @decorateMember({ require: 'admin' })
  stop(): void {
    throw new Error();
  }

  run(
    @decorateParameter(new ParamAttribute())
    data: Data23
  ): void {
    throw new Error();
  }
}

class CloudApplication23 extends Application23 {}

describe('2.3. Type methods', () => {
  describe('# should able to', () => {
    it('get not annotated method property', () => {
      const startMethod = Reflector(CloudApplication23).getProperty('start');
      expect(startMethod).toBeUndefined();
    });

    it('get not annotated method property', () => {
      const startMethod = Reflector(CloudApplication23).property('start');
      expect(startMethod).toBeTruthy();
      if (startMethod) {
        expect(startMethod.hasAttribute()).toBeFalse();
        expect(startMethod.hasOwnInterceptor()).toBeFalse();
        expect(startMethod.getAttribute(ParamAttribute)).toBeUndefined();
        expect(startMethod.getAttributes(ParamAttribute)).toEqual([]);
      }
    });

    it('get method property', () => {
      const stopMethod = Reflector(CloudApplication23).getProperty('stop');
      expect(stopMethod).toBeTruthy();
      if (stopMethod) {
        expect(stopMethod.type).toBeUndefined();
        expect(stopMethod.declaringType).toBe(Application23);
        expect(stopMethod.kind).toBe(ClassMethod);
        expect(stopMethod.name).toBe('stop');
        expect(stopMethod.key).toBe('stop');
        expect(stopMethod.descriptor).toBeInstanceOf(Object);
        expect(stopMethod.hasInterceptor()).toBeFalse();
        expect(stopMethod.hasOwnInterceptor()).toBeFalse();
        expect(stopMethod.getParameters()).toBeInstanceOf(Array);
        expect(stopMethod.getParameters().length).toBe(0);
        expect(stopMethod.hasAttribute()).toBeTrue();
        expect(stopMethod.getAttribute(ParamAttribute)).toBeUndefined();
        expect(stopMethod.getAttributes(ParamAttribute)).toEqual([]);
      }
    });

    it('get own method property', () => {
      const resetMethod = Reflector(MiddleLayer23).getOwnProperty('reset');
      expect(resetMethod).toBeTruthy();
      if (resetMethod) {
        expect(resetMethod.type).toBe(Boolean);
        expect(resetMethod.declaringType).toBe(MiddleLayer23);
        expect(resetMethod.kind).toBe(ClassMethod);
        expect(resetMethod.name).toBe('reset');
        expect(resetMethod.key).toBe('reset');
        expect(resetMethod.descriptor).toBeInstanceOf(Object);
        expect(resetMethod.hasInterceptor()).toBeFalse();
        expect(resetMethod.hasOwnInterceptor()).toBeFalse();
        expect(resetMethod.hasAttribute()).toBeTrue();
        expect(resetMethod.getAttribute(ParamAttribute)).toBeUndefined();
        expect(resetMethod.getAttributes(ParamAttribute)).toEqual([]);
        // expect(resetMethod.hasParameterInterceptor()).toBeFalse();
        expect(resetMethod.getParameters()).toBeInstanceOf(Array);
        expect(resetMethod.getParameters().length).toBe(0);
      }
    });

    it('get method property', () => {
      const runMethod = Reflector(CloudApplication23).getProperty('run');
      expect(runMethod).toBeTruthy();
      if (runMethod) {
        expect(runMethod.declaringType).toBe(Application23);
        expect(runMethod.key).toBe('run');
        expect(runMethod.name).toBe('run');
        expect(runMethod.type).toBeUndefined();
        expect(runMethod.descriptor).toBeInstanceOf(Object);
        expect(runMethod.kind).toBe(ClassMethod);
        expect(runMethod.hasInterceptor()).toBeTrue();
        expect(runMethod.hasOwnInterceptor()).toBeFalse();
        // expect(runMethod.hasParameterInterceptor()).toBeTrue();
        expect(runMethod.getParameters()).toBeInstanceOf(Array);
        expect(runMethod.getParameters().length).toBe(1);
        expect(runMethod.hasAttribute()).toBeFalse();
        expect(runMethod.getAttribute(ParamAttribute)).toBeUndefined();
        expect(runMethod.getAttributes(ParamAttribute).length).toBe(0);
      }
    });

    it('get method parameter', () => {
      const runMethod = Reflector(CloudApplication23).getProperty('run');
      expect(runMethod).toBeTruthy();
      if (runMethod) {
        const runMethodParameter = runMethod.parameter(0);
        expect(runMethodParameter.declaringType).toBe(Application23);
        expect(runMethodParameter.key).toBe('run');
        expect(runMethodParameter.name).toBe('0');
        expect(runMethodParameter.index).toBe(0);
        expect(runMethodParameter.type).toBe(Data23);
        expect(runMethodParameter.kind).toBe(ClassMethodParameter);
        expect(runMethodParameter.hasAttribute()).toBeTrue();
        expect(runMethodParameter.getAttribute(ParamAttribute)).toBeInstanceOf(ParamAttribute);
        expect(runMethodParameter.getAttributes(ParamAttribute).length).toBe(1);
      }
    });

    it('get method interceptor', () => {
      const runMethod = Reflector(Application23).getProperty('run');
      expect(runMethod).toBeTruthy();
      if (runMethod) {
        expect(runMethod.findAttributes(HasInterceptor).length).toBe(0);
      }
    });
  });
});
