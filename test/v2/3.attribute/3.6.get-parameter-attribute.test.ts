import { agent } from 'agentframework';
import {
  Arguments,
  decorateParameter,
  GetInterceptor,
  HasInterceptor,
  ParameterAttribute,
  ParameterInterceptor,
  ParameterInvocation,
  Reflector
} from '../../../packages/dependencies/agent';

class OptionalAttribute implements ParameterAttribute {
  constructor(readonly type: any) {
  }
}

function optional(type: any) {
  return decorateParameter(new OptionalAttribute(type));
}

class InjectAttribute implements ParameterAttribute, ParameterInterceptor {
  constructor(readonly type: any) {
  }

  get interceptor() {
    return this;
  }

  intercept(target: ParameterInvocation, params: Arguments, receiver: any): any {
    return target.invoke(params, receiver);
  }
}

class UserRepository {
}

const inject = decorateParameter(new InjectAttribute(UserRepository));

class Base34 {
  constructor(p?: UserRepository) {
  }
}

@agent()
class Controller34 extends Base34 {
  constructor(@inject p?: UserRepository) {
    super();
  }
}

@agent()
class Controller35 extends Controller34 {
  constructor(readonly firstName: string, readonly lastName: string) {
    super();
  }
}

/*** user code begin ***/
class UserController34 extends Controller34 {
  constructor(p?: UserRepository) {
    super(p);
  }

  listAllUser(user: UserRepository, @optional(UserRepository) id?: any) {
  }

  addUser(id: any, @inject user: UserRepository) {
  }

  getUser(@decorateParameter(new InjectAttribute(UserRepository)) users: UserRepository) {
  }

  updateUser(@decorateParameter({ role: 'user' }) users: UserRepository) {
  }

  deprecatedMethod() {
  }
}

describe('3.6. Get parameter attributes', () => {
  describe('# should able to', () => {
    it('get annotated properties', () => {
      const type = Reflector(UserController34);
      expect(type.getOwnProperties().length).toBe(4);
      expect(type.findOwnProperties((p) => p.hasInterceptor()).length).toBe(2);
      expect(type.findProperties((p) => p.hasInterceptor()).size).toBe(1);
      expect(type.findProperties((p) => p.hasInterceptor()).get(type)).toBeTruthy();
    });

    it('check interceptor', () => {
      const type = Reflector(UserController34);
      expect(type.property('listAllUser').hasInterceptor()).toBeFalse();
      expect(type.property('listAllUser').hasOwnInterceptor()).toBeFalse();
      expect(type.property('getUser').hasInterceptor()).toBeTrue();
      expect(type.property('getUser').hasOwnInterceptor()).toBeFalse();

      expect(type.hasInterceptor()).toBeFalse();
      expect(type.hasOwnInterceptor()).toBeFalse();

      expect(Reflector(Controller34).hasInterceptor()).toBeTrue(); // has parameter interceptor
      expect(Reflector(Controller34).hasOwnInterceptor()).toBeFalse(); // don't have ctor interceptor

      expect(Reflector(Base34).hasInterceptor()).toBeFalse();
      expect(Reflector(Base34).hasOwnInterceptor()).toBeFalse();
    });

    it('get parameter types', () => {
      const type = Reflector(UserController34);
      expect(type.property('listAllUser').parameterTypes).toEqual([UserRepository, Object]);
      expect(type.property('deprecatedMethod').parameterTypes).toBeUndefined();

      expect(type.parameterTypes).toBeUndefined();
      expect(Reflector(Controller34).parameterTypes).toEqual([UserRepository]);
      expect(Reflector(Base34).parameterTypes).toBeUndefined();
    });

    it('get attribute of giving type', () => {
      const property = Reflector(UserController34).property('listAllUser');
      expect(property.getParameters().length).toBe(1);
      expect(property.getParameters().length).toBe(1);

      expect(property.parameter(0).type).toBe(UserRepository);
      expect(property.parameter(0).hasOwnAttribute()).toBeFalse();
      expect(property.parameter(0).findOwnAttributes((a) => a instanceof InjectAttribute)).toEqual([]);
      expect(property.parameter(0).getOwnAttribute(InjectAttribute)).toBeUndefined();
      expect(property.parameter(0).getOwnAttributes(InjectAttribute)).toEqual([]);

      expect(property.parameter(1).type).toBe(Object);
      expect(property.parameter(1).hasOwnAttribute()).toBeTrue();
      expect(property.parameter(1).findOwnAttributes((a) => a instanceof OptionalAttribute).length).toBe(1);
      expect(property.parameter(1).getOwnAttribute(OptionalAttribute)).toBeInstanceOf(OptionalAttribute);
      expect(property.parameter(1).getOwnAttributes(OptionalAttribute).length).toBe(1);
    });

    it('get all attributes of giving type', () => {
      const property = Reflector(UserController34).property('listAllUser');
      expect(property.parameter(0).getOwnAttributes(OptionalAttribute).length).toBe(0);
      expect(property.parameter(1).getOwnAttributes(OptionalAttribute).length).toBe(1);
    });

    it('get all attributes', () => {
      const property = Reflector(UserController34).property('listAllUser');
      expect(property.parameter(0).getOwnAttributes().length).toBe(0);
      expect(property.parameter(1).getOwnAttributes().length).toBe(1);
    });

    it('find attributes using inline filter function', () => {
      const property = Reflector(UserController34).property('listAllUser');
      expect(property.parameter(0).findOwnAttributes((a) => !!a).length).toBe(0);
      expect(property.parameter(1).findOwnAttributes((a) => !!a).length).toBe(1);
    });

    it('find attributes using external filter function with filter criteria', () => {
      function InstanceOf(attr: any, criteria: any) {
        return attr instanceof criteria;
      }

      const property = Reflector(UserController34).property('listAllUser');
      expect(property.parameter(0).findOwnAttributes(InstanceOf, OptionalAttribute).length).toBe(0);
      expect(property.parameter(1).findOwnAttributes(InstanceOf, OptionalAttribute).length).toBe(1);
    });

    it('get parameter attribute', () => {
      const attributes = Reflector(Controller35).parameter(0).getOwnAttributes();
      expect(attributes.length).toBe(0);
    });

    it('find parameter attribute with interceptor', () => {
      const attributes = Reflector(Controller34).parameter(0).findOwnAttributes(HasInterceptor);
      expect(attributes.length).toBe(1);
    });

    it('find parameter attribute with interceptor', () => {
      const attributes = Reflector(Controller34)
        .parameter(0)
        .findOwnAttributes((a) => GetInterceptor(a) != null);
      expect(attributes.length).toBe(1);
    });

    it('find parameter attribute', () => {
      const attributes = Reflector(Controller35).parameter(0).findOwnAttributes(HasInterceptor);
      expect(attributes.length).toBe(0);
    });

    it('find parameter attribute', () => {
      const attributes = Reflector(Controller35)
        .parameter(0)
        .findOwnAttributes((a) => GetInterceptor(a) != null);
      expect(attributes.length).toBe(0);
    });
  });

  describe('# should not able to', () => {
    it('get non-annotated parameter', () => {
      const property = Reflector(UserController34).property('listAllUser');
      expect(property.getParameter(0)).toBeUndefined();
    });

    it('get non-annotated parameter', () => {
      const results = Reflector(Base34).findOwnAttributes(HasInterceptor);
      expect(results.length).toBe(0);
    });
  });
});
