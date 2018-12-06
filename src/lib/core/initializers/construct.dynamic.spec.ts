import { agent } from '../../agent'
import { AgentCompileType } from '../compilerOptions';

class InjectableClass {
}

class InjectClass {
  injected: any = new InjectableClass();
}

@agent({ compile: AgentCompileType.DynamicFunction })
class DynamicFunction extends InjectClass {
}

@agent({ compile: AgentCompileType.DynamicClass })
class DynamicClass extends InjectClass {
}

@agent({ compile: AgentCompileType.DynamicProxy })
class DynamicProxy extends InjectClass {
}

describe('core.initializers.construct.dynamic', () => {

  describe('# should able to', () => {

    it('create DynamicFunction agent', () => {
      new DynamicFunction();
      const agent = new DynamicFunction();
      expect(agent instanceof DynamicFunction).toBe(true);
      // not support
      // expect(Reflect.getPrototypeOf(agent)).toBe(DynamicFunction.prototype);
    });

    it('create DynamicClass agent', () => {
      new DynamicClass();
      const agent = new DynamicClass();
      // not support
      // expect(agent instanceof DynamicClass).toBe(false);
      // expect(Reflect.getPrototypeOf(agent)).toBe(DynamicClass.prototype);
    });

    it('create DynamicProxy agent', () => {
      new DynamicProxy();
      const agent = new DynamicProxy();
      expect(agent instanceof DynamicProxy).toBe(true);
      expect(Reflect.getPrototypeOf(agent)).toBe(DynamicProxy.prototype);
    });

  });

});
