import { PropertyAttribute } from '../../../src/dependencies/agent';
import { decorateMember } from '../../../src/dependencies/agent';
import { Arguments, decorateParameter, Invocation, Reflector } from '../../../src/dependencies/agent';

class MethodAttribute implements PropertyAttribute {
  constructor(readonly method: string, readonly path?: string) {}
}

function method(method: string, path: string) {
  return decorateMember(new MethodAttribute(method, path));
}

const get = decorateMember(new MethodAttribute('GET'));

class Controller34 {
  @method('GET', '/base/user')
  listAllUser() {}

  @decorateMember(new MethodAttribute('POST', '/base/user'))
  addUser() {}

  @get
  getUser(user: string) {}

  @decorateMember(new MethodAttribute('POST', '/base/user/rename'))
  renameUser() {}
}

/*** user code begin ***/
class UserController34 extends Controller34 {
  @method('GET', '/user')
  listAllUser() {}

  @decorateMember(new MethodAttribute('POST', '/user'))
  addUser() {}

  @get
  getUser(
    @decorateParameter({
      role: 'user',
      interceptor: {
        intercept(target: Invocation, params: Arguments, receiver: any): any {
          return target.invoke(params, receiver);
        },
      },
    })
    user: string
  ) {}

  @get
  @method('GET', '/user')
  @decorateMember(new MethodAttribute('POST', '/base/user/update'))
  @decorateMember({
    role: 'user',
    interceptor: {
      intercept(target: Invocation, params: Arguments, receiver: any): any {
        return target.invoke(params, receiver);
      },
    },
  })
  updateUser(@decorateParameter({ role: 'user' }) user: string) {}

  deprecatedMethod() {}

  @decorateMember({
    role: 'user',
    interceptor: {
      intercept(target: Invocation, params: Arguments, receiver: any): any {
        return target.invoke(params, receiver);
      },
    },
  })
  notMethod() {}
}

describe('3.4. Get class method attributes', () => {
  describe('# should able to', () => {
    it('get annotated property', () => {
      const a = Reflector(UserController34).getOwnProperty('listAllUser');
      const b = Reflector(UserController34).getProperty('listAllUser');
      const c = Reflector(Controller34).getOwnProperty('listAllUser');
      const d = Reflector(Controller34).getProperty('listAllUser');
      expect(a).toEqual(b);
      expect(c).toEqual(d);
      expect(a).not.toBe(c);
    });

    it('get attribute of giving type', () => {
      const property = Reflector(UserController34).property('listAllUser');
      expect(property.hasOwnAttribute(MethodAttribute)).toBeTrue();
      expect(property.getOwnAttribute(MethodAttribute)).toBeInstanceOf(MethodAttribute);
    });

    it('get all attributes of giving type', () => {
      const property = Reflector(UserController34).property('updateUser');
      expect(property.getOwnAttributes(MethodAttribute).length).toBe(3);
    });

    it('get all attributes', () => {
      const property = Reflector(UserController34).property('updateUser');
      expect(property.getOwnAttributes().length).toBe(4);
    });

    it('find attributes using inline filter function', () => {
      const property = Reflector(UserController34).property('updateUser');
      expect(property.findOwnAttributes((attr) => attr instanceof MethodAttribute).length).toBe(3);
    });

    it('find attributes using external filter function with filter criteria', () => {
      function InstanceOf(attr: any, criteria: any) {
        return attr instanceof criteria;
      }
      const property = Reflector(UserController34).property('updateUser');
      expect(property.findOwnAttributes(InstanceOf, MethodAttribute).length).toBe(3);
    });

    it('check interceptor property', () => {
      const property = Reflector(UserController34).property('getUser');
      expect(property.hasOwnInterceptor()).toBeFalse();
      expect(property.hasInterceptor()).toBeTrue(); // param interceptor
    });

    it('check interceptor property', () => {
      const property = Reflector(UserController34).property('updateUser');
      expect(property.hasOwnInterceptor()).toBeTrue();
      expect(property.hasInterceptor()).toBeTrue();
    });

    it('get non-annotated property', () => {
      const property = Reflector(UserController34).property('deprecatedMethod');
      expect(property).toBeTruthy();
      expect(property.hasInterceptor()).toBeFalse();
      expect(property.hasOwnInterceptor()).toBeFalse();
    });
  });

  describe('# should not able to', () => {
    it('get non-annotated property', () => {
      const property = Reflector(UserController34).getProperty('deprecatedMethod');
      expect(property).toBeUndefined();
    });

    it('get non-match property', () => {
      const property = Reflector(UserController34).property('notMethod');
      const attributes = property.findOwnAttributes((a) => a instanceof MethodAttribute);
      expect(attributes.length).toBe(0);
    });
  });
});
