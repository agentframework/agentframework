# 3. Performance decisions

Date: 2017-12-07

## Status

Accepted

## Context

closure > `Object.getPrototypeOf` > `Reflect.getPrototypeOf`
`object[key]` > `Reflect.has` > `Reflect.get`
Create function ~= Create class

## Decision

Use closure to replace Object.getPrototypeOf
Use direct access to replace `Reflect.get`

## Consequences

closure will increase memory consumptions
