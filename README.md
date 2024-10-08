<p align="center">
  <a href="https://github.com/agentframework/agentframework">
    <img alt="AgentFramework" src="https://avatars2.githubusercontent.com/u/22611350?s=400&v=4" width="120">
  </a>
</p>

<p align="center">
An elegant & efficient TypeScript metaprogramming API to build <a target="_blank" href="https://en.wikipedia.org/wiki/Agent-oriented_programming">software agents</a>
</p>

<p align="center">
  <a href="https://coveralls.io/github/agentframework/agentframework?branch=main"><img src="https://coveralls.io/repos/github/agentframework/agentframework/badge.svg?branch=main"></a>
  <a href="https://www.codacy.com/app/agentframework/agentframework"><img src="https://api.codacy.com/project/badge/Grade/5101dc6abfd04608b7f61636245dab05?branch=main"></a>
  <a href="https://bundlephobia.com/result?p=agentframework"><img src="https://img.shields.io/bundlephobia/minzip/agentframework.svg"></a>
  <a href="https://snyk.io/test/npm/agentframework"><img src="https://snyk.io/test/npm/agentframework/badge.svg"></a>
  <a href="https://npmjs.com/package/agentframework"><img src="https://img.shields.io/npm/dm/agentframework.svg" alt="gzip size"></a>
</p>

---

:lollipop: **Modernize:** 100% for TypeScript. Side-effect free tree shaking compatible since [ES2015](https://unpkg.com/agentframework/).

:zap: **Fast:** Use CodeGen to minimize overheads. Faster than es6 Proxy.

:dart: **Efficient:** Well-designed and crafted api only has **1300 SLOC** and **5.6kb** after minzipped.

:recycle: **Clean:** Transparent dynamic proxy. No prototype pollution. No reflect-metadata or any npm dependencies.

## AgentFramework's Commitment to Metaprogramming

The release of [TypeScript 5](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/), with its removal of `--emitDecoratorMetadata`, presents a challenge for metaprogramming. However, AgentFramework will continue to provide metadata in future versions and apply all possible workarounds to maintain its availability.

## Official Supported Environment

| Platform       | Version                                                                             |
| -------------- | ----------------------------------------------------------------------------------- |
| Node.js        | 22, 20, 18, 16, 14, 12, 10, 8 |
| TypeScript 5.x | 5.5.4, 5.4.5, 5.3.3, 5.2.2, 5.1.6, 5.0.4 |
| TypeScript 4.x | 4.7.2, 4.6.3, 4.5.5, 4.4.4, 4.3.5, 4.2.4, 4.1.5, 4.0.5 |
| TypeScript 3.x | 3.9.7, 3.8.3, 3.7.5, 3.6.5, 3.5.1, 3.4.5, 3.3.4000, 3.2.4, 3.1.6, 3.0.3 |



## Changelog

| Date       | Version                                                | Status      |
| ---------- | ------------------------------------------------------ | ----------- |
| 2024-08-21 | [2.0.4](doc/changelogs/CHANGELOG_2.0.x.md)             | Stable      |
| 2019-02-27 | [1.0.0](doc/changelogs/CHANGELOG_1.0.x.md)             | EOL         |
| 2018-12-21 | [0.9.23](doc/changelogs/CHANGELOG_0.9.x.md)            | EOL 		|
| 2017-06-30 | [0.5.12](doc/changelogs/CHANGELOG_0.5.x.md)            | EOL         |
| 2016-11-03 | [0.2.28](doc/changelogs/CHANGELOG_0.2.x.md)            | EOL         |

### Install

```bash
npm i agentframework
```

### Example code

```typescript
import { agent, singleton } from 'agentframework';

class ComponentA {
	name = 'Agent Framework';
}

@agent()
class ProjectA {
	@singleton()
	private component!: ComponentA;

	constructor() {
		console.log(`WOW! You working on project ${this.component.name}!`);
	}
}

const project = new ProjectA();

console.log('Is it create from the ProjectA class?', project instanceof ProjectA);
```

## Features

-   Add metadata to your code at design-time (using @decorator) or runtime (using Reflector api)
-   Access the metadata at runtime (using Reflector api)
-   AOP, dependence injection and dependence lookup

## Projects

-   [Hello World!](https://github.com/agentframework/hello-world) Your first AgentFramework project.

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
| People      | Agent           | A class decorate with @agent attribute                                  |
| Action      | Behavior        | Class method decorate with @action, @method or @behavior attribute      |
| Belief      | Memory          | Private class field decorated with @state, @remember, @memory attribute |
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

### Agentframework 2.x milestones

-   [x] Breaking change: Remove `I` from interface name
-   [x] Breaking change: Remove `Intializer`. Use `Interceptor` instead
-   [x] MVP: Dependency injection/dependency lookup and `Domain` driven design support
-   [x] MVP: Improve unit test coverage rate
-   [x] COMPATIBILITY: Revise error types and message
-   [x] COMPATIBILITY: Revise Domain interface
-   [x] COMPATIBILITY: Revise embedded decorators
-   [ ] Enterprise: Abstract data layer - mongodb 4.x
-   [ ] Enterprise: Cross architecture web application development (Server, Serverless)
-   [ ] Enterprise: Serverless support - AWS Lambda, Google Cloud Function, Azure Function, Alicloud Function Computing
-   [ ] Enterprise: Bot development (Telegram)
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
-   [x] PERFORMANCE: Caching class constructor interceptors to reduce future class instance creation time.
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


## Special Thanks To:

[<img src="https://user-images.githubusercontent.com/1542425/147318909-dbfbde6b-d182-4f99-bbcc-f899823d4adb.png" alt="" width="150">](https://www.jetbrains.com)

[JetBrains](https://www.jetbrains.com/), creators of the IntelliJ IDEA, supports AgentFramework with one of their [Open Source Licenses](https://www.jetbrains.com/opensource/). IntelliJ IDEA is the recommended IDE for working with AgentFramework.


## License

Copyright 2024 Ling Zhang!


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
