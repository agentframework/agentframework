# 9. class field inject

Date: 2020-10-18

## Status

Accepted

## Context

Two options to inject a service to current class:

1. use `constructor(a: Service)` to inject the service.
2. use local class field and @singleton.

## Decision

AgentFramework use #2. Because it allow inject on demand. for example:

```typescript

class ServiceA {
    run() {}
}
class ServiceB {
    run() {}
}

class App {
    @singleton()
    a!: ServiceA

    @singleton()
    b: ServiceB

    firstStep() {
        this.a.run()
    }

    secondStep() {
        this.b.run()
    }
}

// The ServiceB will be injected when user called secondStep(). This is very important to develop a serverless application.
```

## Consequences

Hard to read the generated build. But you can read source code directly.
