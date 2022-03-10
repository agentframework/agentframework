# 14. a class can only have one agent decorator

Date: 2022-03-10

## Status

Accepted

## Context

`@agent()` decorator don't have a limit which can apply to a class more than one.

## Decision

To simplify code logic. 2.x should only have one `@agent()` decorator for a class

## Consequences

Only one agent is been created if decorate more than one `@agent()` decorator
