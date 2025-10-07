import { Reflector, ParameterAttribute, decorateParameter } from '../../../packages/dependencies/agent';

class MandatoryAttribute implements ParameterAttribute {}

describe('3.5. Set class method attribute', () => {
  describe('# should able to', () => {
    it('add attribute to class method parameter using custom function', () => {
      function mandatory() {
        return decorateParameter(new MandatoryAttribute());
      }

      /*** user code begin ***/
      class MyController351 {
        listAllUser(@mandatory() @mandatory() department: string, limit: number) {}
      }
      /*** user code end ***/
      const parameter = Reflector(MyController351).property('listAllUser').parameter(0);

      expect(parameter.hasOwnAttribute()).toBe(true);
      const mandatoryAttribute = parameter.getOwnAttribute(MandatoryAttribute);
      expect(mandatoryAttribute).toBeTruthy();
      expect(mandatoryAttribute).toBeInstanceOf(MandatoryAttribute);
    });

    it('add attribute to class method parameter using const', () => {
      const Mandatory = decorateParameter(new MandatoryAttribute());

      /*** user code begin ***/
      class MyController352 {
        listAllUser(@Mandatory department: string) {}
      }
      /*** user code end ***/
      const parameter = Reflector(MyController352).property('listAllUser').getParameters()[0];
      expect(parameter).toBeTruthy();
      const mandatoryAttribute = parameter.getOwnAttribute(MandatoryAttribute);
      expect(mandatoryAttribute).toBeInstanceOf(MandatoryAttribute);
    });

    it('add attribute to class method parameter using helper function', () => {
      /*** user code begin ***/
      class MyController353 {
        listAllUser(@decorateParameter(new MandatoryAttribute()) department: string) {}
      }
      /*** user code end ***/
      const parameter = Reflector(MyController353).property('listAllUser').getParameter(0);

      if (!parameter) {
        throw new Error('property should not null');
      }
      expect(parameter).toBeTruthy();
      const mandatoryAttribute = parameter.getOwnAttribute(MandatoryAttribute);

      expect(mandatoryAttribute).toBeInstanceOf(MandatoryAttribute);
    });

    it('add attribute to class method parameter using Reflector', () => {
      /*** user code begin ***/
      class MyController353 {
        listAllUser(department: string) {}
      }
      /*** user code end ***/
      Reflector(MyController353).property('listAllUser').parameter(0).addAttribute(new MandatoryAttribute());

      const parameter1 = Reflector(MyController353).property('listAllUser').getParameter(0);
      if (!parameter1) {
        throw new Error('property should not null');
      }
      expect(parameter1).toBeTruthy();
      const mandatoryAttribute = parameter1.getOwnAttribute(MandatoryAttribute);

      expect(mandatoryAttribute).toBeInstanceOf(MandatoryAttribute);
    });
  });
});
