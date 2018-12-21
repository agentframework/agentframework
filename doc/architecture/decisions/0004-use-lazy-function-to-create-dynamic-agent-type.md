# 4. use lazy function to create dynamic agent type

Date: 2017-12-07

## Status

Accepted

## Context

We have 3 approaches and 3 types (function, class, proxy) to upgrade a class to an agent .

1. **Static** Upgrade when system startup.

- User can not change class attribute at runtime.
- The fastest way to create an agent
- Slowest to boot application when got over thousand agents.

2. **Lazy** Upgrade at the first time user called the class constructor.

- Lazy function, Lazy class, Lazy proxy (require ES6)
- User can not change after first time create the agent
- Fast to boot application
- Create agent is slower than #1

3. **Dynamic** Upgrade every time user called the class constructor.

- Almost same time to boot app with #2
- User can change attributes, effects on next create of new agent
- Slowest to create many agents

## Decision

The default value will be #2 LazyFunction. I think it's a good balance between booting application and creating agents.

## Consequences

User will not able to change attributes after created the 1st instance of that Agent type
