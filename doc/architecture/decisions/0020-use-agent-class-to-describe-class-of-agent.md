# 20. use agent class to describe class of agent

Date: 2025-04-14

## Status

Accepted

## Context

Related ADRs: [ADR-10: Use agent to describe an instance of class]

In the context of our IoC container and AOP system, we refer to an instance of a class managed by the container as an Agent. These instances may include additional behavior via proxies, decorators, or interceptors.

Originally, we used the name AgentType to refer to the class (constructor) that defines the structure of an Agent. However, this term is:

Ambiguous in TypeScript, where type often refers to compile-time types.

Not idiomatic when referring to JavaScript classes or constructors.

Slightly misleading, as AgentType could be interpreted as the type of an agent, rather than the class that produces one.

## Decision

We will use the name AgentClass to describe the constructor/class used to produce an Agent.

- `Agent`: the instance

- `AgentClass`: the class/constructor that creates the Agent

This change improves clarity and aligns with JavaScript/TypeScript terminology, where Class is widely understood to mean a constructible function with new.

Example
```typescript
getAgent<T extends AgentReference>(ref: T): Agent<T> | undefined;
getAgentClass<T extends AgentReference>(ref: T): AgentClass<T> | undefined;
```

```ts
export type AgentClass<T> = new (...args: any[]) => Agent<T>;
```

## Consequences

All prior references to AgentType will be renamed to AgentClass.

Unit tests and internal APIs will need to be updated for consistency.

Documentation and comments should reflect the new terminology.

## Notes

This decision improves the long-term readability and maintainability of the IoC API. It makes the relationship between classes and agents clearer, especially for developers new to the system or coming from other DI frameworks.


