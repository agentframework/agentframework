# 3. Performance decisions

Date: 2017-12-07

## Status

Accepted

## Context

|  | Fastest | Faster  | Same    | Slower  | Slowest |
| ------- | ------- | ------- | ------- | ------- | ------- |
| Access prototype | closure | `Object.getPrototypeOf` | `Reflect.getPrototypeOf` | `__proto__` |  |
| Access property | `object[key]` | `Reflect.has` | `Reflect.get` |  |  |
| Create proxy |  |  | Create function, Create class |  |  |


## Decision

Use closure to replace Object.getPrototypeOf
Use direct access to replace `Reflect.get`

## Consequences

closure will increase memory consumptions
