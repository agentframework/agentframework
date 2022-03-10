### Backlog Features

#### 001. Auto Dependence Injection

Dependence Injection with automatic type detection.
Just need `@inject`, no need specified the type `@inject(SpecifiedClass)`.
Require tsc emit metadata (emitDecoratorMetadata: true)

#### 002. Construct agent from json configuration

Construct agent from json config (or yaml at development time) instead of decoration.
Useful to upgrade 3rd party library or system types to agent.

#### 003. Resolve agent from remote domain

Agent can be resolved by using unique identifier from another domain.

#### 004. Agent as a domain

An agent can be a domain, all attribute apply to agent can also apply to domain.

#### 005. Add more decorator helper function

Decorator only works for ClassMethod, ClassProperty, ClassGetter, ClassSetter.
