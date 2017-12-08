import { AgentCompileType } from '../../src/lib/core/decorator';
import { agent } from '../../src/lib/agent';
import { inject } from '../../src/lib/extra/inject';
const Benchmark = require('benchmark');

class InjectableClass {
  constructor() {
  }
}

class Base {
  @inject(InjectableClass)
  injected: any;
}


@agent(null, AgentCompileType.LazyFunction)
class LazyFunction extends Base {
}

@agent(null, AgentCompileType.LazyClass)
class LazyClass extends Base {
}

@agent(null, AgentCompileType.LazyProxy)
class LazyProxy extends Base {
}

@agent(null, AgentCompileType.StaticFunction)
class StaticFunction extends Base {
}

@agent(null, AgentCompileType.StaticClass)
class StaticClass extends Base {
}

@agent(null, AgentCompileType.StaticProxy)
class StaticProxy extends Base {
}

@agent(null, AgentCompileType.DynamicFunction)
class DynamicFunction extends Base {
}

@agent(null, AgentCompileType.DynamicClass)
class DynamicClass extends Base {
}

@agent(null, AgentCompileType.DynamicProxy)
class DynamicProxy extends Base {
}

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
  console.log('Fastest is ' + this.filter('fastest').map('name'));
}).run();
