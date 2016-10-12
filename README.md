Agent Framework for TypeScript 2
--------------------------------

### What's this?
- AOP for TypeScript
- Custom your own interceptor with elegance design pattern
- Require ES6 and TypeScript 2.x

### Install and usage

```bash
  npm install --save agentframework@latest
```

### Examples

- [@prerequisite()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/prerequisite.ts) `throw` an error if `prerequistite()` not met

- [@output()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/output.ts) Capture `throw` in the method and modify the return value to this object `{ result, error }` 

- [@success()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/success.ts) Change the specified class property value when this method run success (without `throw`)

- [@failure()](https://github.com/agentframework/agentframework/blob/master/src/lib/extra/failure.ts)  Always return specified value if any `throw` happen in the intercepted method.


### Without 'Agent Framework'

```typescript
class Kernel {
  
  private _initialized: boolean;
  private _root: Directory;
  
  public static getInstance(): Kernel {
    return new Kernel());
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
