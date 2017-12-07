import { AgentInterceptorBuildType } from '../../src/lib/core/decorator';
import { agent } from '../../src/lib/agent';
const Benchmark = require('benchmark');

@agent(null, AgentInterceptorBuildType.LazyFunction)
class LazyFunction {
}

@agent(null, AgentInterceptorBuildType.LazyClass)
class LazyClass {
}

@agent(null, AgentInterceptorBuildType.LazyProxy)
class LazyProxy {
}

@agent(null, AgentInterceptorBuildType.StaticFunction)
class StaticFunction {
}

@agent(null, AgentInterceptorBuildType.StaticClass)
class StaticClass {
}

@agent(null, AgentInterceptorBuildType.StaticProxy)
class StaticProxy {
}

@agent(null, AgentInterceptorBuildType.DynamicFunction)
class DynamicFunction {
}

@agent(null, AgentInterceptorBuildType.DynamicClass)
class DynamicClass {
}

@agent(null, AgentInterceptorBuildType.DynamicProxy)
class DynamicProxy {
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
