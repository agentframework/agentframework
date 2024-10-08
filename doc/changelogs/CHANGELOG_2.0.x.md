# Agent Framework 2.0.x ChangeLog

## 2024-08-21, Version 2.0.4

**Notable Changes**

- Allow remember false/0/null/undefined values

## 2024-08-01, Version 2.0.3

**Notable Changes**

- Update support for typescript 5.x
- Fixed VariableDecorator signature

## 2022-03-11, Version 2.0.2

**Notable Changes**

- Fixed an infinite loops bug when using interceptor on class field

## 2021-11-02, Version 2.0.1

**Notable Changes**

- Fixed an issue when more than one version of agentframework used by a project

## 2021-11-02, Version 2.0.0

**Notable Changes**

- Enable version controlled class metadata
- Improve performance by check version instead of check metadata details
- Improve performance by skipping non-annotated class
- Improve performance by add invocation cache

## 2021-08-24, Version 2.0.0-rc.20210824

**Notable Changes**

-   Fix bugs
-   Clean up code
-   Add more tests for invocation chain

## 2021-08-15, Version 2.0.0-dev.20210815

**Notable Changes**

-   Remove duplicate code

## 2021-08-14, Version 2.0.0-rc.20210814

**Notable Changes**

-   Remove unstable api

## 2021-08-07, Version 2.0.0-rc.20210807

**Notable Changes**

-   Fix a bug that cause Reflector not working

## 2021-08-07, Version 2.0.0-dev.20210807, @e2tox

**Notable Changes**

-   Fix a bug that `OnDemandPropertyInfo.type` return incorrect value.

## 2021-08-06, Version 2.0.0-dev.20210806, @e2tox

**Notable Changes**

-   Add `__decorate`, `__param`, `__metadata` helper for better performance

## 2021-05-17, Version 2.0.0-rc.20, @e2tox

**Notable Changes**

-   Remove internal class from exports
-   Remove duplicate class interface
-   Remove unstable exports

## 2021-04-19, Version 2.0.0-rc.18, @e2tox

**Notable Changes**

-   Rename `Domain.getInstance` to `Domain.getAgent`

## 2021-01-21, Version 2.0.0-rc.9, @e2tox

**Notable Changes**

-   Add `InMemorySubDomain`

## 2020-12-19, Version 2.0.0-rc.6, @e2tox

**Notable Changes**

-   Add method to get agent type

## 2020-11-17, Version 2.0.0-rc.5, @e2tox

**Notable Changes**

-   Use AgentFrameworkError for all error
-   Add prefix to all error message, details followed by ":"

## 2020-10-24, Version 2.0.0-rc.3, @e2tox

**Notable Changes**

-   Add support to add attribute to static property and parameter

## 2020-10-18, Version 2.0.0-rc.2, @e2tox

**Notable Changes**

-   Improve code quality and performance
-   Add parameter type guard

## 2020-10-05, Version 2.0.0-rc.0, @e2tox

**Notable Changes**

-   Remove `Initializer`. Use `Interceptor` instead.
-   Remove 'I' from interface name
-   Add dependence injection and dependence lookup
-   Improve Reflector API performance.
-   Improve Dynamic Proxy performance.
