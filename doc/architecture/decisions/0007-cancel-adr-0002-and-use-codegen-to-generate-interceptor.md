# 7. cancel adr 0002 and use CodeGen to generate interceptor

Date: 2018-12-26

## Status

Accepted

## Context

Using Proxy will not as fast as native code. so we use CodeGen to generate a transparent layer on top of user's class to provide interceptor function.

## Decision

Use CodeGen

## Consequences

Maintainer require higher programming skills to use CodeGen instead of ES6 Proxy
