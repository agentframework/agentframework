
export function IsObject(x: any): boolean {
  return typeof x === 'object' && x != null;
}

export function IsFunction(x: any): boolean {
  return typeof x === 'function';
}

export function IsSymbol(x: any): boolean {
  return typeof x === 'symbol'
}

export function IsString(x: any): boolean {
  return typeof x === 'string';
}

export function IsNumber(x: any): boolean {
  return typeof x === 'number' && !isNaN(x);
}

export function IsNullOrUndefined(x: any): boolean {
  return x == null
}

export function IsObjectOrFunction(x: any): boolean {
  return typeof x === 'object' ? x !== null : typeof x === 'function'
}

export function ToPropertyKey(value: any): string | symbol {
  return IsSymbol(value) ? value as symbol : String(value)
}

export function IsEqual(x: any, y: any): boolean {
  
  // Compare primitives and functions.
  // Check if both arguments link to the same object.
  // Especially useful on the step where we compare prototypes
  if (x === y) {
    return true;
  }
  
  if (typeof x === 'function' && typeof y === 'function') {
    return x.toString() === y.toString();
  }
  
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }
  
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.source === y.source;
  }
  
  // remember that NaN === NaN returns false
  // and isNaN(undefined) returns true
  if (typeof x === 'number' && typeof y === 'number') {
    if (isNaN(x) && isNaN(y)) {
      return true;
    }
  }
  
  if (typeof x !== typeof y) {
    if (!x === !y) {
      return true;
    }
  }
  
  return x == y;
}


/**
 * array = [
 *  [this.prototype]
 *  [this.prototype.prototype]
 *  [this.prototype.prototype.prototype]
 *  ...
 * ]
 * @param typeOrInstance
 * @returns {Array<any>}
 * @constructor
 */
export function GetPrototypeArray(typeOrInstance: any): Array<any> {
  const prototypes = [];
  let p = IsFunction(typeOrInstance) ? typeOrInstance.prototype : Object.getPrototypeOf(typeOrInstance);
  while (p) {
    prototypes.push(p);
    p = Object.getPrototypeOf(p);
  }
  return prototypes;
}

// export function assignProperties(target: any, source: any) {
//   const name = Reflect.getOwnPropertyDescriptor(source, 'name');
//   Reflect.defineProperty(target, 'name', name);
//   for(const name of Object.getOwnPropertyNames(source.prototype)) {
//     // console.log('copy', name, Reflect.getOwnPropertyDescriptor(from.prototype, name));
//     Reflect.defineProperty(target.prototype, name, Reflect.getOwnPropertyDescriptor(source.prototype, name));
//   }
// }
