export const ORIGIN_INSTANCE = Symbol('agent.framework.origin.instance');
export const ORIGIN_CONSTRUCTOR = Symbol('agent.framework.origin.constructor');

export const INTERCEPTOR_CONSTRUCTOR = Symbol('agent.framework.interceptor.constructor');

export const AGENT_DOMAIN = Symbol('agent.framework.domain');

export function IsFunction(x: any): boolean {
  return typeof x === 'function';
}

export function IsUndefined(x: any): boolean {
  return x === undefined
}

export function IsObjectOrFunction(x: any): boolean {
  return typeof x === 'object' ? x !== null : typeof x === 'function'
}

export function IsSymbol(x: any): boolean {
  return typeof x === 'symbol'
}

export function IsString(x: any): boolean {
  return typeof x === 'string';
}

export function ToPropertyKey(value: any): string | symbol {
  return IsSymbol(value) ? value as symbol : String(value)
}

export function IsEqual(x: any, y: any): boolean {

  // remember that NaN === NaN returns false
  // and isNaN(undefined) returns true
  if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
    return true;
  }

  // Compare primitives and functions.
  // Check if both arguments link to the same object.
  // Especially useful on the step where we compare prototypes
  if (x === y) {
    return true;
  }

  if (!x === !y) {
    return true;
  }

  // Works in case when functions are created in constructor.
  // Comparing dates is a common scenario. Another built-ins?
  // We can even handle functions passed across iframes
  if ((typeof x === 'function' && typeof y === 'function') ||
    (x instanceof Date && y instanceof Date) ||
    (x instanceof RegExp && y instanceof RegExp) ||
    (x instanceof String && y instanceof String) ||
    (x instanceof Number && y instanceof Number)) {
    return x.toString() === y.toString();
  }

  return false;
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
export function ToPrototypeArray(typeOrInstance: any): Array<any> {
  const prototypes = [];
  let p = IsFunction(typeOrInstance) ? typeOrInstance.prototype : Reflect.getPrototypeOf(typeOrInstance);
  while (p) {
    prototypes.push(p);
    p = Reflect.getPrototypeOf(p);
  }
  return prototypes;
}
