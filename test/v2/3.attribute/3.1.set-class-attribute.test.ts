import { decorate, decorateClass, MemberKinds, Reflector } from '../../../packages/dependencies/agent';

/**
 * The tests shows 3 ways to add attribute to a class at design time
 */
class ControllerAttribute {
  constructor(readonly path: string) {}
}

describe('3.1. Set class attribute', () => {
  describe('# should able to', () => {
    it('add attribute to class using custom function', () => {
      function controller(path: string) {
        return decorateClass(new ControllerAttribute(path));
      }

      /*** user code begin ***/
      @controller('/api')
      class MyClass311 {}
      /*** user code end ***/

      const attribute = Reflector(MyClass311).getOwnAttribute(ControllerAttribute);
      expect(attribute).toBeInstanceOf(ControllerAttribute);
      expect(attribute && attribute.path).toBe('/api');
    });

    it('add attribute to class using const', () => {
      const controller = decorateClass(new ControllerAttribute('/api'));

      /*** user code begin ***/
      @controller
      class MyClass312 {}
      /*** user code end ***/

      const attribute = Reflector(MyClass312).getOwnAttribute(ControllerAttribute);
      expect(attribute).toBeInstanceOf(ControllerAttribute);
      expect(attribute && attribute.path).toBe('/api');
    });

    it('add attribute to class using helper function', () => {
      /*** user code begin ***/
      @decorateClass(new ControllerAttribute('/api'))
      class MyClass313 {}
      /*** user code end ***/

      const attribute = Reflector(MyClass313).getOwnAttribute(ControllerAttribute);
      expect(attribute).toBeInstanceOf(ControllerAttribute);
      expect(attribute && attribute.path).toBe('/api');
    });

    it('add attribute to class using Reflector api', () => {
      /*** user code begin ***/
      class MyClass314 {}
      /*** user code end ***/

      Reflector(MyClass314).addAttribute(new ControllerAttribute('/api'));

      const attribute = Reflector(MyClass314).getOwnAttribute(ControllerAttribute);
      expect(attribute).toBeInstanceOf(ControllerAttribute);
      expect(attribute && attribute.path).toBe('/api');
    });
  });

  describe('# should not able to', () => {
    it('add attribute with BeforeDecorate = false', () => {
      /*** user code begin ***/
      class NotAllowAttribute {
        beforeDecorate(
          target: object | Function,
          key?: string | symbol,
          descriptor?: PropertyDescriptor | number
        ): boolean {
          return false;
        }
      }
      @decorate(new NotAllowAttribute(), MemberKinds.Class)
      class MyClass314 {}
      /*** user code end ***/

      const attribute = Reflector(MyClass314).getOwnAttribute(NotAllowAttribute);
      expect(attribute).toBeUndefined();
    });
  });
});
