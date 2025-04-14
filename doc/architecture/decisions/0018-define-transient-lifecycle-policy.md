# 18. Define Transient Lifecycle Policy

Date: 2025-04-07

## Status

Accepted

## Context

Transient instances are short-lived objects that are created and destroyed frequently.
They are typically used for stateless services or components that do not need to retain any state between invocations.

## Decision

Transient instances must always be created and destroyed within the current domain.
They should not be promoted or shared across domains.

## Consequences

Each transient instance is isolated and does not share state with any other instance.
This reinforces their use for stateless operations, ensuring independence and reducing the risk of unintended side effects.
