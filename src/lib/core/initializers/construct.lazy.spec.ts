import { agent } from '../../agent'
import { AgentCompileType } from '../compiler';
import { inject } from '../../extra/inject';
import { normalize } from '../../extra/normalize';
declare var console;

class Language {
  name: 'JavaScript'
}

class Base {

  @inject(Language)
  @normalize()
  injected;

  @normalize()
  current() {
    return new Language();
  }

  @normalize()
  get normalized() {
    return new Language();
  }

}

@agent({ compile: AgentCompileType.LazyFunction })
class LazyFunction extends Base {

}

@agent({ compile: AgentCompileType.LazyClass })
class LazyClass extends Base {

}

@agent({ compile: AgentCompileType.LazyProxy })
class LazyProxy extends Base {

}

// Benchmark results of creating agent instance (new Agent()) in different compile type
// LazyFunction x 1,615,178 ops/sec ±9.07% (65 runs sampled)
// LazyClass    x 5,535,017 ops/sec ±1.69% (81 runs sampled)
// LazyProxy    x   492,807 ops/sec ±5.40% (78 runs sampled)

describe('core.initializers.construct.lazy', () => {

  describe('# should able to', () => {

    it('create agent using LazyFunction initializer', () => {
      const agent = new LazyFunction();
      expect(agent instanceof LazyFunction).toBe(true);
      expect(agent.injected).toBeTruthy();
      expect(agent.current()).toBeTruthy();

      console.log(agent.normalized);
      // function not support getPrototypeOf
      // expect(Reflect.getPrototypeOf(agent)).toBe(LazyFunction.prototype);
    });

    it('create agent using LazyClass initializer', () => {
      new LazyClass();
      const agent = new LazyClass();
      expect(agent.injected).toBeTruthy();
      expect(agent.current()).toBeTruthy();

      // class not support getPrototypeOf and instanceof
      // expect(agent instanceof LazyClass).toBe(true);
      // expect(Reflect.getPrototypeOf(agent)).toBe(LazyClass.prototype);
    });

    it('create agent using LazyProxy initializer', () => {
      new LazyProxy();
      const agent = new LazyProxy();
      expect(agent.injected).toBeTruthy();
      expect(agent.current()).toBeTruthy();

      // proxy support both getPrototypeOf / instanceof, but 10x slower than class
      expect(agent instanceof LazyProxy).toBe(true);
      expect(Reflect.getPrototypeOf(agent)).toBe(LazyProxy.prototype);
    });
  });

});

