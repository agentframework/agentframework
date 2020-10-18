<p align="center">
  <a href="https://github.com/agentframework/agentframework">
    <img alt="AgentFramework" src="https://avatars2.githubusercontent.com/u/22611350?s=400&v=4" width="120">
  </a>
</p>

<p align="center">
An elegant & efficient TypeScript metaprogramming API to build <a target="_blank" href="https://en.wikipedia.org/wiki/Agent-oriented_programming">software agents</a>
</p>

<p align="center">
  <a href="https://travis-ci.org/agentframework/agentframework"><img src="https://travis-ci.org/agentframework/agentframework.svg?branch=main"></a>
  <a href="https://coveralls.io/github/agentframework/agentframework"><img src="https://coveralls.io/repos/github/agentframework/agentframework/badge.svg?branch=main"></a>
  <a href="https://www.codacy.com/app/agentframework/agentframework"><img src="https://api.codacy.com/project/badge/Grade/5101dc6abfd04608b7f61636245dab05?branch=main"></a>
  <a href="https://bundlephobia.com/result?p=agentframework"><img src="https://img.shields.io/bundlephobia/minzip/agentframework.svg"></a>
  <a href="https://snyk.io/test/npm/agentframework"><img src="https://snyk.io/test/npm/agentframework/badge.svg"></a>
  <a href="https://npmjs.com/package/agentframework"><img src="https://img.shields.io/npm/dm/agentframework.svg" alt="gzip size"></a>
</p>

---

:lollipop: **Modernize:** 100% for TypeScript. Support class and [es6 module](https://unpkg.com/agentframework/).

:zap: **Fast:** Use CodeGen to minimize overheads. Faster than es6 Proxy.

:dart: **Efficient:** Well-designed and crafted api only has **1000 SLOC** and **10kb** after gzipped.

:recycle: **Clean:** No prototype pollution.

## Features

-   Add metadata to your code at design-time (using @decorator) or runtime (using Reflector api)
-   Access the metadata at runtime (using Reflector api)
-   Dependence injection and dependence lookup

## Projects

-   [@agentframework/web-starter](https://github.com/agentframework/web-starter) A revolutionary framework crafted for software agents and micro services.
-   [@agentframework/validation](https://github.com/agentframework/validation) **Zero configuration** validation framework [example](https://github.com/agentframework/validation-example)

## Changelog

| Date       | Version                                     | Status      |
| ---------- | ------------------------------------------- | ----------- |
| 2020-10-18 | [2.0.0-rc.1](doc/changelogs/CHANGELOG_2.0.x.md)  | Latest     |
| 2019-02-27 | [1.0.0](doc/changelogs/CHANGELOG_1.0.x.md)  | Stable      |
| 2018-12-21 | [0.9.23](doc/changelogs/CHANGELOG_0.9.x.md) | Maintenance |

## Agent Oriented Programming

### Principle

| PARADIGM                   | INSPIRATION | PRINCIPLE                                             |
| -------------------------- | ----------- | ----------------------------------------------------- |
| Function Programming       | Math        | It transform data                                     |
| OOP                        | The world   | It describe things and the relationships between them |
| Agent Oriented Programming | Human       | It actions like a human (AI)                          |

### Concepts

| HUMAN       | AGENT FRAMEWORK | DESCRIPTION                                                             |
| ----------- | --------------- | ----------------------------------------------------------------------- |
| People      | Agent           | A class decorate with @agent attribute                                  |
| Action      | Behavior        | Class method decorate with @action, @method or @behavior attribute      |
| Belief      | Memory          | Private class field decorated with @state, @remember, @memory attribute |
| Environment | Domain          | A container for agents, entities, services or artifacts                 |
| Autonomy    | Activation      | Timer, scheduler which based on environment conditions                  |
| Sociality   | Message         | Agent can communicate with other agent                                  |
| Mobility    | Mobile Agent    | An agent can move from domain to domain with their belief unchanged     |

### When use Agent Framework

-   You want to build software agents.
-   You want to use dependence injection or dependence lookup.
-   You want to build a framework which similar to Spring Framework but in JavaScript.
-   You want to build an abstract layer for a specific business domain in your organization.
-   You want to remove duplicated code and keep project codebase small and clean.
-   You need a powerful method to pre-process, post-process or modify system behaviors without touching existing code.

### Show me the example

Install

```bash
npm i agentframework@2.0.0-rc.1
```

Only 3 lines before you get powerful dependency injection for your code

```typescript
import { agent, transit } from 'agentframework';

class ComponentA {
	name = 'Agent Framework';
}

@agent()
class ProjectA {
	@transit()
	private component!: ComponentA;

	constructor() {
		console.log(`WOW! You working on project ${this.component.name}!`);
	}
}

const project = new ProjectA();

console.log('Is it create from the ProjectA class?', project instanceof ProjectA);
```

### Agentframework 2.x milestones
-   [x] Breaking change: Remove `I` from interface name
-   [x] Breaking change: Remove `Intializer`. Use `Interceptor` instead
-   [x] MVP: Dependency injection/dependency lookup and `Domain` driven design support
-   [x] MVP: Improve unit test coverage rate
-   [ ] COMPATIBILITY: Revise error types and message
-   [ ] COMPATIBILITY: Revise Domain interface
-   [ ] COMPATIBILITY: Revise embedded decorators
-   [ ] EPIC: Abstract data layer - mongodb 4.x
-   [ ] EPIC: Cross architecture web application development (Server, Serverless)
-   [ ] EPIC: Serverless support - AWS Lambda, Google Cloud Function, Azure Function, Alicloud Function Computing
-   [ ] EPIC: Bot development (Telegram)
-   [ ] Other: Example and references
-   [ ] Other: docs.agentframework.com
-   [ ] Other: agentframework.com

### Agentframework 1.x milestones

-   [x] MVP: Reflection can access type information generated by tsc. `tsc --emitDecoratorMetadata`
-   [x] MVP: Reflection support both ES6 and ES2017 (Reflect.metadata)
-   [x] MVP: Share metadata across different agentframework library of same application
-   [x] MVP: Both agent or normal class can be used for dependence injection
-   [x] MVP: Add IInitializer to init a field property
-   [x] MVP: Interceptor can work with Initializer during dependence injection
-   [x] EPIC: Create agent without domain
-   [x] EPIC: Provide access to intercepted property value in constructor
-   [x] PERFORMANCE: Metadata only attribute, attribute without interceptor
-   [x] PERFORMANCE: Pre-compile class member interceptors to improve method call performance
-   [x] PERFORMANCE: Cache class constructor interceptors to faster initialize new class instance staring from second time.
-   [x] PERFORMANCE: Remove interceptor for @agent attribute to improve performance
-   [x] PERFORMANCE: Do not add proxy if the agent don't have interceptor
-   [x] PERFORMANCE: Remove ES6 Proxy if don't have field interceptor
-   [x] COMPATIBILITY: Move @inject and @ready decorator out from core
-   [x] COMPATIBILITY: GetPrototypeOf should return origin prototype
-   [x] COMPATIBILITY: Agent should works in extended classes
-   [x] COMPATIBILITY: instanceOf should works when compile to proxy
-   [x] COMPATIBILITY: Revise IInvocation Interface
-   [x] COMPATIBILITY: Revise IInitializer Interface
-   [x] COMPATIBILITY: Revise IInterceptor Interface
-   [x] COMPATIBILITY: Revise IAttribute Interface
-   [x] COMPATIBILITY: Revise Reflection Interface
-   [x] COMPATIBILITY: Revise Reflector Interface
-   [x] COMPATIBILITY: Revise Agent Options
-   [x] COMPATIBILITY: Revise Domain Interface (Domain is been completely moved to 2.0)


## License

Copyright 2020 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
