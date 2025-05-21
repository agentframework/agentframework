/*@__PURE__*/
// export function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
//   function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
//   var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
//   var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
//   var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
//   var _, done = false;
//   for (var i = decorators.length - 1; i >= 0; i--) {
//     var context = {};
//     for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
//     for (var p in contextIn.access) context.access[p] = contextIn.access[p];
//     context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
//     var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
//     if (kind === "accessor") {
//       if (result === void 0) continue;
//       if (result === null || typeof result !== "object") throw new TypeError("Object expected");
//       if (_ = accept(result.get)) descriptor.get = _;
//       if (_ = accept(result.set)) descriptor.set = _;
//       if (_ = accept(result.init)) initializers.unshift(_);
//     }
//     else if (_ = accept(result)) {
//       if (kind === "field") initializers.unshift(_);
//       else descriptor[key] = _;
//     }
//   }
//   if (target) Object.defineProperty(target, contextIn.name, descriptor);
//   done = true;
// };
