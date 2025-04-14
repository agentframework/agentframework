# 19. Define Scoped Lifecycle Policy

Date: 2025-04-07

## Status

Accepted

## Context

Scoped instances are tied to a specific lifecycle scope, such as a web request or session. They are commonly used for services or components that need to retain state within that scope, but should not persist beyond it.

## Decision

When resolving a scoped instance, all parent domains must be checked first. If no matching instance is found, a new one is created in the current domain. This ensures that instances are reused within the same scope but are not shared across scopes.

## Consequences

Scoped instances can share state within the same scope (e.g., a single web request or session), enabling consistent behavior throughout that lifecycle. However, they remain isolated from other scopes to prevent unintended state leakage.
