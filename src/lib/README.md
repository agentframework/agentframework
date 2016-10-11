Agent Framework for TypeScript
------------------------------

Aha, I got you

This is a new experimental library which bring Agent Framework into TypeScript world.

Required to add `--experimentalDecorators` option to `tsc` or update `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### Known Issue

We can not intercept the method call inside class constructor
