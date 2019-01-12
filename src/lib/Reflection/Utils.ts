export function IsNumber(x: any): boolean {
  return typeof x === 'number' && !isNaN(x);
}

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
