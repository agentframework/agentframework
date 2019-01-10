# Agent Framework 1.0.x ChangeLog

## 2019-01-10, Version 1.0.0-rc.10 (Preview), @e2tox

**Notable Changes**

- Add ParameterIndex to CanDecorate() method

## 2019-01-10, Version 1.0.0-rc.9, @e2tox

**Notable Changes**

- Fix Compiler bug

## 2019-01-09, Version 1.0.0-rc.8, @e2tox

**Notable Changes**

- Fix Reflection bug

## 2019-01-07, Version 1.0.0-rc.7, @e2tox

**Notable Changes**

- Introduce `IsAgent`, `GetType` helper function

## 2019-01-04, Version 1.0.0-rc.6, @e2tox

**Notable Changes**

- Code clean up

## 2019-01-04, Version 1.0.0-rc.5, @e2tox

**Notable Changes**

- Add ES module export in package.json

## 2019-01-02, Version 1.0.0-rc.4, @e2tox

**Notable Changes**

- Export AgentFeatures

## 2019-01-02, Version 1.0.0-rc.3, @e2tox

**Notable Changes**

- Re-publish using NPM 5.x which avoid [reset file modification time to 1985](https://github.com/npm/npm/issues/20439)
- Introduced Agent, Reflector API

## 2019-01-02, Version 1.0.0-rc.2, @e2tox

**Notable Changes**

- Rewrite the whole compiler using CodeGen, 70% faster than 0.9.x
- All interface are stable and locked
- Add initializer/interceptor support on constructor parameters and method parameters
- Revise initializer/interceptor interface
- Revise Reflection namespace and interface
- Remove Lookup and move related function into Reflection/Type
- Fix Reflector bug
- Code clean-up
- Introduce AgentFramework class
