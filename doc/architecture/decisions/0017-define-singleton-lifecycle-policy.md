# 17. Define Singleton Lifecycle Policy

Date: 2025-04-07

## Status

Accepted

## Context

A Singleton instance refers to a class that is instantiated only once during the application’s lifecycle.
It provides a single, shared point of access to a resource or service across the application.

## Decision

Singleton instances must be created exclusively in the top-level domain.
Creating singleton instances in any other domain is disallowed.
This ensures that the instance is truly shared across all domains and avoids unintended duplication.

## Consequences

Resolving the singleton instance may take longer, as the resolution process must traverse to the parent (top-level) domain to retrieve the instance.
