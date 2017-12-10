# Agent Framework 0.9.x ChangeLog

0.9.x is the last version before 1.0. Since the MVP/EPIC features are already in place. 
The goal of this version is to improve performance and revise API interfaces for backward compatibility.

## 2017-12-10, Version 0.9.1 (Current), @e2tox

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

