# Agent Framework 1.0.x ChangeLog

## 2019-02-27, Version 1.0.0, @e2tox

**Notable Changes**

- Bump version to 1.0

## 2019-01-18, Version 1.0.0-rc.24 (Preview), @e2tox

**Notable Changes**

- Remove nodejs dependencies, prepare for deno
- Add typescript-standard into build process

## 2019-01-14, Version 1.0.0-rc.16, @e2tox

**Notable Changes**

- Improve code quality
- add new tests
- add hasFeature on type

## 2019-01-13, Version 1.0.0-rc.15, @e2tox

**Notable Changes**

- add more tsc check
- Improve code quality

## 2019-01-13, Version 1.0.0-rc.14, @e2tox

**Notable Changes**

- Add e2e tests
- Prepare for 1.0 release

## 2019-01-11, Version 1.0.0-rc.13, @e2tox

**Notable Changes**

- Code clean up
- Fix interceptor bug

#### 2019-01-10, Version 1.0.0-rc.12, @e2tox

**Notable Changes**

- Fix build error

#### 2019-01-10, Version 1.0.0-rc.11, @e2tox

**Notable Changes**

- Fix initializer arguments bug

#### 2019-01-10, Version 1.0.0-rc.10, @e2tox

**Notable Changes**

- Add ParameterIndex to CanDecorate() method

#### 2019-01-10, Version 1.0.0-rc.9, @e2tox

**Notable Changes**

- Fix Compiler bug

#### 2019-01-09, Version 1.0.0-rc.8, @e2tox

**Notable Changes**

- Fix Reflection bug

#### 2019-01-07, Version 1.0.0-rc.7, @e2tox

**Notable Changes**

- Introduce `IsAgent`, `GetType` helper function

#### 2019-01-04, Version 1.0.0-rc.6, @e2tox

**Notable Changes**

- Code clean up

#### 2019-01-04, Version 1.0.0-rc.5, @e2tox

**Notable Changes**

- Add ES module export in package.json

#### 2019-01-02, Version 1.0.0-rc.4, @e2tox

**Notable Changes**

- Export AgentFeatures

#### 2019-01-02, Version 1.0.0-rc.3, @e2tox

**Notable Changes**

- Re-publish using NPM 5.x which avoid [reset file modification time to 1985](https://github.com/npm/npm/issues/20439)
- Introduced Agent, Reflector API

#### 2019-01-02, Version 1.0.0-rc.2, @e2tox

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
