# Original Code compiled using TypeScript 5

```javascript
"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    }
    else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Service641 {
}
let App641 = (() => {
  let _classDecorators = [agent, domain()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _service_decorators;
  let _service_initializers = [];
  let _service_extraInitializers = [];
  let _bar_decorators;
  var App641 = _classThis = class {
    bar(body) {
    }
    constructor() {
      this.service = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _service_initializers, void 0));
      __runInitializers(this, _service_extraInitializers);
    }
  };
  __setFunctionName(_classThis, "App641");
  (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
    _service_decorators = [transit(), singleton];
    _bar_decorators = [method(), async_method];
    __esDecorate(_classThis, null, _bar_decorators, { kind: "method", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar }, metadata: _metadata }, null, _instanceExtraInitializers);
    __esDecorate(null, null, _service_decorators, { kind: "field", name: "service", static: false, private: false, access: { has: obj => "service" in obj, get: obj => obj.service, set: (obj, value) => { obj.service = value; } }, metadata: _metadata }, _service_initializers, _service_extraInitializers);
    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    App641 = _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return App641 = _classThis;
})();
const app = new App641();
```
