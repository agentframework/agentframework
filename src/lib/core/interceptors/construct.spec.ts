import { agent } from '../../agent'
import { AgentCompileType } from '../decorator';

class InjectableClass {
  constructor() {
  }
}

class InjectClass {
  injected: any = new InjectableClass();
}

@agent({ compile: AgentCompileType.LazyFunction })
class LazyFunction extends InjectClass {
}

@agent({ compile: AgentCompileType.LazyClass })
class LazyClass extends InjectClass {
}

@agent({ compile: AgentCompileType.LazyProxy })
class LazyProxy extends InjectClass {
}

@agent({ compile: AgentCompileType.StaticFunction })
class StaticFunction extends InjectClass {
}

@agent({ compile:AgentCompileType.StaticClass })
class StaticClass extends InjectClass {
}

@agent({ compile: AgentCompileType.StaticProxy })
class StaticProxy extends InjectClass {
}

@agent({ compile:AgentCompileType.DynamicFunction })
class DynamicFunction extends InjectClass {
}

@agent({ compile: AgentCompileType.DynamicClass })
class DynamicClass extends InjectClass {
}

@agent({ compile: AgentCompileType.DynamicProxy })
class DynamicProxy extends InjectClass {
}

describe('@construct', () => {
  
  describe('# should able to', () => {
    
    it('create LazyFunction agent', () => {
      const agent = new LazyFunction();
      expect(agent instanceof LazyFunction).toBe(true);
    });
    it('create LazyClass agent', () => {
      const agent = new LazyClass();
      expect(agent instanceof LazyClass).toBe(false);
    });
    it('create LazyProxy agent', () => {
      const agent = new LazyProxy();
      expect(agent instanceof LazyProxy).toBe(true);
    });
    it('create StaticFunction agent', () => {
      const agent = new StaticFunction();
      expect(agent instanceof StaticFunction).toBe(true);
    });
    it('create StaticClass agent', () => {
      const agent = new StaticClass();
      expect(agent instanceof StaticClass).toBe(false);
    });
    it('create StaticProxy agent', () => {
      const agent = new StaticProxy();
      expect(agent instanceof StaticProxy).toBe(true);
    });
    it('create DynamicFunction agent', () => {
      const agent = new DynamicFunction();
      expect(agent instanceof DynamicFunction).toBe(true);
    });
    it('create DynamicClass agent', () => {
      const agent = new DynamicClass();
      expect(agent instanceof DynamicClass).toBe(false);
    });
    it('create DynamicProxy agent', () => {
      const agent = new DynamicProxy();
      expect(agent instanceof DynamicProxy).toBe(true);
    });
  });
  
});
