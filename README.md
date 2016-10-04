Agent Framework for TypeScript 2
--------------------------------

Before

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
}

```

After

```typescript
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
}
```