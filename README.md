Agent Framework for TypeScript 2.2+
-----------------------------------

[![Build Status](https://travis-ci.org/agentframework/agentframework.svg?branch=master)](https://travis-ci.org/agentframework/agentframework)
[![Coverage Status](https://coveralls.io/repos/github/agentframework/agentframework/badge.svg?branch=master)](https://coveralls.io/github/agentframework/agentframework?branch=master)

### What's this?
- AOP for TypeScript
- Elegant design pattern to decorate your class with interceptors 
- 100% TypeScript implementation! No dependencies!!!
- Require ES6 and TypeScript 2.2+

### Install and usage

```bash
  npm install --save agentframework
```
or
```bash
  yarn add agentframework
```

### Examples

- [@prerequisite()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/prerequisite.ts) Do not run the method body and `throw` an error when `prerequistite()` not met

- [@conditional()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/conditional.ts) Likes `prerequistite()` but not throw error

- [@normalize()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/normalize.ts) Capture `throw` in the method and modify the return value to this object `{ ok: 1|0, result?: any = return object, results?: any = return array, message?: string = err.message }` 

- [@success()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/success.ts) Change the specified class property value when this method run success (without `throw`)

- [@failure()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/failure.ts)  Always return specified value if any `throw` happen in the intercepted method.

- [@timestamp()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/timestamp.ts)  Update timestamp field after changes the field value

- [@cache()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/cache.ts)  Simple but useful memory cache implementation

### Development

Run tests with coverage report
```bash
npm test
```

Start development workflow - monitoring .ts file changes and run unit test against the changes
```bash
npm start
```

### Without 'Agent Framework'

```typescript
class Kernel {
  
  private _initialized: boolean;
  private _root: Directory;
  
  public static getInstance(): Kernel {
    return new Kernel();
  }
  
  public init(configDir: string = process.cwd()): void {
    if(!this._initialized) {
    	throw new TypeError('Kernel already initialized')
    }
    this._root = Directory.withReadPermission(configDir);
    this._initialized = true
  }
  
  public resolve(relativePath): Directory {
    if(!this._initialized) {
    	throw new TypeError('Kernel already initialized')
    }
    return this._root.resolve(relativePath);
  }
  
  public getRoot(): string {
    try {
      return this._root.path;
    }
    catch(err) {
      return null;
    }
  }
}

```

### Implement with 'Agent Framework - State Machine'

```typescript
import { agent, prerequisite, success, failure } from 'agentframework'

@agent('OneStack')
class Kernel {
  
  private _root: Directory;
  
  public static getInstance(): Kernel {
    return Domain.createAgentFromType(Kernel);
  }
  
  @prerequisite('initialized', false, 'OneStack already initialized')
  @success('initialized', true)
  public init(configDir: string = process.cwd()): void {
    this._root = Directory.withReadPermission(configDir);
  }
  
  @prerequisite('initialized', true, 'OneStack not initialized. Please call init() first!')
  public resolve(relativePath): Directory {
    return this._root.resolve(relativePath);
  }
  
  @failure(null)
  public getRoot(): string {
    return this._root.path;
  }
}
```
