import {
  Arguments,
  decorateMember,
  decorateParameter,
  HasInterceptor,
  ParameterInvocation,
  Reflector,
} from '../../../src/dependencies/core';
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
        expect(startMethod.hasOwnAttribute()).toBeFalse();
        expect(startMethod.hasInterceptor()).toBeFalse();
        expect(startMethod.getOwnAttribute(ParamAttribute)).toBeUndefined();
        expect(startMethod.getOwnAttributes(ParamAttribute)).toEqual([]);
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
        expect(stopMethod.getParameters()).toBeInstanceOf(Array);
        expect(stopMethod.getParameters().length).toBe(0);
        expect(stopMethod.hasOwnAttribute()).toBeTrue();
        expect(stopMethod.getOwnAttribute(ParamAttribute)).toBeUndefined();
        expect(stopMethod.getOwnAttributes(ParamAttribute)).toEqual([]);
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
        expect(resetMethod.hasOwnAttribute()).toBeTrue();
        expect(resetMethod.getOwnAttribute(ParamAttribute)).toBeUndefined();
        expect(resetMethod.getOwnAttributes(ParamAttribute)).toEqual([]);
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
        // expect(runMethod.hasParameterInterceptor()).toBeTrue();
        expect(runMethod.getParameters()).toBeInstanceOf(Array);
        expect(runMethod.getParameters().length).toBe(1);
        expect(runMethod.hasOwnAttribute()).toBeFalse();
        expect(runMethod.getOwnAttribute(ParamAttribute)).toBeUndefined();
        expect(runMethod.getOwnAttributes(ParamAttribute).length).toBe(0);
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
        expect(runMethodParameter.hasOwnAttribute()).toBeTrue();
        expect(runMethodParameter.getOwnAttribute(ParamAttribute)).toBeInstanceOf(ParamAttribute);
        expect(runMethodParameter.getOwnAttributes(ParamAttribute).length).toBe(1);
      }
    });

    it('get method interceptor', () => {
      const runMethod = Reflector(Application23).getProperty('run');
      expect(runMethod).toBeTruthy();
      if (runMethod) {
        expect(runMethod.findOwnAttributes(HasInterceptor).length).toBe(0);
      }
    });
  });
});
