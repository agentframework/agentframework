# 2. drop es5 support to improve performance

Date: 2017-12-05

## Status

Accepted

## Context

In ES5 we need modify PropertyDescriptor to implement interceptor which is much slower than ES6 Proxy.

## Decision

We will drop ES5 support in major release

## Consequences

Some legacy browser, Safari 3.2, IE 10. NodeJS 5.12.0 still not support ES6.
