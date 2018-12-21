Agent Framework for TypeScript 2.3+, 3+
---------------------------------------

[![Build Status](https://travis-ci.org/agentframework/agentframework.svg?branch=master)](https://travis-ci.org/agentframework/agentframework)
[![Coverage Status](https://coveralls.io/repos/github/agentframework/agentframework/badge.svg?branch=master)](https://coveralls.io/github/agentframework/agentframework?branch=master)

### Principle

| PARADIGM                   | INSPIRATION  | PRINCIPLE  
|----------------------------|--------------|-------------------------------------------
| Function Programming       | Math         | It transform data
| OOP                        | The world    | It describe things and the relationships between them 
| Agent Oriented Programming | Human        | It actions like a human (AI)

### Concepts

| HUMAN       | AGENT FRAMEWORK   | DESCRIPTION
|-------------|-------------------|-------------------------------------------------------------------------
| People	    | Agent	            | A class decorate with @agent attribute 
| Action	    | Behavior          | Class method decorate with @action, @method or @behavior attribute 
| Belief	    | Memory            | Private class field decorated with @state, @remember, @memory attribute 
| Environment	| Domain            | A set of agents, components, services, artifacts 
| Autonomy	  | Activation        | Timer, scheduler which based on environment conditions 
| Sociality	  | Message           | Agent can communicate with other agent 
| Mobility	  | Mobile Agent      | An agent can move from domain to domain with their belief unchanged 

### Satellite projects

- [@agentframework/validation](https://github.com/agentframework/validation) Zero configuration validation framework for TypeScript

### Changelog

| Date       | Version                                      | Status      |
| ---------- | -------------------------------------------- | ----------- |
| 2018-12-21 | [0.9.23](doc/changelogs/CHANGELOG_0.9.x.md)  | Current     |
| 2017-06-30 | [0.5.12](doc/changelogs/CHANGELOG_0.5.x.md)  |             |
| 2017-01-06 | [0.4.4](doc/changelogs/CHANGELOG_0.4.x.md)   |             |
| 2016-11-20 | [0.3.12](doc/changelogs/CHANGELOG_0.3.x.md)  |             |
| 2016-11-03 | [0.2.28](doc/changelogs/CHANGELOG_0.2.x.md)  |             |

### What's this?

- 100% TypeScript implementation! No dependencies!!!
- A framework to build other frameworks (e.g. AOP/DI framework)
- Elegant design pattern to decorate your class with metadata and interceptors
- Require ES6 and TypeScript 2.3+
- Work in both node and browser
- Very Fast (Compile class at 1st time you new/call it; as fast as native class starting from 2nd time)
- Very Clean (Never touch your original class prototype, A on-demand compiled proxy will be generated on top of your class)
- Very Small (Only 908 SLOC @ v0.9.5)

### Why use Agent Framework?

- You want to build a framework which similar to Spring Framework but in JavaScript.
- You want to build an abstract layer for a specific business domain in your organization.
- You want to remove duplicated code and keep project codebase small and clean.
- You need a powerful method to pre-process, post-process or modify system behaviors without touching existing code.

### When use Agent Framework?

Agent Framework will help you on following areas: (which I did in other projects)

- Dependency Injection
- Data Access Layer
- Application Framework
- Service Hosting and Communication
- Validation
- Tracking / Monitoring
- Utilities
- ...
- **And there are so many waiting to be explored**


### Install and usage

```bash
  yarn add agentframework
```

### Show me the code

Just add 3 lines to your existing source code to enable the powerful Dependence Injection.

- `import { agent, inject } from 'agentframework'`
- `@agent()`
- `@inject()`

```typescript
import { agent, inject } from 'agentframework'

class Project {
  name = 'Agent Framework';
}

@agent()
class Developer {

  @inject()
  project: Project;

  constructor() {
    // EPIC: access the injected variable inside constructor
    console.log(`WOW! You working on project ${this.project.name}!`);
  }

}

// EPIC: create agent using new keyword without introduce IoC container
const you = new Developer();
console.log('Is it create from the Developer class?', you instanceof Developer);

// Results:
// > WOW! You working on project Agent Framework!
// > Is it create from the Developer class? true

```

### Show me more code
Following is code snippet from a real project. Find out more on the coming agentframework.com

```typescript

// controller

@controller('/api')
export class DemoController extends MyController {

  @singleton()
  apfs: ApfsService;

  @user()
  @middleware()
  async [Symbol()](ctx: MyContext, next: NextFunction) {
    return next();
  }

  /* this endpoint is only for admin, other users will got http 403 error */
  @admin()
  @method('GET', '/metadata')
  async metadata(ctx: MyContext) {
    return this.apfs.load(ctx.domain, 'apfs:///Federation/Microsoft/ProfileImages/49945e60-887e-40a6-83d1-b77a5e0c2d47');
  }

  /* this endpoint is only for authenticated users, other users will got http 401 error, because of @user on @middleware */
  @method('GET', '/profile')
  async profile(req: MyRequest, res: MyResponse) {
    return req.identity;
  }

}

// decorators

function user() {
  return decorateClassMethod(new RoleAttribute('User'));
}

function admin() {
  return decorateClassMethod(new RoleAttribute('Admin'));
}

export class RoleAttribute implements IAttribute, IInterceptor {
  constructor(private role: string) {}

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }

  public getInterceptor(): IInterceptor {
    return this;
  }

  public intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    const ctx: MyContext = parameters[0];
    if (!ctx.identity.roles.includes(this.role)) {
      throw new AuthenticationError(`Require ${this.role} Permission`);
    }
    return target.invoke(parameters);
  }
}

```

##### Explains
- Method/Middleware name can be a Symbol
- `ctx` is Koa like object, `req`,`res` is Express like objects. You can choose in between.
- Lazy load everything! `ApfsService` will not been created if you only GET /api/profile
- It deploys to **Lambda function** (Agent Cloud will be added later)
- @middleware() with **Full Promise** support
- You can easily create decorators like @admin(), @user() or @validate(CustomBodyType)
- `ApfsService` is an singleton object in application scope
- Auto generate test cases and API document
- ...

**Examples in this repository**

- [@prerequisite()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/prerequisite.spec.ts) Do not run the method body and `throw` an error when `prerequistite()` not met

- [@conditional()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/conditional.spec.ts) Likes `prerequistite()` but not throw error

- [@normalize()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/normalize.spec.ts) Capture `throw` in the method and modify the return value to this object `{ ok: 1|0, result?: any = return object, results?: any = return array, message?: string = err.message }`

- [@success()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/success.spec.ts) Change the specified class property value when this method run success (without `throw`)

- [@failure()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/failure.spec.ts)  Always return specified value if any `throw` happen in the intercepted method.

- [@timestamp()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/timestamp.spec.ts)  Update timestamp field after changes the field value

- [@cache()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/cache.spec.ts)  Simple but useful memory cache implementation

- [@inject()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/inject.spec.ts)  Dependence injection

- [@timestamp()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/timestamp.spec.ts)  Update timestamp field after changes the field value

- [@cache()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/cache.spec.ts)  Simple but useful memory cache implementation

**Advanced Examples (will be available after release 1.0)**
- Calculate the execution time of methods
- Check user group before the operations
- Add log for request and response
- Catch all error and normalize a response
- Create Singleton instance
- Create a ORM library
- Prevent Mongodb injection
- Create a scheduler


### Road to v1.0

- [x] MVP: Reflection can access type information generated by tsc. `tsc --emitDecoratorMetadata`
- [x] MVP: Reflection support both ES6 and ES2017 (Reflect.metadata)
- [x] MVP: Share metadata across different agentframework library of same application
- [x] MVP: Both agent or normal class can be used for dependence injection
- [x] MVP: Add IInitializer to init a field property
- [x] MVP: Interceptor can work with Initializer during dependence injection
- [x] EPIC: Create agent without domain
- [x] EPIC: Provide access to intercepted property value in constructor
- [x] PERFORMANCE: Metadata only attribute, attribute without interceptor
- [x] PERFORMANCE: Pre-compile class member interceptors to improve method call performance
- [x] PERFORMANCE: Cache class constructor interceptors to faster initialize new class instance staring from second time.
- [x] PERFORMANCE: Remove interceptor for @agent attribute to improve performance
- [x] PERFORMANCE: Do not add proxy if the agent don't have interceptor
- [x] PERFORMANCE: Remove ES6 Proxy if don't have field interceptor
- [x] COMPATIBILITY: Move @inject and @ready decorator out from core
- [x] COMPATIBILITY: GetPrototypeOf should return origin prototype
- [x] COMPATIBILITY: Agent should works in extended classes
- [x] COMPATIBILITY: instanceOf should works when compile to proxy
- [x] COMPATIBILITY: Revise IInvocation Interface
- [x] COMPATIBILITY: Revise IInitializer Interface
- [x] COMPATIBILITY: Revise IInterceptor Interface
- [x] COMPATIBILITY: Revise IAttribute Interface
- [x] COMPATIBILITY: Revise Reflection Interface
- [x] COMPATIBILITY: Revise Reflector Interface
- [x] COMPATIBILITY: Revise Agent Options
- [x] COMPATIBILITY: Revise Domain Interface (Domain is been completely removed from agentframework)
- [x] Satellite projects to build AgentFramework.com - Database support - mongodb 4.x
- [x] Satellite projects to build AgentFramework.com - Serverless support - AWS lambda, Alicloud Function Computing
- [ ] Satellite projects to build AgentFramework.com - Web Application Support
- [ ] AgentFramework.com


### Concepts in Agent Framework

- Attribute (associating declarative information with TypeScript code, e.g classes, methods and fields)
- Reflection (access the associated declarative information from classes, method or fields)
- Agent (A class which decorated with attributes)


### The Future of Agent Framework

It will be something between Function-a-a-S and Container-a-a-S.

Let's call it Agent-a-a-S which implement **Agent Oriented Programming**


### Package Info
```
📦  agentframework@0.9.22
=== Tarball Contents ===
752B   package.json
556B   LICENSE
10.7kB README.md
8.2kB  lib/index.d.ts
57.9kB lib/index.js
56.9kB lib/index.mjs
=== Tarball Details ===
name:          agentframework
version:       0.9.22
package size:  22.4 kB
unpacked size: 135.0 kB
shasum:        05484763e4301ec1f43bb1a16ce74d9392fddd5f
integrity:     sha512-LKQwcxVWbfJj+[...]9k9Kz/GfhoVEw==
total files:   6
```
