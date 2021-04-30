/**
 * Return extended class between specified type, return [] if no match
 */
export function FindExtendedClass(target: Function, receiver: Function): Array<Function> {
  // Reflect.getPrototypeOf(constructor) may not return the same instance of target
  // Reflect.getPrototypeOf(prototype) will return same instance of target.prototype
  const targetPrototype = target.prototype;
  let basePrototype: object | null | undefined = receiver.prototype;
  const found: Array<Function> = [];
  while (basePrototype) {
    // console.log('target', target, 'base', basePrototype, '===>', basePrototype === targetPrototype);
    found.unshift(basePrototype.constructor);
    // getPrototypeOf can be intercept with Proxy. so we need add a guard here to prevent outside attack.
    basePrototype = Reflect.getPrototypeOf(basePrototype);
    if (basePrototype === targetPrototype) {
      return found;
    }
  }
  return [];
}
