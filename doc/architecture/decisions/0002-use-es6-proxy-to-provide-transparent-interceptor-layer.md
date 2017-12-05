# 2. drop es5 support to improve performance

Date: 2017-12-05

## Status

Accepted

## Context

In ES5 we need modify PropertyDescriptor to implement interceptor which will modify existing objects.

## Decision

We will add ES6 Proxy for a transparent layer which not modifying user's code.

## Consequences

Some legacy browser, Safari 3.2, IE 10. NodeJS 5.12.0 still not support ES6.
ES6 Proxy is a little bit slower than PropertyDescriptor.
