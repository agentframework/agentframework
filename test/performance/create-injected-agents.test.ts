import { AgentInterceptorBuildType } from '../../src/lib/core/decorator';
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


@agent(null, AgentInterceptorBuildType.LazyFunction)
class LazyFunction extends Base {
}

@agent(null, AgentInterceptorBuildType.LazyClass)
class LazyClass extends Base {
}

@agent(null, AgentInterceptorBuildType.LazyProxy)
class LazyProxy extends Base {
}

@agent(null, AgentInterceptorBuildType.StaticFunction)
class StaticFunction extends Base {
}

@agent(null, AgentInterceptorBuildType.StaticClass)
class StaticClass extends Base {
}

@agent(null, AgentInterceptorBuildType.StaticProxy)
class StaticProxy extends Base {
}

@agent(null, AgentInterceptorBuildType.DynamicFunction)
class DynamicFunction extends Base {
}

@agent(null, AgentInterceptorBuildType.DynamicClass)
class DynamicClass extends Base {
}

@agent(null, AgentInterceptorBuildType.DynamicProxy)
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
