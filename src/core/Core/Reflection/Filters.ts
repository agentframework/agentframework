/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

// export function HasInitializer(attribute: any): boolean {
//   // we don't use attribute['initializer'] because the initializer maybe a getter field
//   // Reflect.has() checks the key on all prototype
//   return Reflect.has(attribute, 'initializer');
// }

// export class PrototypeIterator implements Iterator<Object> {
//   constructor(private _current: Object) {}
//   next() {
//     const ret = { value: this._current, done: this._current != null };
//     this._current = Object.getPrototypeOf(this._current);
//     return ret;
//   }
// }

// export class Prototypes implements Iterable<Object> {
//   constructor(private _current: Object) {}
//   [Symbol.iterator]() {
//     return new PrototypeIterator(this._current);
//   }
// }

// export function GetPrototypeIterator(prototype: Object): Iterable<Object> {
//   return new Prototypes(prototype);
// }

// export function GetPrototypeArray(prototype: Object): Array<Object> {
//   const list = [];
//   while (prototype) {
//     list.unshift(prototype);
//     prototype = Object.getPrototypeOf(prototype);
//   }
//   return list;
// }

//
//
// export function IsEqual(x: any, y: any): boolean {
//   // Compare primitives and functions.
//   // Check if both arguments link to the same object.
//   // Especially useful on the step where we compare prototypes
//   if (x === y) {
//     return true;
//   }
//
//   if (typeof x === 'function' && typeof y === 'function') {
//     return x.toString() === y.toString();
//   }
//
//   if (x instanceof Date && y instanceof Date) {
//     return x.getTime() === y.getTime();
//   }
//
//   if (x instanceof RegExp && y instanceof RegExp) {
//     return x.source === y.source;
//   }
//
//   // remember that NaN === NaN returns false
//   // and isNaN(undefined) returns true
//   if (typeof x === 'number' && typeof y === 'number') {
//     if (isNaN(x) && isNaN(y)) {
//       return true;
//     }
//   }
//
//   if (typeof x !== typeof y) {
//     if (!x === !y) {
//       return true;
//     }
//   }
//
//   return x == y;
// }
//
// /**
//  * array = [
//  *  [this.prototype]
//  *  [this.prototype.prototype]
//  *  [this.prototype.prototype.prototype]
//  *  ...
//  * ]
//  */
// export function GetPrototypeArray(typeOrInstance: any): Array<any> {
//   const prototypes = [];
//   let p = IsFunction(typeOrInstance) ? typeOrInstance.prototype : Object.getPrototypeOf(typeOrInstance);
//   while (p) {
//     prototypes.push(p);
//     p = Object.getPrototypeOf(p);
//   }
//   return prototypes;
// }
//
// /**
//  * array = [
//  *  ...
//  *  [this.prototype.prototype.prototype]
//  *  [this.prototype.prototype]
//  *  [this.prototype]
//  * ]
//  */
// export function GetPrototypeArrayReverse(typeOrInstance: any): Array<any> {
//   const prototypes = [];
//   let p = IsFunction(typeOrInstance) ? typeOrInstance.prototype : Object.getPrototypeOf(typeOrInstance);
//   while (p) {
//     prototypes.unshift(p);
//     p = Object.getPrototypeOf(p);
//   }
//   return prototypes;

// }
