# 6. use property field to get interceptor instead of use method

Date: 2018-12-26

## Status

Accepted

## Context

For giving attribute have below two approach to get an interceptor

```ts
class MyAttribute implements IAttribute {
  interceptor = new MyInterceptor() // option #1
  getInterceptor() { // option #2
    return new MyInterceptor();
  }
}
```

## Decision

Use `interceptor = new MyInterceptor()` because unable to reuse unless create more
code when using getInterceptor() as above. This is a productivity driven framework, so
option #1 is more rational.

```ts
class MyAttribute implements IAttribute {
  interceptor = new MyInterceptor(); // cache the interceptor
}
```

```ts
class MyAttribute implements IAttribute {
  get interceptor() {
    return new MyInterceptor(); // return new interceptor everytime
  }
}
```

## Consequences

Interfaces need revise
