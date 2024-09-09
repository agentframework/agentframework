# 16. use DomainLike as default Domain indicator

Date: 2024-08-23

## Status

Accepted

## Context

Domain is a class, DomainLike is an interface

## Decision

Use interface instead of class

## Consequences

No longer to use `x instanceof Domain` to determine whether `x` is a domain or not, but can use `IsDomain` function to test
