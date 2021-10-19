import {
  Arguments,
  decorate,
  decorateParameter,
  MemberKinds,
  ParameterInvocation,
  Reflector,
} from '../../../src/dependencies/agent';

class Data251 {
  constructor(@decorate({ require: 'operator' }, MemberKinds.Parameter) model: Date) {}
}

class Data252 {
  constructor(@decorateParameter({ require: 'operator' }) model: string) {}
}

class BaseLayer24 {}

class MiddleLayer24 extends BaseLayer24 {
  constructor(@decorate({ require: 'operator' }, MemberKinds.Parameter) model?: string) {
    super();
  }
}

class Application24 extends MiddleLayer24 {
  constructor(
    @decorate(
      {
        require: 'operator',
        interceptor: {
          intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
            return target.invoke(params, receiver);
          },
        },
      },
      MemberKinds.Parameter
    )
    model?: string
  ) {
    super();
  }
}

class CloudApplication24 extends Application24 {}

describe('2.5. Type parameters', () => {
  describe('# should able to', () => {
    it('get constructor parameters', () => {
      const type = Reflector(Data251);
      expect(type.hasInterceptor()).toBeFalse();

      const param0 = type.parameter(0);
      expect(param0).toBeTruthy();
      if (param0) {
        expect(param0.type).toBe(Date);
        expect(param0.declaringType).toBe(Data251);
        expect(param0.kind).toBe(MemberKinds.ClassParameter);
        expect(param0.key).toBe('constructor');
        expect(param0.index).toBe(0);
        expect(param0.name).toBe('0');
        expect(param0.hasOwnInterceptor()).toBeFalse();
        // expect(param0.descriptor).toBeUndefined();
        // expect(param0.hasInterceptor()).toBeFalse();
        // expect(param0.getParameters()).toBeInstanceOf(Array);
        // expect(param0.getParameters().length).toBe(0);
      }
    });

    it('get constructor parameters', () => {
      const param0 = Reflector(Data252).parameter(0);
      expect(param0).toBeTruthy();
      if (param0) {
        // expect(param0.type).toBe(String);
        // expect(param0.declaringType).toBe(Data252);
        // expect(param0.kind).toBe(ClassField);
        // expect(param0.key).toBe('model');
        // expect(param0.name).toBe('model');
        // expect(param0.descriptor).toBeUndefined();
        // expect(param0.hasInterceptor()).toBeFalse();
        // expect(param0.getParameters()).toBeInstanceOf(Array);
        // expect(param0.getParameters().length).toBe(0);
      }
    });

    it('get method property', () => {
      const modelField = Reflector(CloudApplication24).parameter(0);
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
});
