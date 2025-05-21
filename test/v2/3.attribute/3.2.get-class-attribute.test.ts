import { decorateClass, Reflector, TypeAttribute, Attribute } from '../../../lib/dependencies/agent';
import { Class } from '../../../lib/dependencies/agent';

/**
 * The tests shows 3 ways to add attribute to a class at design time
 */
class ControllerAttribute implements TypeAttribute {
  constructor(readonly path: string) {}
}

function controller(path: string) {
  return decorateClass(new ControllerAttribute(path));
}

class RoleAttribute implements TypeAttribute {
  constructor(readonly role: string) {}
}

function admin() {
  return decorateClass(new RoleAttribute('admin'));
}

@admin()
@controller('/api/user')
class UserController321 {
  constructor(readonly department: string) {}
  listAllUser() {
    return ['David', 'Emma', 'William', 'James', 'John', 'Michael'];
  }
}

describe('3.2. Get class attribute', () => {
  describe('# should able to', () => {
    it('get parameters', () => {
      const type = Reflector(UserController321);
      // constructor parameter type is annotated if class got decorator
      expect(type.parameterTypes).toEqual([String]);
      // no annotated parameters
      expect(type.getParameters()).toEqual([]);
    });

    it('check attribute', () => {
      const type = Reflector(UserController321);
      expect(type.hasOwnAttribute(ControllerAttribute)).toBeTrue();
    });

    it('get attribute', () => {
      const type = Reflector(UserController321);
      const controllerAttribute = type.getOwnAttribute(ControllerAttribute);

      expect(controllerAttribute).toBeInstanceOf(ControllerAttribute);
      expect(controllerAttribute && controllerAttribute.path).toBe('/api/user');
    });

    it('get all controller attributes', () => {
      const type = Reflector(UserController321);
      const found = type.getOwnAttributes(ControllerAttribute);

      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(1);
    });

    it('get all controller attributes', () => {
      const type = Reflector(UserController321);
      const found = type.getOwnAttributes();

      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(2);
    });

    it('find attribute using ControllerAttribute', () => {
      const type = Reflector(UserController321);
      const found = type.findOwnAttributes((attribute: Attribute) => {
        return attribute instanceof ControllerAttribute;
      });
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(1);
    });

    it('find attribute using filter function', () => {
      const type = Reflector(UserController321);
      function FindAttributeByType(attribute: Attribute, type: Class<any>): boolean {
        return attribute instanceof type;
      }
      const found = type.findOwnAttributes(FindAttributeByType, ControllerAttribute);
      expect(found).toBeInstanceOf(Array);
      expect(found.length).toBe(1);
    });
  });

  describe('# should not able to', () => {
    it('get annotated properties', () => {
      const type = Reflector(UserController321);
      // no annotated property in UserController
      expect(type.hasOwnProperties()).toBeFalse();
    });
  });
});
