Agent Framework for TypeScript 2.2+
-----------------------------------

[![Build Status](https://travis-ci.org/agentframework/agentframework.svg?branch=master)](https://travis-ci.org/agentframework/agentframework)
[![Coverage Status](https://coveralls.io/repos/github/agentframework/agentframework/badge.svg?branch=master)](https://coveralls.io/github/agentframework/agentframework?branch=master)

### What's this?
- AOP for TypeScript
- Elegant design pattern to decorate your class with interceptors 
- 100% TypeScript implementation! No dependencies!!!
- Require ES6 and TypeScript 2.2+

### Why use Agent Framework?

- You need a powerful method to pre-process, post-process or modify system behaviors without touching existing code.
- You want to build an abstract layer for a specific business domain in your organization.
- You want to remove duplicated code and keep project codebase small and clean.

### Install and usage

```bash
  npm install --save agentframework
```
or
```bash
  yarn add agentframework
```

### Examples

With Agent Framework

```typescript
import { agent, failure } from 'agentframework'

@agent()
class ExampleAgent {
  
  public text: string;
  
  @failure('')
  public getLowerCase(): string {
    return this.text.toLowerCase();
  }
 
}
```

Without Agent Framework

```typescript
class ExampleAgent {
  
  public text: string;
  
  public getLowerCase(): string {
    try {
      return this.text.toLowerCase();
    }
    catch(err) {
      return '';
    }
  }
}
```

**Attributes in AgentFramework 0.x**

- [@prerequisite()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/prerequisite.ts) Do not run the method body and `throw` an error when `prerequistite()` not met

- [@conditional()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/conditional.ts) Likes `prerequistite()` but not throw error

- [@normalize()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/normalize.ts) Capture `throw` in the method and modify the return value to this object `{ ok: 1|0, result?: any = return object, results?: any = return array, message?: string = err.message }` 

- [@success()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/success.ts) Change the specified class property value when this method run success (without `throw`)

- [@failure()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/failure.ts)  Always return specified value if any `throw` happen in the intercepted method.

- [@timestamp()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/timestamp.ts)  Update timestamp field after changes the field value

- [@cache()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/cache.ts)  Simple but useful memory cache implementation

**More Examples**
- Calculate the execution time of methods
- Check user group before the operations
- Add log for request and response
- Catch all error and normalize a response
- Create Singleton instance
- Create a ORM library
- Prevent Mongodb injection
- Create a scheduler

### Concepts in Agent Framework

- Attribute (associating declarative information with TypeScript code, e.g classes, methods and fields)
- Reflection (access the associated declarative information from classes, method or fields)
- Agent (A class which decorated with attributes)
- Domain (A host environment for agents)

### The Future of Agent Framework

The goal of Agent Framework is to build the first AaaS cloud which implement [Agent Oriented Programming](https://en.wikipedia.org/wiki/Agent-oriented_programming).

It's different to any of the clouds today, the major different are:

- AaaS is a distributed cloud network which doesn't have a central database
- IPv6 is mandatory for an agent live in AaaS cloud
- Agent will use digital currency to collaborate with other agent or pay the rent to the host
- The host also an agent which have power, storage and computing resource
