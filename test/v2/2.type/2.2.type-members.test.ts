import { decorateMember, MemberKinds, PropertyInfo, Reflector } from '../../../src/dependencies/agent';

class Compiler {}

class BaseLayer extends Compiler {
  status() {}

  @decorateMember({ type: 'getterSetter' })
  set getterSetter(value: string) {}
}

class MiddleLayer extends BaseLayer {
  @decorateMember({ require: 'operator' })
  reset(): boolean {
    return false;
  }

  @decorateMember({ type: 'getter' })
  get getter() {
    return this.constructor.name;
  }

  @decorateMember({ type: 'setter' })
  set setter(value: any) {}

  @decorateMember({ type: 'getterSetter' })
  get getterSetter() {
    return this.constructor.name;
  }

  @decorateMember({ type: 'value' })
  field!: Date;

  @decorateMember({ type: 'value' })
  set value(value: any) {}
  get value() {
    return this.constructor.name;
  }
}

class Application extends MiddleLayer {
  @decorateMember({ require: 'user' })
  version!: any;

  start(): Array<any> {
    return [];
  }

  @decorateMember({ require: 'admin' })
  stop(): void {}
}

class CloudApplication extends Application {}

class StandaloneApplication {}

class BaseStaticApplication {
  @decorateMember({ name: 'run' })
  static run(n: number) {}
}
class StaticApplication extends BaseStaticApplication {}
describe('2.2. Type members', () => {
  describe('# should able to', () => {
    it('check type properties', () => {
      expect(Reflector(StandaloneApplication).hasOwnProperties()).toBeFalse();
      expect(Reflector(Compiler).hasOwnProperties()).toBeFalse();
      expect(Reflector(BaseLayer).hasOwnProperties()).toBeTrue();
      expect(Reflector(MiddleLayer).hasOwnProperties()).toBeTrue();
      expect(Reflector(Application).hasOwnProperties()).toBeTrue();
      expect(Reflector(CloudApplication).hasOwnProperties()).toBeFalse();
    });

    it('get non-exists type meta', () => {
      const ctorOfStandaloneApplication = Reflector(StandaloneApplication);
      expect(ctorOfStandaloneApplication.findOwnProperties((p) => true)).toEqual([]);
      expect(ctorOfStandaloneApplication).toBeTruthy();
      expect(ctorOfStandaloneApplication.descriptor).toEqual(
        jasmine.objectContaining({
          value: StandaloneApplication,
        })
      );
      expect(ctorOfStandaloneApplication.type).toBe(StandaloneApplication);
      expect(ctorOfStandaloneApplication.declaringType).toBe(StandaloneApplication);
      expect(ctorOfStandaloneApplication.hasOwnAttribute()).toBeFalse();
      expect(ctorOfStandaloneApplication.parameter(0).type).toBeUndefined();
      ctorOfStandaloneApplication.addAttribute({});
      expect(ctorOfStandaloneApplication.hasOwnAttribute()).toBeTrue();
    });

    it('get non-exists property', () => {
      const statusPropertyOfCloudApplication = Reflector(StandaloneApplication).property('status');
      expect(statusPropertyOfCloudApplication).toBeTruthy();
      expect(statusPropertyOfCloudApplication.descriptor).toBeUndefined();
      expect(statusPropertyOfCloudApplication.declaringType).toBe(StandaloneApplication);
      expect(statusPropertyOfCloudApplication.type).toBeUndefined();
      expect(statusPropertyOfCloudApplication.hasOwnAttribute()).toBeFalse();
      expect(statusPropertyOfCloudApplication.parameter(0).type).toBeUndefined();
      statusPropertyOfCloudApplication.addAttribute({});
      expect(statusPropertyOfCloudApplication.hasOwnAttribute()).toBeTrue();
      expect(statusPropertyOfCloudApplication.descriptor).toBeUndefined();
    });

    it('get static method property', () => {
      expect(Reflector(StaticApplication).static.getOwnProperty('run')).toBeUndefined();
      expect(Reflector(StaticApplication).static.getProperty('run')).toBeTruthy();
      const run = Reflector(StaticApplication).static.getProperty('run');
      if (run) {
        expect(run.kind).toBe(MemberKinds.Static | MemberKinds.Property);
      }
    });

    it('get static method parameter', () => {
      const run = Reflector(StaticApplication).static.getProperty('run');
      if (run) {
        expect(run.parameter(0).kind).toBe(MemberKinds.Static | MemberKinds.Parameter);
      }
    });

    it('get method property', () => {
      expect(Reflector(CloudApplication).getOwnProperty('stop')).toBeUndefined();
      expect(Reflector(Application).getProperty('stop')).toBeTruthy();
    });

    it('get field property', () => {
      expect(Reflector(CloudApplication).getOwnProperty('version')).toBeUndefined();
      expect(Reflector(Application).getProperty('version')).toBeTruthy();
    });

    it('get getter property', () => {
      expect(Reflector(CloudApplication).getOwnProperty('getter')).toBeUndefined();
      expect(Reflector(MiddleLayer).getProperty('getter')).toBeTruthy();
    });

    it('get setter property', () => {
      expect(Reflector(CloudApplication).getOwnProperty('setter')).toBeUndefined();
      expect(Reflector(MiddleLayer).getProperty('setter')).toBeTruthy();
    });

    it('get getterSetter property', () => {
      expect(Reflector(CloudApplication).getOwnProperty('getterSetter')).toBeUndefined();
      expect(Reflector(MiddleLayer).getProperty('getterSetter')).toBeTruthy();
    });

    it('get type own properties', () => {
      expect(Reflector(CloudApplication).getOwnProperties().length).toBe(0);

      expect(Reflector(Application).getOwnProperties().length).toBe(2);
      expect(Reflector(Application).getOwnProperties()[0].key).toBe('version');
      expect(Reflector(Application).getOwnProperties()[0].type).toBe(Object);
      expect(Reflector(Application).getOwnProperties()[1].key).toBe('stop');
      expect(Reflector(Application).getOwnProperties()[1].type).toBeUndefined();

      expect(Reflector(MiddleLayer).getOwnProperties().length).toBe(6);
      expect(Reflector(MiddleLayer).getOwnProperties()[0].key).toBe('reset');
      expect(Reflector(MiddleLayer).getOwnProperties()[0].type).toBe(Boolean);

      expect(Reflector(BaseLayer).getOwnProperties().length).toBe(1);
      expect(Reflector(Compiler).getOwnProperties().length).toBe(0);
    });

    it('get annotated property', () => {
      expect(Reflector(Application).getOwnProperty('stop')).toBeTruthy();
      expect(Reflector(Application).getProperty('stop')).toBeTruthy();
    });

    it('get annotated property in parent type', () => {
      expect(Reflector(Application).getProperty('reset')).toBeTruthy(); // 'reset' method is declared in parent class
    });

    it('find own properties', () => {
      const result = Reflector(Application).findOwnProperties(() => true);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(2);
    });

    it('find own properties using inline filter function', () => {
      const fields = Reflector(Application).findOwnProperties((property) => {
        return !!(property.kind & MemberKinds.Property);
      });
      expect(fields).toBeInstanceOf(Array);
      expect(fields.length).toBe(2);
      expect(fields[0].key).toBe('version');
    });

    it('find own properties using external filter function with filter criteria', () => {
      function IsKind(property: PropertyInfo, kind: number): boolean {
        return !!(property.kind & kind);
      }
      const methods = Reflector(Application).findOwnProperties(IsKind, MemberKinds.Property);
      expect(methods).toBeInstanceOf(Array);
      expect(methods.length).toBe(2);
      expect(methods[0].key).toBe('version');
    });

    it('find all properties', () => {
      const map = Reflector(Application).findProperties(() => true);
      expect(map).toBeInstanceOf(Map);
      expect(map.size).toBe(3);
      expect(map.get(Reflector(Application))).toBeInstanceOf(Array);
      expect(map.get(Reflector(MiddleLayer))).toBeInstanceOf(Array);
      expect(map.get(Reflector(BaseLayer))).toBeInstanceOf(Array);
    });

    it('find all properties using inline filter function', () => {
      const map = Reflector(Application).findProperties((property) => {
        return !!(property.kind & MemberKinds.Property);
      });
      expect(map).toBeInstanceOf(Map);
      expect(map.size).toBe(3);
      expect(map.get(Reflector(Application))).toBeInstanceOf(Array);
    });

    it('find all properties using external filter function with filter criteria', () => {
      function IsKind(property: PropertyInfo, kind: number): boolean {
        return !!(property.kind & kind);
      }
      const map = Reflector(Application).findProperties(IsKind, MemberKinds.Property);
      expect(map).toBeInstanceOf(Map);
      expect(map.size).toBe(3);
      expect(map.get(Reflector(Application))).toBeInstanceOf(Array);
      expect(map.get(Reflector(MiddleLayer))).toBeInstanceOf(Array);
    });

    it('get attribute from static method', () => {
      class StaticMemberTest22 {
        @decorateMember({ a: 1 })
        static run() {}
      }
      expect(Reflector(StaticMemberTest22).static.property('run').hasOwnAttribute()).toBeTrue();
    });

    it('add attribute to constructor', () => {
      class ClassTest22 {
        run() {}
      }
      expect(Reflector(ClassTest22).version).toBe(0);
      expect(Reflector(ClassTest22).property('constructor').version).toBe(0);
      Reflector(ClassTest22).property('constructor').addAttribute({ id: 'ClassTest22' });
      expect(Reflector(ClassTest22).hasOwnAttribute()).toBeTrue();
      expect(Reflector(ClassTest22).version).toBe(0);
      expect(Reflector(ClassTest22).property('constructor').version).toBe(1);
    });
  });

  describe('# should not able to', () => {
    it('get non-annotated property', () => {
      expect(Reflector(Application).getOwnProperty('start')).toBeUndefined();
      expect(Reflector(Application).getProperty('start')).toBeUndefined();
    });

    it('get non-annotated property in parent type', () => {
      expect(Reflector(Application).getOwnProperty('status')).toBeUndefined();
      expect(Reflector(Application).getProperty('status')).toBeUndefined();
    });

    it('get non-exists property', () => {
      expect(Reflector(CloudApplication).getOwnProperty('not-exists')).toBeUndefined();
      expect(Reflector(CloudApplication).getProperty('not-exists')).toBeUndefined();
      expect(Reflector(CloudApplication).getProperty('status')).toBeUndefined();
    });
  });
});
