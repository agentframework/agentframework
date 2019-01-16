<p align="center">
  <a href="https://github.com/agentframework/agentframework">
    <img alt="AgentFramework" src="https://avatars2.githubusercontent.com/u/22611350?s=400&v=4" width="120">
  </a>
</p>

<p align="center">
An elegant reflection api to build your fast and powerful AOP/DI framework for TypeScript
</p>

<p align="center">
  <a href="https://github.com/agentframework/agentframework/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/agentframework.svg"></a>
  <a href="https://travis-ci.org/agentframework/agentframework"><img src="https://travis-ci.org/agentframework/agentframework.svg"></a>
  <a href="https://coveralls.io/github/agentframework/agentframework"><img src="https://coveralls.io/repos/github/agentframework/agentframework/badge.svg?branch=master&_utm_source=github"></a>
  <a href="https://snyk.io/test/npm/agentframework"><img src="https://snyk.io/test/npm/agentframework/badge.svg"></a>
  <a href="https://npmjs.com/package/agentframework"><img src="https://img.shields.io/npm/dm/agentframework.svg" alt="gzip size"></a>
</p>

---

:lollipop: **Modernize:** 100% TypeScript implementation with [ES6 module support](https://unpkg.com/agentframework/)

:zap: **Fast:** use CodeGen instead of ES6 Proxy. Run as fast as native code.

:dart: **Efficient:** well designed and optimized api only got **600 SLOC** and **4.3kb** after gzipped

:recycle: **Productive:** intercept and initialize target as easy as a function call

## Features

- Declare metadata for your code in design-time (using @decorator) or runtime (using Reflector api)
- Retrieve metadata for your code in runtime using (Reflector api)
- Customizable initializer for class fields and arguments
- Customizable interceptor for injected value, class method, getter, setter and arguments

### Projects

- [@agentframework/domain](https://github.com/agentframework/domain) **On demand** dependency injection framework [example](https://github.com/agentframework/domain-example)
- [@agentframework/validation](https://github.com/agentframework/validation) **Zero configuration** validation framework [example](https://github.com/agentframework/validation-example)

### Changelog

| Date       | Version                                          | Status  |
| ---------- | ------------------------------------------------ | ------- |
| 2019-01-14 | [1.0.0-rc.16](doc/changelogs/CHANGELOG_1.0.x.md) | Preview |
| 2018-12-21 | [0.9.23](doc/changelogs/CHANGELOG_0.9.x.md)      | Stable  |

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
| Environment | Domain          | A set of agents, components, services, artifacts                        |
| Autonomy    | Activation      | Timer, scheduler which based on environment conditions                  |
| Sociality   | Message         | Agent can communicate with other agent                                  |
| Mobility    | Mobile Agent    | An agent can move from domain to domain with their belief unchanged     |

### What's this?

- 100% TypeScript implementation! No dependencies!!!
- A framework to build other frameworks (e.g. AOP/DI/ORM/Web framework)
- Elegant design pattern to decorate your class with metadata, initializers and interceptors
- Require ES6 and TypeScript 2.4+
- Work in both node and browser
- Very Fast (Compile class at 1st time you new/call it; as fast as native class starting from 2nd time)
- Very Clean (Never touch your original class prototype, A on-demand compiled proxy will be generated on top of your class)
- Very Small (Only 594 SLOC and 4.3kb zipped @ v1.0.0-rc14, deep considerations behind every single line of code)

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

### Show me the example

Just add 3 lines to your existing source code to enable the powerful **ODDI** (On Demand Dependency Injection).

- `import { agent, inject } from '@agentframework/domain'`
- `@agent()`
- `@inject()`

```typescript
import { agent, inject } from '@agentframework/domain';

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
    return this.apfs.load(
      ctx.domain,
      'apfs:///Federation/Microsoft/ProfileImages/49945e60-887e-40a6-83d1-b77a5e0c2d47'
    );
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

- [@failure()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/failure.spec.ts) Always return specified value if any `throw` happen in the intercepted method.

- [@timestamp()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/timestamp.spec.ts) Update timestamp field after changes the field value

- [@cache()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/cache.spec.ts) Simple but useful memory cache implementation

- [@inject()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/inject.spec.ts) Dependence injection

- [@timestamp()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/timestamp.spec.ts) Update timestamp field after changes the field value

- [@cache()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/cache.spec.ts) Simple but useful memory cache implementation

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

Let's call it Agent-a-a-S which implement **decentralized** agent sociality environment utilize the power of Edge Computing
