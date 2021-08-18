/* tslint:disable */

import { agent } from '../../../src';
import { propertyDecorator } from './property';

@agent()
class TestPropertyDecoratorAgentClass {
  get activated(): boolean {
    return this._activated;
  }
  set activated(value) {
    this._activated = value;
  }

  @propertyDecorator()
  @propertyDecorator()
  test: string = 'test';

  _unused: number = 999;

  @propertyDecorator()
  private _activated: boolean = true;

  checkTest() {
    return true;
  }

  undecorated() {
    return this._unused;
  }
}

describe('PropertyDecorator', () => {
  describe('# should able to', () => {
    // TSC is not smart enough to check @PropertyDecorator() errors
    it('decorate on method', () => {
      @agent()
      class TestDecoratePropertyDecoratorToClassMethodAgentClass {
        @propertyDecorator()
        testMethod() {
          return 'test';
        }
      }
      expect(TestDecoratePropertyDecoratorToClassMethodAgentClass).toBeTruthy();
    });
    it('decorate on getter', () => {
      @agent()
      class TestDecoratePropertyDecoratorToClassGetterAgentClass {
        @propertyDecorator()
        get method() {
          return 'test';
        }
      }
      expect(TestDecoratePropertyDecoratorToClassGetterAgentClass).toBeTruthy();
    });
    it('decorate on setter', () => {
      @agent()
      class TestDecoratePropertyDecoratorToClassSetterAgentClass {
        @propertyDecorator()
        _method!: string;

        @propertyDecorator()
        set method(value: string) {
          this._method = value;
        }
      }
      expect(TestDecoratePropertyDecoratorToClassSetterAgentClass).toBeTruthy();
    });

    it('decorate on setter twice', () => {
      class NotAllowDecorateOnSetter {
        @propertyDecorator()
        _method!: string;
        @propertyDecorator()
        set method(value: string) {
          this._method = value;
        }
      }
      expect(NotAllowDecorateOnSetter).toBeTruthy();
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
