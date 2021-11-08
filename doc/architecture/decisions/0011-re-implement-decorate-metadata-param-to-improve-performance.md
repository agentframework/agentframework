# 11. re-implement **decorate **metadata \_\_param to improve performance

Date: 2021-08-07

## Status

Accepted

## Context

`__decorate`, `__metadata` and `__param` may contain more than half of total generated js in a large enterprise project.
Improve the performance will benefit large project.

## Decision

Re-Implement the above function with better performance. By remove the comparison inside loop.

## Consequences

Need manual change the import from `tslib` to `agentframeowork`
