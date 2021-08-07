# 11. re-implement __decorate __metadata __param to improve performance

Date: 2021-08-07

## Status

Accepted

## Context

`__decorate`, `__metadata` and `__param` may contains more than half of total generated js in a large enterprise project.
Improve the performance will benefit the application.

## Decision

Re-Implement the above function with better performance.

## Consequences

Need manual change the import from `tslib` to `agentframeowork`
