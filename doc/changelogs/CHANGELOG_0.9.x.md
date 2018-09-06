# Agent Framework 0.9.x ChangeLog

0.9.x is the last version before 1.0. Since the MVP/EPIC features are already in place.
The goal of this version is to improve performance and revise API interfaces for backward compatibility.

## 2018-09-06, Version 0.9.17 (Current), @e2tox

**Bug fix**

- Copy static properties from target class to proxy class

## 2018-07-25, Version 0.9.16, @e2tox

**Improvement**

- Add TypedConstructor
- Add support for ES Module with nodejs and browser
- Add suport for NodeJS 10 and TypeScript 3

## 2018-06-04, Version 0.9.12, @e2tox

**Improvement**

- LazyInitializer which initialization on the first time user call the object. If user don't use this object. It will never get initialized. This feature is very useful to develop large scale application on Function computing platform e.g. AWS Lambda, Azure Function.

## 2018-04-24, Version 0.9.11, @e2tox

**Bug fix**

- Only check max parameters when it's a number (#8)

## 2018-04-20, Version 0.9.10, @e2tox

**Notable Changes**

- Improve build quality
- Introduce ESModule using `"module": "lib/index.esm.js"` in `package.json`
- Better packaging with bundled d.ts file

## 2018-03-22, Version 0.9.9, @e2tox

**Notable Changes**

- Remove Domain from AgentFramework completely.
- Prepare for 1.0 release

## 2018-01-22, Version 0.9.8, @e2tox

**Notable Changes**

- Export IsNumber helper function


## 2017-12-18, Version 0.9.5, @e2tox

**Notable Changes**

- Introduce Universal decorate function will able to decorate on multiple targets
- Introduce IDesign interface and it expose to IInitializer and IInterceptor
- IInitializer is able to access IDesign information during execution (@inject will know the type to inject)
- IInitializer attribute can be decorate on constructor parameters (@inject can decorate on constructor parameter)


## 2017-12-13, Version 0.9.3, @e2tox

**Notable Changes**

- @prerequisite, @failure, @conditional, @cache now can works with getter, setter and methods


## 2017-12-12, Version 0.9.2, @e2tox

**Notable Changes**

- Introduce agent compiler
- Added compiler cache to increase the performance of creating agent instance using new()


## 2017-12-10, Version 0.9.1, @e2tox

**Notable Changes**

- Introduce Reflector() method to access Reflection metadata from an instance or a constructor
- Attribute now can decorate on getter, setter
- Agent can be compiled into function, class or Proxy
- Revised Reflection API

**Others**
- Added more test cases


## 2017-12-05, Version 0.9.0, @e2tox

**Notable Changes**

- Provide access to injected class fields inside class constructor. Check README.md for example.
- Removed @ready() attribute because we don't need it anymore.
- The exported IDomain interface will be used in upstream projects to implement a P2P based and PGP signed agent domain.
- Use Rollup instead of webpack to generate release build
- Removed dependencies of EventEmitter since never used

**Others**
- Added Architecture Decision Record
- Adjust some API interface

