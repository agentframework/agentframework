# 2. Use ES6 Proxy to provide transparent interceptor layer

Date: 2017-12-05

## Status

Accepted

## Context

In ES5, implement interceptor will modify existing class and this operation is not reversible.
It may cause compatibility issue with other frameworks.

## Decision

We will add ES6 Proxy for a transparent layer which not modifying user's class/object.

## Consequences

Some legacy browser, Safari 3.2, IE 10. NodeJS 5.12.0 not support ES6.
ES6 Proxy is slower than PropertyDescriptor.
