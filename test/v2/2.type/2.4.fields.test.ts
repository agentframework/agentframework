import { AgentFrameworkError, decorate, decorateMember, MemberKinds, Reflector } from '../../../src/dependencies/core';
import { ClassField } from '../Kinds';

class Data24 {
  @decorate({ require: 'operator' }, MemberKinds.Property)
  model!: string;
}

class BaseLayer24 {}

class MiddleLayer24 extends BaseLayer24 {
  @decorateMember({ require: 'operator' })
  model!: string;
}

class Application24 extends MiddleLayer24 {
  @decorateMember({ require: 'operator' })
  model!: string;
}

class CloudApplication24 extends Application24 {}

describe('2.4. Type fields', () => {
  describe('# should able to', () => {
    it('get field property', () => {
      const modelField = Reflector(Data24).getProperty('model');
      expect(modelField).toBeTruthy();
      if (modelField) {
        expect(modelField.type).toBe(String);
        expect(modelField.declaringType).toBe(Data24);
        expect(modelField.kind).toBe(ClassField);
        expect(modelField.key).toBe('model');
        expect(modelField.descriptor).toBeUndefined();
        expect(modelField.name).toBe('model');
        expect(modelField.hasInterceptor()).toBeFalse();
        expect(modelField.getParameters()).toBeInstanceOf(Array);
        expect(modelField.getParameters().length).toBe(0);
      }
    });

    it('get method property', () => {
      const modelField = Reflector(CloudApplication24).getProperty('model');
      expect(modelField).toBeTruthy();
      // if (modelField) {
      //   expect(modelField.type).toBeUndefined();
      //   expect(modelField.declaringType).toBe(Application24);
      //   expect(modelField.kind).toBe(MemberKinds.Property | MemberKinds.Method);
      //   expect(modelField.name).toBe('stop');
      //   expect(modelField.key).toBe('stop');
      //   expect(modelField.descriptor).toBeInstanceOf(Object);
      //   expect(modelField.hasInterceptor()).toBeFalse();
      //   expect(modelField.getParameters()).toBeInstanceOf(Array);
      //   expect(modelField.getParameters().length).toBe(0);
      // }
    });

    // it('get own method property', () => {
    //   const resetMethod = Reflector(MiddleLayer24).getOwnProperty('reset');
    //   expect(resetMethod).toBeTruthy();
    //   if (resetMethod) {
    //     expect(resetMethod.type).toBe(Boolean);
    //     expect(resetMethod.declaringType).toBe(MiddleLayer24);
    //     expect(resetMethod.kind).toBe(MemberKinds.Property | MemberKinds.Method);
    //     expect(resetMethod.name).toBe('reset');
    //     expect(resetMethod.key).toBe('reset');
    //     expect(resetMethod.descriptor).toBeInstanceOf(Object);
    //     expect(resetMethod.hasInterceptor()).toBeFalse();
    //     expect(resetMethod.hasParameterInterceptor()).toBeFalse();
    //     expect(resetMethod.getParameters()).toBeInstanceOf(Array);
    //     expect(resetMethod.getParameters().length).toBe(0);
    //   }
    // });
    //
    // it('get method property', () => {
    //   const runMethod = Reflector(CloudApplication24).getProperty('run');
    //   expect(runMethod).toBeTruthy();
    //   if (runMethod) {
    //     expect(runMethod.declaringType).toBe(Application24);
    //     expect(runMethod.key).toBe('run');
    //     expect(runMethod.name).toBe('run');
    //     expect(runMethod.type).toBeUndefined();
    //     expect(runMethod.descriptor).toBeInstanceOf(Object);
    //     expect(runMethod.kind).toBe(MemberKinds.Property | MemberKinds.Method);
    //     expect(runMethod.hasInterceptor()).toBeTrue();
    //     expect(runMethod.hasParameterInterceptor()).toBeTrue();
    //     expect(runMethod.getParameters()).toBeInstanceOf(Array);
    //     expect(runMethod.getParameters().length).toBe(1);
    //   }
    // });
    //
    // it('get method parameter', () => {
    //   const runMethod = Reflector(CloudApplication24).getProperty('run');
    //   expect(runMethod).toBeTruthy();
    //   if (runMethod) {
    //     const runMethodParameter = runMethod.getParameters()[0];
    //     expect(runMethodParameter.declaringType).toBe(Application24);
    //     expect(runMethodParameter.key).toBe('run');
    //     expect(runMethodParameter.name).toBe('0');
    //     expect(runMethodParameter.index).toBe(0);
    //     expect(runMethodParameter.type).toBe(Data24);
    //     expect(runMethodParameter.kind).toBe(MemberKinds.Parameter | MemberKinds.MethodParameter);
    //   }
    // });
  });

  describe('# should not able to', () => {
    it('decorate non-Static to static property', () => {
      expect(() => {
        class NotAllowStatic {
          @decorate({ a: 1 }, MemberKinds.Property)
          static Run() {}
        }

        expect(NotAllowStatic).toBeTruthy();
      }).toThrowError(AgentFrameworkError, 'InvalidDecorator: Object is not allow decorate on static property');
    });

    it('decorate non-static property to static property parameter', () => {
      expect(() => {
        class NotAllowStatic {
          static Run(@decorate({ a: 1 }, MemberKinds.Property) name: string) {}
        }
        expect(NotAllowStatic).toBeTruthy();
      }).toThrowError(AgentFrameworkError, 'InvalidDecorator: Object is not allow decorate on method parameters');
    });

    it('decorate non-static parameter to static property parameter', () => {
      expect(() => {
        class NotAllowStatic {
          static Run(@decorate({ a: 1 }, MemberKinds.Parameter) name: string) {}
        }
        expect(NotAllowStatic).toBeTruthy();
      }).toThrowError(
        AgentFrameworkError,
        'InvalidDecorator: Object is not allow decorate on static method parameters'
      );
    });
  });
});
