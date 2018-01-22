### Backlog Features

#### 001. Auto Dependence Injection
Dependence Injection with automatic type detection. 
Just need `@inject`, no more `@inject(SpecifiedClass)`

#### 002. Construct agent from json configuration
Construct agent from json configuration instead of decoration. 
Useful to upgrade 3rd party library or system types to agents.

#### 003. Resolve agent from remote domain
Agent can be resolve using hash string from another domain. 

### 

性能影响
如果Agent只有 IInitializer，那么在class创建之后便不会再有额外开销
如果Agent只有 IInterceptor，那么在class创建时候不会有额外开销
如果Agent既有 IInitializer，又有 IInterceptor，那么在创建和调用的时候都会有额外开销。（未标记IInterceptor的方法不会有额外开销）

最小的Domain就是一个Agent，每个Agent可以有自己的映射config
