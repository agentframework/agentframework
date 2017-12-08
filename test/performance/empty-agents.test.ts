import { AgentCompileType } from '../../src/lib/core/decorator';
import { agent } from '../../src/lib/agent';
import { inject } from '../../src/lib/extra/inject';
const Benchmark = require('benchmark');

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


describe('@benchmark', () => {

  describe('# should able to', () => {

    this.timeout(60000);

    it('create new instance with hardcode inject', (done) => {

      const suite = new Benchmark.Suite;

      suite.add('LazyFunction', function () {
        new LazyFunction();
      }).add('LazyClass', function () {
        new LazyClass()
      }).add('LazyProxy', function () {
        new LazyProxy()
      }).add('StaticFunction', function () {
        new StaticFunction();
      }).add('StaticClass', function () {
        new StaticClass()
      }).add('StaticProxy', function () {
        new StaticProxy()
      }).add('DynamicFunction', function () {
        new StaticFunction();
      }).add('DynamicClass', function () {
        new StaticClass()
      }).add('DynamicProxy', function () {
        new StaticProxy()
      }).on('cycle', function (event) {
        console.log(String(event.target));
      }).on('complete', function () {
        // console.log('Fastest is ' + this.filter('fastest').map('name'));
        done();
      }).run();


    });

  });

});

