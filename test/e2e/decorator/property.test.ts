
import { agent } from '../../../src/lib';
import { propertyDecorator } from './property';

@agent()
class TestPropertyDecoratorAgentClass {

  @propertyDecorator()
  private _activated: boolean = true;

  @propertyDecorator()
  @propertyDecorator()
  test: string = 'test';

  _unused: number = 999;

  get activated(): boolean {
    return this._activated;
  }
  set activated(value) {
    this._activated = value
  }

  checkTest() {
    return true;
  }

  undecorated() {
    return this._unused;
  }

}

describe('PropertyDecorator', () => {

  describe('# should not able to', () => {

    // TSC is not smart enough to check @PropertyDecorator() errors
    it('decorate on method', () => {
      expect(() => {
        @agent()
        class TestDecoratePropertyDecoratorToClassMethodAgentClass {
          @propertyDecorator()
          testMethod() {
            return 'test';
          }
        }
        expect(TestDecoratePropertyDecoratorToClassMethodAgentClass).toBeTruthy()
      }).toThrowError('PropertyDecoratorAttribute can only decorate on class field property');
    });
    it('decorate on getter', () => {
      expect(() => {
        @agent()
        class TestDecoratePropertyDecoratorToClassGetterAgentClass {
          @propertyDecorator()
          get method() {
            return 'test';
          }
        }
        expect(TestDecoratePropertyDecoratorToClassGetterAgentClass).toBeTruthy()
      }).toThrowError('PropertyDecoratorAttribute can only decorate on class field property');
    });
    it('decorate on setter', () => {
      expect(() => {
        @agent()
        class TestDecoratePropertyDecoratorToClassSetterAgentClass {
          _method: string;
          @propertyDecorator()
          set method(value: string) {
            this._method = value;
          }
        }
        expect(TestDecoratePropertyDecoratorToClassSetterAgentClass).toBeTruthy()
      }).toThrowError('PropertyDecoratorAttribute can only decorate on class field property');
    });
    it('decorate on setter twice', () => {
      expect(() => {
        @agent()
        class TestDecoratePropertyDecoratorToClassSetterAgentClass {
          _method: string;
          @propertyDecorator()
          set method(value: string) {
            this._method = value;
          }
        }
        expect(TestDecoratePropertyDecoratorToClassSetterAgentClass).toBeTruthy()
      }).toThrowError('PropertyDecoratorAttribute can only decorate on class field property');
    });

  });

  describe('# should able to', () => {

    it('call decorated class member', () => {
      const agent = new TestPropertyDecoratorAgentClass();
      expect(agent.activated).toEqual(true);
    });

    it('call decorated prototype member', () => {
      const agent = new TestPropertyDecoratorAgentClass();
      expect(agent.test).toEqual('test');
    });

    it('call undecorated class member', () => {
      const agent = new TestPropertyDecoratorAgentClass();
      expect(agent.activated).toEqual(true);
    });

    it('call undecorated prototype member', () => {
      const agent = new TestPropertyDecoratorAgentClass();
      expect(agent.undecorated()).toEqual(999);
    });

  });

});
