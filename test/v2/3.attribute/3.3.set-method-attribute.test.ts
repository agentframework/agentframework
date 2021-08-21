import { decorateMember, Reflector, PropertyAttribute } from '../../../src/dependencies/core';

class MethodAttribute implements PropertyAttribute {
  constructor(readonly method: string, readonly path?: string) {}
}

describe('3.3. Set class method attribute', () => {
  describe('# should able to', () => {
    it('add attribute to class method using custom function', () => {
      function method(method: string, path: string) {
        return decorateMember(new MethodAttribute(method, path));
      }

      /*** user code begin ***/
      class MyController331 {
        @method('GET', '/list')
        listAllUser() {}
      }
      /*** user code end ***/
      const property = Reflector(MyController331).property('listAllUser');
      const methodAttribute = property.getOwnAttribute(MethodAttribute);

      expect(methodAttribute).toBeInstanceOf(MethodAttribute);
      expect(methodAttribute && methodAttribute.method).toBe('GET');
      expect(methodAttribute && methodAttribute.path).toBe('/list');
    });

    it('add attribute to class method using const', () => {
      const get = decorateMember(new MethodAttribute('GET'));

      /*** user code begin ***/
      class MyController332 {
        @get
        listAllUser() {}
      }
      /*** user code end ***/
      const property = Reflector(MyController332).property('listAllUser');
      const methodAttribute = property.getOwnAttribute(MethodAttribute);

      expect(methodAttribute).toBeInstanceOf(MethodAttribute);
      expect(methodAttribute && methodAttribute.method).toBe('GET');
      expect(methodAttribute && methodAttribute.path).toBeUndefined();
    });

    it('add attribute to class method using helper function', () => {
      /*** user code begin ***/
      class MyController333 {
        @decorateMember(new MethodAttribute('GET', '/list'))
        listAllUser() {}
      }
      /*** user code end ***/
      const property = Reflector(MyController333).property('listAllUser');
      const methodAttribute = property.getOwnAttribute(MethodAttribute);

      expect(methodAttribute).toBeInstanceOf(MethodAttribute);
      expect(methodAttribute && methodAttribute.method).toBe('GET');
      expect(methodAttribute && methodAttribute.path).toBe('/list');
    });

    it('add attribute to class method using Reflector API', () => {
      /*** user code begin ***/
      class MyController334 {
        listAllUser() {}
      }
      /*** user code end ***/
      const property = Reflector(MyController334).property('listAllUser');
      property.addAttribute(new MethodAttribute('GET', '/list'));
      const methodAttribute = property.getOwnAttribute(MethodAttribute);
      const methodAttributes = property.getOwnAttributes(MethodAttribute);

      expect(methodAttribute).toBeInstanceOf(MethodAttribute);
      expect(methodAttribute && methodAttribute.method).toBe('GET');
      expect(methodAttribute && methodAttribute.path).toBe('/list');

      expect(methodAttributes.length).toBe(1);
    });
  });
});
