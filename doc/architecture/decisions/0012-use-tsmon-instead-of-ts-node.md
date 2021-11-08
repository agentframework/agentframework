# 12. Use tsmon instead of ts-node

Date: 2021-08-21

## Status

Accepted

## Context

Because this project has `path-alias` in tsconfig.json which is a must for bootstrapping. `TS-NODE` not support `path-alias`.

## Decision

Use `tsmon`

## Consequences

Need more efforts to maintenance an extra tool
