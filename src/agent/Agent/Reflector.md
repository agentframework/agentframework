```typescript
// Store
//
// Assembly -> Type -> Property("constructor") -> get, set, value -> Parameter
//
// Assembly -> Type -> Property -> get, set, value -> Parameter
//
// Query
//
// type = Date => createdAt: Date
//
// type = Date => created(): Date
//
// Key: [Assembly, Type, Key, ParameterIndex] = [ Type ]
//
// Reflector(class).type = Date, Number, String, Boolean
//
// Reflector(class).hasAttribute(...) = true | false
//
// Reflector(class).parameters(1).type = Date, Number, String, Boolean
//
// Reflector(class).parameters(1).hasAttribute(...) = true | false
//
// Reflector(class).property(key).type
//
// Reflector(class).property(key).parameters(1).type = Date, Number, String, Boolean
//
// Reflector(class).property(key).hasAttribute(...)
//
// Reflector(class).property(key).getter.type
//
// Reflector(class).property(key).getter.hasAttribute(...)
//
// Reflector(class).property(key).getter.parameters(1).type ##N/A
//
// Reflector(class).property(key).getter.parameters(1).hasAttribute(...) ##N/A
//
// Reflector(class).property(key).setter.type
//
// Reflector(class).property(key).setter.hasAttribute(...)
//
// Reflector(class).property(key).setter.parameters(1).type
//
// Reflector(class).property(key).setter.parameters(1).hasAttribute(...)
//
// Reflector(class).property(key).value.type = field type or method result
//
// Reflector(class).property(key).value.hasAttribute(...)
//
// Reflector(class).property(key).value.parameters(1).type
//
// Reflector(class).property(key).value.parameters(1).hasAttribute(...)
```
