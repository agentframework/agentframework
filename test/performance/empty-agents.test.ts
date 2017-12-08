import { AgentCompileType } from '../../src/lib/core/decorator';
import { agent } from '../../src/lib/agent';
const Benchmark = require('benchmark');

@agent(null, AgentCompileType.LazyFunction)
class LazyFunction {
}

@agent(null, AgentCompileType.LazyClass)
class LazyClass {
}

@agent(null, AgentCompileType.LazyProxy)
class LazyProxy {
}

@agent(null, AgentCompileType.StaticFunction)
class StaticFunction {
}

@agent(null, AgentCompileType.StaticClass)
class StaticClass {
}

@agent(null, AgentCompileType.StaticProxy)
class StaticProxy {
}

@agent(null, AgentCompileType.DynamicFunction)
class DynamicFunction {
}

@agent(null, AgentCompileType.DynamicClass)
class DynamicClass {
}

@agent(null, AgentCompileType.DynamicProxy)
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
