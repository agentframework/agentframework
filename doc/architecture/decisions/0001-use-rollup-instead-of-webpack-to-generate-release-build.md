# 1. use rollup instead of webpack to generate release build

Date: 2017-12-04

## Status

Accepted

## Context

For commonjs use at nodejs, Webpack will introduce some helper functions which we don't want.

## Decision

Use rollup to replace webpack to generate release build

## Consequences

The browser based app need to use some tools like webpack to load agentframework in browser.
(this is not a problem after 1.0.0-rc.5. because we export ES Module format .mjs)
