import {
  Arguments,
  decorateParameter,
  MemberKinds,
  ParameterInvocation,
  Reflector,
  TypeInfo,
  decorateClass,
  decorateMember,
  GetType,
} from '../../../src';
import { agent } from '../../../src/domain';


class Storage {}

class Compiler {}

class BaseLayer {
  constructor(
    @decorateParameter({})
    storage?: Storage
  ) {}
}

class MiddleLayer extends BaseLayer {
  constructor(
    @decorateParameter({
      interceptor: {
        intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
          return target.invoke(params, receiver);
        },
      },
    })
    compiler?: Compiler
  ) {
    super();
  }
}

@decorateClass({
  interceptor: {
    intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
      return target.invoke(params, receiver);
    },
  },
})
class Application extends MiddleLayer {}

class CloudApplication extends Application {
  but(): number {
    return 1;
  }
}

@agent()
class AgentApplication extends CloudApplication {}

describe('2.1. Type', () => {
  describe('# should able to', () => {
    it('get type', () => {
      expect(Reflector(CloudApplication).type).toBe(CloudApplication);
    });

    it('get agent type', () => {
      expect(Reflector(AgentApplication).type).toBe(GetType(AgentApplication)!);
      expect(Reflector(AgentApplication).type).not.toBe(AgentApplication);
    });

    it('get declaringType', () => {
      expect(Reflector(CloudApplication).declaringType).toBe(CloudApplication);
    });

    it('get agent declaringType', () => {
      expect(Reflector(AgentApplication).declaringType).toBe(GetType(AgentApplication)!);
      expect(Reflector(AgentApplication).declaringType).not.toBe(AgentApplication);
    });

    it('get kind', () => {
      expect(Reflector(CloudApplication).kind).toBe(MemberKinds.Class);
    });

    it('get agent kind', () => {
      expect(Reflector(AgentApplication).kind).toBe(MemberKinds.Class);
    });

    it('get static kind', () => {
      expect(Reflector(CloudApplication).static.kind).toBe(MemberKinds.Class | MemberKinds.Static);
    });

    it('get agent static kind', () => {
      expect(Reflector(AgentApplication).static.kind).toBe(MemberKinds.Class | MemberKinds.Static);
    });

    it('get name', () => {
      expect(Reflector(CloudApplication).name).toBe('CloudApplication');
    });

    it('get agent name', () => {
      expect(Reflector(AgentApplication).name).toBe('AgentApplication');
    });

    it('get key', () => {
      expect(Reflector(CloudApplication).key).toBe('constructor');
    });

    it('get descriptor', () => {
      expect(Reflector(CloudApplication).descriptor).toEqual(
        jasmine.objectContaining({
          value: CloudApplication,
        })
      );
    });

    it('get descriptor for annotated class', () => {
      expect(Reflector(Application).descriptor).toEqual(
        jasmine.objectContaining({
          value: Application,
        })
      );
    });

    // it('check constructor parameter', () => {
    //   expect(Reflector(Application).hasParameterInterceptor()).toBeFalse();
    //   expect(Reflector(MiddleLayer).hasParameterInterceptor()).toBeTrue();
    //   expect(Reflector(BaseLayer).hasParameterInterceptor()).toBeFalse();
    //   expect(Reflector(Compiler).hasParameterInterceptor()).toBeFalse();
    // });

    it('get constructor parameter', () => {
      expect(Reflector(Application).getParameter(0)).toBeUndefined();
      expect(Reflector(MiddleLayer).getParameter(0)).toBeTruthy();
      expect(Reflector(BaseLayer).getParameter(0)).toBeTruthy();
      expect(Reflector(Compiler).getParameter(0)).toBeUndefined();
    });

    it('get constructor parameters', () => {
      expect(Reflector(Application).getParameters().length).toBe(0);
      expect(Reflector(MiddleLayer).getParameters().length).toBe(1);
      expect(Reflector(BaseLayer).getParameters().length).toBe(1);
      expect(Reflector(Compiler).getParameters().length).toBe(0);
    });

    it('get constructor parameter declared by class parameter decorator', () => {
      const constructorParameter = Reflector(MiddleLayer).getParameters()[0];
      expect(constructorParameter).toBeTruthy();

      expect(constructorParameter.declaringType).toBe(MiddleLayer);
      expect(constructorParameter.key).toBe('constructor');
      expect(constructorParameter.name).toBe('0');
      expect(constructorParameter.index).toBe(0);
      expect(constructorParameter.type).toBe(Compiler);
      expect(constructorParameter.kind & MemberKinds.Parameter).toBeTruthy();
    });

    it('get constructor parameter declared by parameter decorator', () => {
      const constructorParameter = Reflector(BaseLayer).getParameters()[0];
      expect(constructorParameter).toBeTruthy();

      expect(constructorParameter.declaringType).toBe(BaseLayer);
      expect(constructorParameter.key).toBe('constructor');
      expect(constructorParameter.name).toBe('0');
      expect(constructorParameter.index).toBe(0);
      expect(constructorParameter.type).toBe(Storage);
      expect(constructorParameter.kind & MemberKinds.Parameter).toBeTruthy();
    });

    it('get types (self and parents)', () => {
      const types = Reflector(CloudApplication).findTypes();
      expect(types).toBeInstanceOf(Array);
      expect(types.length).toBe(4);
      expect(types[0]).toBe(Reflector(CloudApplication));
      expect(types[1]).toBe(Reflector(Application));
      expect(types[2]).toBe(Reflector(MiddleLayer));
      expect(types[3]).toBe(Reflector(BaseLayer));
    });

    it('find types using filter function', () => {
      const types = Reflector(Application).findTypes((type) => {
        return type.name.endsWith('Layer');
      });
      expect(types).toBeInstanceOf(Array);
      expect(types.length).toBe(2);
      expect(types[0]).toBe(Reflector(MiddleLayer));
      expect(types[1]).toBe(Reflector(BaseLayer));
    });

    it('find types using filter function with filter criteria', () => {
      function NameEndWith(type: TypeInfo, filterCriteria: string): boolean {
        return type.name.endsWith(filterCriteria);
      }
      const types = Reflector(Application).findTypes(NameEndWith, 'Layer');
      expect(types).toBeInstanceOf(Array);
      expect(types.length).toBe(2);
      expect(types[0]).toBe(Reflector(MiddleLayer));
      expect(types[1]).toBe(Reflector(BaseLayer));
    });

    it('check attribute', () => {
      const types = Reflector(CloudApplication).findTypes();
      expect(types).toBeInstanceOf(Array);
      expect(types.length).toBe(4);
      expect(types[0].hasOwnInterceptor()).toBeFalse();
      expect(types[1].hasOwnInterceptor()).toBeTrue();
      expect(types[2].hasOwnInterceptor()).toBeFalse();
      expect(types[3].hasOwnInterceptor()).toBeFalse();
    });

    it('annotate static method', () => {
      class TempClass21 {
        @decorateMember({ a: 1 })
        static Create(param: number) {}
      }

      expect(Reflector(TempClass21).static.hasOwnProperties()).toBeTrue();
    });

    it('annotate static method parameter', () => {
      class TempClass21 {
        static Create(@decorateParameter({ a: 1 }) param: number) {}
      }

      expect(Reflector(TempClass21).static.property('Create').parameter(0).type).toBe(Number);
    });
  });
});
