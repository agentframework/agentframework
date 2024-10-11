# Study the breaking changes of TypeScript 5 decorator

Following is the test result from different version of typescript compiler
- [Original TypeScript](./typescript-original.md)
- [Compiled by TypeScript 5](./typescript-5-complied.md)
- [Compiled by TypeScript 4](./typescript-4-complied.md)

# Analysis
In TypeScript 5, decorators follow the new ECMAScript (ES) decorator proposal, while TypeScript 4 uses the older experimental decorator model. The generated JavaScript output for each version reflects significant changes in how decorators are implemented. Below are the key differences and the potential performance impact:

## 1. New Decorator Structure

TypeScript 4: The older decorator syntax uses functions like __decorate and __metadata, leveraging TypeScript's reflection-based APIs. The __decorate function manually applies the decorators and assigns metadata to class properties and methods.

```javascript
__decorate([
transit(),
singleton,
__metadata("design:type", Service641)
], App641.prototype, "service", void 0);
```

TypeScript 5: The new syntax uses __esDecorate and __runInitializers, aligning with the ECMAScript proposal. The decorators are applied differently, with more complexity around initialization, particularly for class fields and methods. For example, multiple initializers (_service_initializers, _bar_decorators) are stored and executed during construction.

```javascript
let _service_decorators = [transit(), singleton];
__esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false }, _service_initializers, _service_extraInitializers);
```

## 2. Initializers

TypeScript 4: Fields are decorated directly and the property is immediately set. There’s no concept of field initialization being deferred.

```javascript
__decorate([
transit(),
singleton,
__metadata("design:type", Service641)
], App641.prototype, "service", void 0);
```

TypeScript 5: Initializers are explicitly handled via __runInitializers for fields like service. The field is not immediately assigned but instead initialized during construction, which introduces more complexity in how the class and its fields are constructed.

```javascript
this.service = (__runInitializers(this, _service_initializers, void 0));
```

## 3. Metadata and Symbol Usage

TypeScript 4: Uses __metadata to store design-time metadata, especially useful for reflection in frameworks like Angular.

```javascript
__metadata("design:type", Function),
__metadata("design:paramtypes", [Number])
```

TypeScript 5: Uses the new Symbol.metadata (if supported), which is part of the ES proposal. This provides a more standardized way to store metadata, although its availability depends on the environment.

```javascript
const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
```

## 4. Class Definition
TypeScript 4: The class definition is straightforward, with decorators applied using __decorate.

```javascript
App641 = __decorate([
agent,
domain()
], App641);
```

TypeScript 5: Class decoration is more complex, using __esDecorate and __runInitializers for class-level decorators, with explicit handling of extra initializers for both the class and instance.

```javascript
let _classDecorators = [agent, domain()];
__esDecorate(_classThis, null, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
```

# Performance Impact

## 1. Initialization Overhead:

- TypeScript 5 introduces more initialization logic via __runInitializers, which could slightly impact performance for complex classes or when a large number of decorators are used. Field initialization is deferred until the constructor, which may add overhead at runtime.
Compatibility:

- TypeScript 5 aligns with the ES proposal, which improves compatibility with future versions of JavaScript. However, this also means that older environments or codebases may need polyfills or updates to work seamlessly.
Complexity in Generated Code:

- The new model in TypeScript 5 generates more complex code, especially with the handling of symbols and multiple initializers. While this adds flexibility, it also increases the size of the generated output, potentially affecting load times in large applications.
Reflection and Metadata:

- The transition from __metadata to Symbol.metadata could lead to more efficient metadata handling in modern environments but may introduce compatibility concerns in older environments.

# Summary

| Aspect               | TypeScript 4                  | TypeScript 5                                               |
|----------------------|-------------------------------|------------------------------------------------------------|
| Decorator Handling   | `__decorate` ,  `__metadata`  | `__esDecorate` ,  `__runInitializers` ,  `Symbol.metadata` |
| Field Initialization | Immediate                     | Deferred via  `__runInitializers`                          |
| Metadata Handling    | `__metadata`                  | Symbol.metadata (if available)                             |
| Class Decoration     | Applied via  `__decorate`     | Applied via  `__esDecorate` and initializer chains         |
| Performance Impact   | Simpler but less flexible     | More complex, potentially slower due to added initializers |

In conclusion, TypeScript 5 brings the decorator model closer to the future ECMAScript standard, which improves compatibility and offers new features, but it also adds complexity and may have a small impact on performance, especially in large or heavily decorated codebases.
