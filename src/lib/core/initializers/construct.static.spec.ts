import { agent } from '../../agent'
import { AgentCompileType } from '../compiler';

class InjectableClass {
}

class InjectClass {
  injected: any = new InjectableClass();
}

@agent({ compile: AgentCompileType.StaticFunction })
class StaticFunction extends InjectClass {
}

@agent({ compile: AgentCompileType.StaticClass })
class StaticClass extends InjectClass {
}

@agent({ compile: AgentCompileType.StaticProxy })
class StaticProxy extends InjectClass {
}


describe('core.initializers.construct.static', () => {

  describe('# should able to', () => {
    it('create StaticFunction agent', () => {
      new StaticFunction();
      const agent = new StaticFunction();
      expect(agent instanceof StaticFunction).toBe(true);
      // not support
      // expect(Reflect.getPrototypeOf(agent)).toBe(StaticFunction.prototype);
    });
    it('create StaticClass agent', () => {
      new StaticClass();
      const agent = new StaticClass();
      // not support
      // expect(agent instanceof StaticClass).toBe(true);
      // expect(Reflect.getPrototypeOf(agent)).toBe(StaticClass.prototype);
    });
    it('create StaticProxy agent', () => {
      new StaticProxy();
      const agent = new StaticProxy();
      expect(agent instanceof StaticProxy).toBe(true);
      expect(Reflect.getPrototypeOf(agent)).toBe(StaticProxy.prototype);
    });
  });

});
